import {db, storage} from "@/libs/firebase.ts";
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import {getDownloadURL, ref, StorageReference, uploadBytes, listAll} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {User} from "@/model/interface.ts";


export interface createdAt {
	seconds: number
	nanoseconds: number
}


export interface Group {
	id: string;
	createdAt: createdAt;
	name: string;
	changeName: boolean
	members: TimeAddUser[];
	membersId: string[]
	creator: string;
	membersName: string[]
	unreadCount: { [userId: string]: number };
}

interface TimeAddUser {
	user: User
	createdAd: createdAt
}

export interface Message {
	id: string
	sender: User
	text: string
	createdAt: createdAt
	time: string
	timer: Date
	files: string[]
}

export interface MergeMessage {
	message: Message[]
	sender: User
	time: string
	timer: Date
}

type groupsProps = Group[];

export const createGroupChat = async (groupId: string, groupName: string, users: User[]) => {
	try {
		const groupRef = doc(db, 'groups', groupId);
		const groupSnapshot = await getDoc(groupRef);
		const userAndTime = users.reduce((result, curr) => {
			// @ts-ignore
			result.push({user: curr, createdAd: new Date()})
			return result
		}, [] as TimeAddUser[])


		const creator = users[0].id
		const newMember = userAndTime[1]

		if (groupSnapshot.exists()) {
			console.log('Group chat already exists with ID:', groupId);
			await addMemberToGroup(groupId, newMember)
			return;
		}
		const membersId = users.map((e) => e.id)

		const unreadCount = users.reduce((acc, userId) => {
			acc[userId.id] = 0;
			return acc;
		}, {} as { [key: string]: number });


		const groupMess = {
			name: groupName,
			members: userAndTime,
			changeName: false,
			membersId,
			creator,
			unreadCount,
			createdAt: serverTimestamp(),
		}

		await setDoc(groupRef, groupMess);
		console.log('Group chat created with ID:', groupId);
	} catch (error) {
		console.error('Error creating group chat:', error);
	}
};

export const getAllMediaOfGroup = async (groupId: string) => {
	const folderRef = ref(storage, `groups/${groupId}/files`);
	try {
		// List all items (files) in the directory
		const result = await listAll(folderRef);

		// Retrieve download URLs for each file
		return await Promise.all(
			result.items.map(async (itemRef: StorageReference) => {
				return await getDownloadURL(itemRef);
			})
		);
	} catch (error) {
		console.error('Error fetching file URLs:', error);
		return [];
	}
}

export const renameGroup = async (groupId: string, groupName: string | undefined) => {
	const groupRef = doc(db, 'groups', groupId);

	const groupDoc = await getDoc(groupRef);
	if (groupDoc.exists()) {
		await updateDoc(groupRef, {
			name: groupName,
			changeName: true
		});
	}
}

export const getUserGroups = async (userId: string): Promise<groupsProps | undefined> => {
	try {
		const groupsQuery = query(collection(db, 'groups'), where('membersId', 'array-contains', userId));
		const querySnapshot = await getDocs(groupsQuery);
		return querySnapshot.docs.map(doc => {
			const data = doc.data() as Group;
			return {
				...data,
				id: doc.id
			};
		});
	} catch (error) {
		console.error('Error fetching groups:', error);
		return undefined; // Explicitly return undefined in case of an error
	}
};

// export const clearGroup = async (groupId: string): Promise<void> => {
//
// }

export const getLatestMessageForGroup = async (groupId: string): Promise<Message | null> => {
	const messagesQuery = query(collection(db, `groups/${groupId}/messages`), orderBy('createdAt', 'desc'), limit(1));


	const messageSnapshot = await getDocs(messagesQuery);
	const latestMessage = messageSnapshot.docs.map(doc => doc.data() as Message)[0];

	return latestMessage || null;
};

export const addMemberToGroup = async (groupId: string, newMember: TimeAddUser) => {
	try {
		const groupRef = doc(db, 'groups', groupId);

		// Get the current group document
		const groupDoc = await getDoc(groupRef);
		if (groupDoc.exists()) {
			if (groupDoc.data()?.membersId.includes(newMember.user.id)) {
				console.log("Member has already in group!!!", groupId)
				return;
			}

			let objectRef = {
				members: arrayUnion(newMember),
				membersId: arrayUnion(newMember.user.id),
				unreadCount: {
					...groupDoc.data().unreadCount,  // Copy current unreadCount
					[newMember.user.id]: 0  // Set unreadCount for the new member
				}
			};

			const groupName = groupDoc.data().name;

			// Update group name by appending the new member's name
			if (!groupDoc.data().changeName) {
				const updatedGroupName = `${groupName},${newMember.user.username}`;
				// @ts-ignore
				objectRef = {...objectRef, name: updatedGroupName};
			}

			// Update the document in Firestore
			await updateDoc(groupRef, objectRef);

			console.log('Member added to group and group name updated, unreadCount set for the new member');
		} else {
			console.log('Group does not exist');
		}
	} catch (error) {
		console.error('Error adding member to group:', error);
	}
};

export const removeMemberFromGroup = async (groupId: string, member: User) => {
	try {
		const groupRef = doc(db, 'groups', groupId);

		// Get the current group document
		const groupDoc = await getDoc(groupRef);
		if (groupDoc.exists()) {
			const groupData = groupDoc.data();
			if (!groupData?.membersId.includes(member.id)) {
				console.log("Member is not in the group", groupId);
				return;
			}
			const updatedMembers = groupData.members.filter((m: User) => m.id !== member.id);

			// Remove memberId from the members array
			let objectRef = {
				membersId: arrayRemove(member.id),
				members: updatedMembers,
				unreadCount: {...groupData.unreadCount}
			};
			delete objectRef.unreadCount[member.id]; // Remove unreadCount for the member being removed

			// Update group name by removing the member's name
			if (!groupData.changeName) {
				const updatedGroupName = groupData.name.split(',').filter((name: string) => name !== member.username).join(',');
				// @ts-ignore
				objectRef = {...objectRef, name: updatedGroupName};
			}

			// Update the document in Firestore
			await updateDoc(groupRef, objectRef);

			console.log('Member removed from group and group name updated');
		} else {
			console.log('Group does not exist');
		}
	} catch (error) {
		console.error('Error removing member from group:', error);
	}
};


export const sendMessageToGroup = async (groupId: string, senderId: User, message: string = "", files: File[] = []) => {
	try {
		let fileUrls: string[] = [];

		// If there are files, upload them to Firebase Storage
		if (files && files.length > 0) {
			const uploadPromises = files.map(async (file) => {
				const uniqueFileName = `${uuidv4()}_${file.name}`;
				const fileRef = ref(storage, `groups/${groupId}/files/${uniqueFileName}`);
				await uploadBytes(fileRef, file);
				return await getDownloadURL(fileRef);
			});

			// Wait for all file uploads to finish and get their URLs
			fileUrls = await Promise.all(uploadPromises);
		}

		await addDoc(collection(db, `groups/${groupId}/messages`), {
			sender: senderId,
			text: message,
			files: fileUrls,
			createdAt: serverTimestamp(),
		});
		const groupRef = doc(db, 'groups', groupId);

		const groupDoc = await getDoc(groupRef);
		if (groupDoc.exists()) {
			const groupData = groupDoc.data() as Group;

			// Update unread counts for other members
			const unreadCountUpdates = Object.keys(groupData.unreadCount).reduce((acc, userId) => {
				if (userId !== senderId.id) {
					acc[`unreadCount.${userId}`] = groupData.unreadCount[userId] + 1;
				} else if (userId === senderId.id && acc[`unreadCount.${senderId.id}`] > 0) {
					acc[`unreadCount.${senderId.id}`] = 0
				}
				return acc;
			}, {} as { [key: string]: number });

			await updateDoc(groupRef, unreadCountUpdates);
		}

		console.log('Message sent');
	} catch (error) {
		console.error('Error sending message:', error);
	}
};

export const markMessagesAsRead = async (groupId: string, userId: string) => {
	try {
		const groupRef = doc(db, 'groups', groupId);
		await updateDoc(groupRef, {
			[`unreadCount.${userId}`]: 0,
		});
		console.log('Messages marked as read');
	} catch (error) {
		console.error('Error marking messages as read:', error);
	}
};