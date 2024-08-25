import {User, walletProps} from "@/model/interface.ts";
import {Empty, Input} from "antd";
import useDebounce from "@/hooks/useDebounce.tsx";
import CardFound from "@/modules/wallet/common/cardFound.tsx";
import CardManager from "@/modules/wallet/common/cardManager.tsx";
import React from "react";
import {useUserStore} from "@/modules/authentication/store/user.ts";

interface props {
	valueInput?: string
	userFound: User | undefined
	addManager: () => void
	wallet?: walletProps
	getUserWithCode: (code: React.ChangeEvent<HTMLInputElement>) => void
}

const ListManager: React.FC<props> = ({addManager, valueInput, getUserWithCode, userFound, wallet}) => {
	const {user} = useUserStore.getState().user

	const isOwner = () => {
		return wallet?.managers.filter((e) => e.user.id === user.id)
	}
	return <>
		<div className={`flex items-center gap-6 relative`}>
			<strong className={`py-2 px-4 text-lg border border-bodydark2 bg-bodydark2 text-white rounded-lg`}>Total manager: <span
				className={`text-sm font-thin`}>{wallet?.managers.length}</span></strong>
			<Input value={valueInput} onChange={useDebounce(getUserWithCode, 500)} className={`w-2/3`} type={`text`}
				   placeholder={"Enter code or email to add manager"}/>
			{userFound ?
				<CardFound addManager={addManager} userFound={userFound}/>
				:
				valueInput &&
                <>
                    <div
                        className={`absolute card_show shadow-card-2 flex gap-8 top-14 bg-gray-500 text-white rounded-xl rounded-tl-none right-[23%] w-1/2 p-4`}>

                        <Empty className={`text-white mx-auto`} description={"User not found"}/>
                    </div>
                </>
			}
		</div>
		{wallet?.managers.map((el) =>
			<CardManager key={el.user.id} manager={el} wallet={wallet} isOwner={isOwner()?.length == 0}/>
		)}
	</>
}

export default ListManager