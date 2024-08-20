import NavLeft from "@/modules/chat/component/navleft.tsx";
import Header from "@/modules/chat/component/header.tsx";
import Main from "@/modules/chat/component/main.tsx";
import {useEffect, useState} from "react";
import {Group} from "@/modules/chat/function/chats.ts";
import {useUserStore} from "@/modules/authentication/store/user.ts";
import {useChatStore} from "@/modules/chat/store/chatStore.ts";

const Chat = () => {
	const {user} = useUserStore.getState()
	const [group, setGroup] = useState<Group>();
	const [id, setId] = useState<string>("")
	const {groups, fetchGroups} = useChatStore()
	useEffect(() => {
		const result = groups.find((el) => el.id === id)
		if (result) {
			setGroup(result)
		}
	}, [id, groups]);

	useEffect(() => {
		fetchGroups()
	}, [user?.user, id]);
	return <>
		<div className={`h-[90vh] rounded-lg mt-10 w-[80%] left-[50%] z-9999 translate-x-[-50%] absolute bg-white flex`}>
			<NavLeft groups={groups} setId={setId} id={id}/>
			<div className={`flex flex-col w-full relative`}>
				<Header name={group?.name}/>
				<Main groupId={id} group={group} setId={setId}/>
			</div>
		</div>
	</>
}

export default Chat