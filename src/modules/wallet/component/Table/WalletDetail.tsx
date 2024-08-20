import {NumberFormatter} from "@/utils/Format";
import {walletProps} from "@/model/interface.ts";
import React from "react";
import {Button} from "antd";
import {swalAlert} from "@/hooks/swalAlert.ts";
import {typeAlert} from "@/utils";
import useRequest from "@/hooks/useRequest.ts";
import {del} from "@/libs/api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {createGroupChat} from "@/modules/chat/function/chats.ts";
import {useUserStore} from "@/modules/authentication/store/user.ts";

interface props {
	infoWallet: walletProps | undefined
	isGoal: boolean
}

const WalletDetail: React.FC<props> = ({infoWallet, isGoal}) => {
	const {user} = useUserStore.getState().user
	const queryClient = useQueryClient()

	const {mutate: deleteWallet} = useRequest({
		mutationFn: (value: string) => {
			return del({
				url: `wallet/delete/${value}`,
			})
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.wallet, "wallets"])
		}
	})


	const clickDelete = (id?: string) => {
		swalAlert({
			type: typeAlert.info,
			title: `Do you want delete wallet `,
			message: "You will also delete all of its transactions, budgets ,bills, and this action cannot be undone.",
			showCancel: true,
			optional: {cancelButtonColor: "#3952c6", confirmButtonColor: "#b82126"},
			thenFunc: ((result) => {
				if (result.isConfirmed) {
					deleteWallet(id)
				}
			})
		})
	}
	return <>
		<div>
			<ul className={`flex flex-col gap-2`}>
				<li className={`flex-between`}><span className={`infoWallet`}>Name:</span>{infoWallet?.name}</li>
				<li className={`flex-between`}><span className={`infoWallet`}>Type:</span>{infoWallet?.type}</li>
				<li className={`flex-between`}><span className={`infoWallet`}>Balance:</span>{<NumberFormatter number={infoWallet?.balance}/>}
				</li>
				{isGoal &&
                    <>
                        <li className={`flex-between`}><span className={`infoWallet`}>Start amount:</span>{<NumberFormatter
							number={infoWallet?.start}/>}</li>
                        <li className={`flex-between`}><span className={`infoWallet`}>Goal balance:</span>{<NumberFormatter
							number={infoWallet?.target}/>}</li>
                    </>
				}
			</ul>
			<div className={`flex-center mt-8 gap-2`}>
				<Button type={`primary`} danger onClick={() => clickDelete(infoWallet?.id)} className={`text-red-700 `}>Delete wallet</Button>
				<Button type={`primary`}
						onClick={() => createGroupChat("test", [user?.id, "97648cdd-dd3c-4bfa-a1c1-3382dcd1814c"], [user?.username ?? "ngoc", "test"], user?.username ?? "ngoc")}
						className={``}>Share
					wallet</Button>
			</div>
		</div>
	</>
}

export default WalletDetail