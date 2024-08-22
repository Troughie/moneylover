import {HeaderUser} from "@/components";
import React, {ReactNode} from "react";
import NavBar from "@/components/User/NavBar";
import LoadingComponent from "@/components/Loading";
import FloatButtonAction from "@/components/FloatButtonAction";
import {Chat} from "@/modules";
import {chatOpenStore} from "@/modules/chat/store/chatStore.ts";
import {motion as m} from "framer-motion";

const UserLayout: React.FC<{ children: ReactNode }> = ({children}) => {
	const {setIsOpenChat, isOpenChat} = chatOpenStore()
	return <>
		<LoadingComponent/>
		<div className={`flex h-screen overflow-hidden bg-primary1`}>
			<FloatButtonAction onClick={() => setIsOpenChat(!isOpenChat)}/>
			{isOpenChat && <>
                <div
                    onClick={() => setIsOpenChat(!isOpenChat)}
                    className="fixed left-0 top-0 z-999 h-full w-full bg-black opacity-50"
                ></div>
                <Chat/>
            </>}

			<NavBar/>
			<div className={`relative flex flex-col w-full overflow-y-auto overflow-x-hidden`}>
				<HeaderUser/>
				<m.div
					initial={{opacity: 0.1}}
					animate={{opacity: 2}}
					transition={{duration: 2}}
					className={`mx-auto max-w-screen-2xl w-full p-4`}>
					{children}
				</m.div>
			</div>
		</div>
	</>
}

export default UserLayout