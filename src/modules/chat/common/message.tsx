import {useEffect, useState} from "react";
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore';
import {db} from "@/libs/firebase.ts";
import {Message} from "@/modules/chat/function/chats.ts";
import {timeSendMess} from "@/utils/day.ts";

const useMessage = (groupId: string) => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (groupId) {
			const q = query(collection(db, `groups/${groupId}/messages`), orderBy('createdAt', 'asc'));
			const unsubscribe = onSnapshot(q, (snapshot) => {
				const mess: Message[] = snapshot.docs.map(doc => {
					const data = doc.data() as Message
					const timeSend = timeSendMess(data.createdAt)
					return {
						...data,
						time: timeSend,
						id: doc.id
					}
				});
				setMessages(mess);
			});
			return () => unsubscribe(); // Clean up the subscription on unmount
		}

	}, [groupId]);

	return messages;
}

export default useMessage