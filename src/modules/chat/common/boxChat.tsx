import cn from "@/utils/cn";
import {Group, Message} from "@/modules/chat/function/chats.ts";
import {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "@/libs/firebase.ts";
import {calculateElapsedTime} from "@/utils/day.ts";
import {useUserStore} from "@/modules/authentication/store/user.ts";

interface detailMess extends Message {
	time: string
}

interface props {
	isSelect: boolean
	group: Group
}


const BoxChat: React.FC<props> = ({isSelect, group}) => {
	const [messageLast, setMessageLast] = useState<detailMess>()
	const [timeCreateGroup, setTimeCreateGroup] = useState<string>("")
	const {user} = useUserStore.getState().user
	useEffect(() => {
		setTimeCreateGroup(calculateElapsedTime(group.createdAt))
		const q = query(collection(db, `groups/${group?.id}/messages`), orderBy('createdAt', 'asc'));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const mess: detailMess[] = snapshot.docs.map(doc => {
				const data = doc.data() as detailMess
				const elapsedTime = calculateElapsedTime(data.createdAt);
				return {
					...data,
					time: elapsedTime
				}
			});
			const mes = mess.pop()
			setMessageLast(mes)
		});
		return () => unsubscribe()
	}, []);

	const classNameNoneMess = messageLast?.text ? "" : "py-2";


	return <>
		<div
			className={cn(`items-center cursor-pointer ${classNameNoneMess} flex rounded-3xl px-4 bg-white hover:border-gray-400 hover:bg-gray-200`, {
				"bg-primary2 hover:bg-blue-300": isSelect,
			})}>
			<img src="#" alt="" className={`size-10 rounded-full bg-black m-2`}/>
			<div className={`flex flex-col py-4 px-2 w-full`}>
				<div className={cn(`flex-between text-black items-start`, {"text-white": isSelect})}>
					<span className={cn(`text-2xl font-bold line-clamp-1`)}>{group?.name}</span>
					<p className={cn(`text-sm font-thin relative`)}>{messageLast?.time || timeCreateGroup}
					</p>
				</div>
				<div className={cn(`text-bodydark text-sm flex items-center gap-1`, {"text-white": isSelect})}>
					<span className={``}>
						{messageLast?.sender?.id === user?.id ? "You :" : ""}
					</span>
					<span
						className={`line-clamp-1`}>{messageLast?.text}
						</span>
					{group.unreadCount[user?.id] > 0 &&
                        <div className={cn(`text-black text-sm bg-red-400 rounded-full px-1 py-0`, {"text-white": isSelect})}>
							{group.unreadCount[user?.id]}
                        </div>}
				</div>
			</div>
		</div>
	</>
}

export default BoxChat