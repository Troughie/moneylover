import {useEffect, useRef, useState} from "react";
import useMessage from "@/modules/chat/common/message.tsx";
import {Group, MergeMessage, sendMessageToGroup} from "@/modules/chat/function/chats.ts";
import {useUserStore} from "@/modules/authentication/store/user.ts";
import Search from "@/modules/chat/common/search.tsx";
import MsgBox from "@/modules/chat/common/msg.tsx";
import {IPen} from "@/assets";
import ChangeNameGroup from "@/modules/chat/common/changeNameGroup.tsx";
import {useChatStore} from "@/modules/chat/store/chatStore.ts";
import LoadingSpin from "@/components/Loading/loading.tsx";
import {similarTime} from "@/utils/day.ts";
import cn from "@/utils/cn";
import dayjs from "dayjs";

interface props {
	group: Group
}

const Main = ({group}: props) => {
	const [newMessage, setNewMessage] = useState<string>('');
	const [isOpenChangeName, setIsOpenChangeName] = useState<boolean>(false)
	const [sortMessages, setSortMessages] = useState<MergeMessage[]>([])
	const {messages, hasMoreMessages, isLoading, fetchMessage} = useMessage(group.id);
	const {user} = useUserStore.getState().user;
	const {fetchGroups} = useChatStore()
	const messageContainerRef = useRef<HTMLDivElement>(null);

	const handleScroll = async () => {
		if (messageContainerRef.current) {
			const {scrollTop} = messageContainerRef.current;
			if (scrollTop === 0 && group) {  // User has scrolled to the top
				await fetchMessage();  // Fetch more messages
			}
		}
	};

	useEffect(() => {
		const container = messageContainerRef.current;
		container?.addEventListener('scroll', handleScroll);

		return () => {
			container?.removeEventListener('scroll', handleScroll);
		};
	}, [fetchMessage]);

	useEffect(() => {
		const sortedMessages = messages?.sort((a, b) => {
			// Sort by latest message timestamp if unread count is the same
			const latestMessageTimeA = a?.createdAt || 0;
			const latestMessageTimeB = b?.createdAt || 0;

			return +latestMessageTimeA - +latestMessageTimeB;
		});
		const mergeMessSameTime = sortedMessages?.reduce((mess, curr) => {
			const existObj = mess.find((e: MergeMessage) => similarTime(e.timer, curr.timer) && e.sender.id === curr.sender.id)
			if (existObj) {
				existObj.message.push(curr)
			} else {
				mess.push({
					message: [{...curr}],
					time: curr.time,
					timer: curr.timer,
					sender: curr.sender
				})
			}
			return mess
		}, [] as MergeMessage[])
		setSortMessages(mergeMessSameTime)
	}, [messages]);

	useEffect(() => {
		// Scroll to the bottom of the message container whenever messages change
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight + 10;
		}
	}, [group]);

	const handleSendMessage = async (file: File[]) => {
		if (newMessage.trim()) {
			await sendMessageToGroup(group.id, user, newMessage, file);
			await fetchGroups()
			setNewMessage(''); // Clear input after sending
		}
	};


	return <>
		<div className={`h-full relative`}>
			<div className={`h-full`}>
				<div ref={messageContainerRef}
					 className={`flex flex-col px-4 pb-6 relative bg-main overflow-y-auto h-full max-h-[76vh] scrollbar-chat scroll-smooth`}>
					{group && hasMoreMessages &&
                        <div className={`mx-auto flex flex-col items-center`}>
                            <span className={`font-bold text-lg mt-2`}>{group?.name ?? ""}</span>
                            <span className={`mt-2 text-md text-bodydark font-satoshi`}>{group?.create} create this group</span>
                            <div className={`flex flex-col items-center`}>
                                <IPen func={() => setIsOpenChangeName(!isOpenChangeName)}
                                      className={`rounded-full p-2 cursor-pointer bg-gray-300 mt-1`}/>
                                <span>Name</span>
                            </div>
                        </div>
					}
					{isLoading && <LoadingSpin/>}
					<div className={`h-full flex flex-col gap-6`}>
						{sortMessages.map((msg, i) => {
							const isYour = msg?.sender?.id === user?.id
							return <div key={i}>
								<span className={`w-full flex-center my-8 text-bodydark2`}>{dayjs(msg.timer).format("D MM, YYYY, h:mm A")}</span>
								<span className={cn(`text-bodydark2 ml-8`, {"hidden": isYour})}>{msg.sender.username}</span>
								{msg.message.map((item, index) => {
									const lastMessPerson = msg.message.length - 1 === index
									const firstMessPerson = index === 0
									return <MsgBox key={item.id} msg={item} isYour={isYour} lastMessagePerson={lastMessPerson}
												   firstMessPerson={firstMessPerson}/>
								})}
							</div>
						})}
					</div>
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
                             groupId={group.id}/>
        </>}
	</>
}

export default Main