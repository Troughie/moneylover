import {db} from "@/libs/firebase.ts";
import {collection, addDoc, where, getDocs, query, getDoc, doc, updateDoc, arrayUnion, serverTimestamp} from 'firebase/firestore';
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
}

type groupsProps = Group[];

export const createGroupChat = async (groupName: string, userIds: string[], memberName: string[], create: string) => {
	try {
		const unreadCount = userIds.reduce((acc, userId) => {
			acc[userId] = 0;
			return acc;
		}, {} as { [key: string]: number });
		const groupRef = await addDoc(collection(db, 'groups'), {
			name: groupName,
			members: userIds,
			membersName: memberName,
			changeName: false,
			create,
			unreadCount,
			createdAt: new Date(),
		});
		console.log('Group chat created with ID:', groupRef.id);
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

export const addMemberToGroup = async (groupId: string, newMemberId: string, newMemberName: string) => {
	try {
		const groupRef = doc(db, 'groups', groupId);

		// Get the current group document
		const groupDoc = await getDoc(groupRef);
		if (groupDoc.exists()) {
			let objectRef = {
				members: arrayUnion(newMemberId),
			}
			const groupName = groupDoc.data().name;

			// Update group name by appending the new member's name
			if (!groupDoc.data().changeName) {
				const updatedGroupName = `${groupName} ${newMemberName}`;
				// @ts-ignore
				objectRef = {...objectRef, name: updatedGroupName}
			}


			await updateDoc(groupRef, objectRef
			);

			console.log('Member added to group and group name updated');
		} else {
			console.log('Group does not exist');
		}
	} catch (error) {
		console.error('Error adding member to group:', error);
	}
};


export const sendMessageToGroup = async (groupId: string, senderId: User, message: string) => {
	try {
		await addDoc(collection(db, `groups/${groupId}/messages`), {
			sender: senderId,
			text: message,
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