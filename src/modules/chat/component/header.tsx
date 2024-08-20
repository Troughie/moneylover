import {chatOpenStore} from "@/modules/chat/store/chatStore.ts";

interface props {
	name: string | undefined
}

const Header = ({name}: props) => {
	const {setIsOpenChat, isOpenChat} = chatOpenStore()

	return <>
		<div className={`w-full py-4 border-l bg-nav border-bodydark px-2 flex-between`}>
			<span className={`font-bold text-3xl`}>{name ?? ""}</span>
			<button onClick={() => setIsOpenChat(!isOpenChat)}
					className={`rounded-full py-1 px-3 font-bold text-2xl hover:bg-gray-300 hover:scale-110 transition duration-300`}>X
			</button>
		</div>
	</>
}

export default Header