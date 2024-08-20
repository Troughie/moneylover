import BoxChat from "@/modules/chat/common/boxChat.tsx";
import {Group, markMessagesAsRead} from "@/modules/chat/function/chats.ts";
import React, {useEffect, useState} from "react";
import {useUserStore} from "@/modules/authentication/store/user.ts";
import useDebounce from "@/hooks/useDebounce.tsx";

interface props {
	groups: Group[]
	setId: React.Dispatch<React.SetStateAction<string>>
	id: string
}

const NavLeft = ({groups, setId, id}: props) => {
	const {user} = useUserStore.getState().user
	const [groupss, setGroupss] = useState<Group[]>([])
	const [valueSearch, setValueSearch] = useState<string>()
	useEffect(() => {
		const group = groups.at(0)
		if (group && !id) {
			setId(group.id)
		}
	}, [groups])

	useEffect(() => {
		setGroupss(groups)
	}, [groups]);

	const clickDetailMess = async (el: Group) => {
		await markMessagesAsRead(el.id, user?.id)
		if (valueSearch?.trim()) {
			setValueSearch("")
		}
		setId(el.id)
	}

	const searchGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueSearch(e.target.value)
		const result = groups.filter((el) => (el.name.includes(e.target.value)))
		setGroupss(result)
	}


	return <>
		<div className={`w-2/5 pl-4 min-w-[300px] bg-nav flex flex-col gap-4 pr-2`}>
			<span className={`px-2 pt-8 pb-4 font-bold text-2xl`}>Chats</span>
			<input type="search"
				   value={valueSearch}
				   onChange={useDebounce(searchGroup, 1000)}
				   className="block w-full py-4 ps-6 text-sm text-gray-900 border rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 border-blue-200"
				   placeholder="Searching.." required/>
			<span className={`text-lg text-bodydark`}>All chat</span>
			{
				groupss?.map((el) => (
					<div key={el.id} onClick={() => clickDetailMess(el)}>
						<BoxChat isSelect={id === el.id} group={el}/>
					</div>
				))
			}
		</div>
	</>
}

export default NavLeft