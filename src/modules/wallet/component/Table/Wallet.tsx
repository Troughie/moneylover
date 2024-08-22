import {Button, Empty, Input, Spin, Switch} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import cn from "@/utils/cn";
import React, {useState} from "react";
import {NumberFormatter} from "@/utils/Format";
import {walletProps} from "@/model/interface.ts";
import useRequest from "@/hooks/useRequest.ts";
import {post} from "@/libs/api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {ModalPopUp} from "@/commons";
import CardManager from "@/modules/wallet/common/cardManager.tsx";

interface props {
	wallets: walletProps[],
	isFetching: boolean
	handleClick: (data: any) => void
}

const TableWallet: React.FC<props> = ({handleClick, wallets, isFetching}) => {

	const queryClient = useQueryClient()
	const [manager, setManager] = useState<boolean>(false)

	const handleOpenManager = () => {
		setManager(!manager)
	}

	const handleOkManager = () => {

	}

	const {mutate: changeMainWallet} = useRequest({
		mutationFn: (value) => {
			return post({
				url: `wallet/changeMain/${value}`,
			})
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.wallet])
		}
	})

	const onChangeWalletMain = (id: string | undefined) => {
		changeMainWallet(id)
	};
	return <>
		<div className={`text-center`}>
			<p className={`my-5 text-2xl font-bold  text-nowrap`}>List wallet</p>
			<div className={`grid pb-5 grid-cols-12 border-b-bodydark2 border-b text-center`}>
				<div className={`col-span-2 text-sm text-bodydark2`}>Id</div>
				<div className={`col-span-4 text-sm text-bodydark2`}>Name</div>
				<div className={`col-span-1 text-sm text-bodydark2`}>Type</div>
				<div className={`col-span-3 text-sm text-bodydark2`}>Balance</div>
				<div className={`col-span-1 text-sm text-bodydark2`}>Switch main</div>
				<div className={`col-span-1 text-sm text-bodydark2`}>Community</div>
			</div>
			{isFetching ?
				<Spin className={`flex justify-center mt-5`}
					  indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/> : wallets?.length === 0 ? (
					<Empty className={`mt-20`}/>
				) : (
					<>
						{wallets?.map((el, i) => (
							<div key={el.id} className={cn(`grid mt-2 grid-cols-12`, {"bg-blue-50": i % 2 === 0})}>
								<div onClick={() => handleClick(el)}
									 className={cn(`grid grid-cols-10 col-span-10 hover:scale-y-110 hover:font-semibold text-center duration-500 cursor-pointer py-4`)}>
									<span className={`col-span-2`}>{i}</span>
									<span className={`col-span-4`}>{el.name}</span>
									<span className={`col-span-1`}>{el.type}</span>
									<span className={`col-span-3`}>{<NumberFormatter number={el.balance}/>}</span>
								</div>
								<span className={cn(`col-span-1 flex-center `)}>{
									<Switch className={`w-1/2`} disabled={el?.main} checkedChildren={`Main wallet`}
											onClick={() => onChangeWalletMain(el.id)}
											checked={el?.main}
											unCheckedChildren=""/>}</span>
								<div onClick={handleOpenManager} className={`col-span-1 items-center text-center flex `}>
									<Button>Manager</Button>
								</div>
							</div>
						))}

					</>
				)}
		</div>
		<ModalPopUp width={800} isModalOpen={manager} handleOk={handleOkManager} showOke={false} showCancel={false} handleCancel={handleOpenManager}
					title={`List manager`}>
			<>
				<div className={`flex items-center gap-6`}>
					<strong className={`py-2 px-4 text-lg border border-bodydark2 bg-bodydark2 text-white rounded-lg`}>Total manager: <span
						className={`text-sm font-thin`}>10</span></strong>
					<Input className={`w-1/3`} type={`text`} placeholder={"Enter code manager to add"}/>
					<Button type={`primary`} className={``}>Add more...</Button>
				</div>
				<CardManager/>
			</>
		</ModalPopUp>
	</>
}

export default TableWallet