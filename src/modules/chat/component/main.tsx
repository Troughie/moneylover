import React, {useEffect, useRef, useState} from "react";
import useMessage from "@/modules/chat/common/message.tsx";
import {Group, markMessagesAsRead, sendMessageToGroup} from "@/modules/chat/function/chats.ts";
import {useUserStore} from "@/modules/authentication/store/user.ts";
import Search from "@/modules/chat/common/search.tsx";
import MsgBox from "@/modules/chat/common/msg.tsx";
import {IPen} from "@/assets";
import ChangeNameGroup from "@/modules/chat/common/changeNameGroup.tsx";

interface props {
	groupId: string
	group: Group | undefined
	setId: React.Dispatch<React.SetStateAction<string>>
}

const Main = ({groupId, group, setId}: props) => {
	const [newMessage, setNewMessage] = useState<string>('');
	const [isOpenChangeName, setIsOpenChangeName] = useState<boolean>(false)
	const messages = useMessage(groupId);
	const {user} = useUserStore.getState().user;
	const messageContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Scroll to the bottom of the message container whenever messages change
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const handleSendMessage = async () => {
		if (newMessage.trim()) {
			await sendMessageToGroup(groupId, user, newMessage);
			setNewMessage(''); // Clear input after sending
		}
	};
	useEffect(() => {
		const messAsRead = async () => {
			await markMessagesAsRead(groupId, user?.id)
			setId(groupId)
		}
		messAsRead()
	}, [groupId])


	return <>
		<div className={`h-full relative`}>
			<div className={`relative h-full`}>
				<div ref={messageContainerRef}
					 className={`flex flex-col gap-4 px-4 pb-6 relative bg-main overflow-y-auto h-full max-h-[76vh] scrollbar-chat scroll-smooth`}>
					<div className={`mx-auto flex flex-col items-center`}>
						<span className={`font-bold text-lg mt-2`}>{group?.name ?? ""}</span>
						<span className={`mt-2 text-md text-bodydark font-satoshi`}>{group?.create} create this group</span>
						<div className={`flex flex-col items-center`}>
							<button onClick={() => setIsOpenChangeName(!isOpenChangeName)} className={`rounded-full size-10 bg-gray-300 mt-1`}><img
								src={IPen} alt=""/></button>
							<span>Name</span>
						</div>
					</div>
					{messages.map((msg) => (
						<MsgBox key={msg.id} msg={msg} isYour={msg?.sender?.id === user?.id}/>
					))}
				</div>
				<Search handleSendMessage={handleSendMessage} setNewMessage={setNewMessage} message={newMessage}/>
			</div>
		</div>
		{isOpenChangeName && <>
            <div
                onClick={() => setIsOpenChangeName(!isOpenChangeName)}
                className="fixed left-0 top-0 z-999 h-full w-full bg-black opacity-60"
            ></div>
            <ChangeNameGroup nameGroup={group?.name} cancel={() => setIsOpenChangeName(!isOpenChangeName)}
                             groupId={groupId}/>
        </>}
	</>
}

export default Main