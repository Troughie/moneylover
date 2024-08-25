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
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
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
	members: string[];
	create: string;
	membersName: string[]
	unreadCount: { [userId: string]: number };
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

export const createGroupChat = async (groupId: string, groupName: string, userIds: string[], memberName: string[]) => {
	try {
		const groupRef = doc(db, 'groups', groupId);
		const groupSnapshot = await getDoc(groupRef);
		const create = memberName[0]
		const newMember: string = userIds[1]
		const newMemberName: string = memberName[1]

		if (groupSnapshot.exists()) {
			console.log('Group chat already exists with ID:', groupId);
			await addMemberToGroup(groupId, newMember, newMemberName)
			return;
		}

		const unreadCount = userIds.reduce((acc, userId) => {
			acc[userId] = 0;
			return acc;
		}, {} as { [key: string]: number });

		const groupMess = {
			name: groupName,
			members: userIds,
			membersName: memberName,
			changeName: false,
			create,
			unreadCount,
			createdAt: serverTimestamp(),
		}

		await setDoc(groupRef, groupMess);
		console.log('Group chat created with ID:', groupId);
	} catch (error) {
		console.error('Error creating group chat:', error);
	}
};

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
		const groupsQuery = query(collection(db, 'groups'), where('members', 'array-contains', userId));
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

export const getLatestMessageForGroup = async (groupId: string): Promise<Message | null> => {
	const messagesQuery = query(collection(db, `groups/${groupId}/messages`), orderBy('createdAt', 'desc'), limit(1));


	const messageSnapshot = await getDocs(messagesQuery);
	const latestMessage = messageSnapshot.docs.map(doc => doc.data() as Message)[0];

	return latestMessage || null;
};

export const addMemberToGroup = async (groupId: string, newMemberId: string, newMemberName: string) => {
	try {
		const groupRef = doc(db, 'groups', groupId);

		// Get the current group document
		const groupDoc = await getDoc(groupRef);
		if (groupDoc.exists()) {
			if (groupDoc.data()?.members.includes(newMemberId)) {
				console.log("Member has already in group!!!", groupId)
				return;
			}

			let objectRef = {
				members: arrayUnion(newMemberId),
				unreadCount: {
					...groupDoc.data().unreadCount,  // Copy current unreadCount
					[newMemberId]: 0  // Set unreadCount for the new member
				}
			};

			const groupName = groupDoc.data().name;

			// Update group name by appending the new member's name
			if (!groupDoc.data().changeName) {
				const updatedGroupName = `${groupName},${newMemberName}`;
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

export const removeMemberFromGroup = async (groupId: string, memberId: string, memberName: string) => {
	try {
		const groupRef = doc(db, 'groups', groupId);

		// Get the current group document
		const groupDoc = await getDoc(groupRef);
		if (groupDoc.exists()) {
			const groupData = groupDoc.data();
			if (!groupData?.members.includes(memberId)) {
				console.log("Member is not in the group", groupId);
				return;
			}

			// Remove memberId from the members array
			let objectRef = {
				members: arrayRemove(memberId),
				unreadCount: {...groupData.unreadCount}
			};
			delete objectRef.unreadCount[memberId]; // Remove unreadCount for the member being removed

			// Update group name by removing the member's name
			if (!groupData.changeName) {
				const updatedGroupName = groupData.name.split(',').filter((name: string) => name !== memberName).join(',');
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


export const sendMessageToGroup = async (groupId: string, senderId: User, message: string, files: File[] = []) => {
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