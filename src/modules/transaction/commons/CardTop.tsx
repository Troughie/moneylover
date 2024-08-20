import cn from "@/utils/cn";
import {NumberFormatter} from "@/utils/Format";
import React, {useState} from "react";
import {parseFullForm} from "@/utils/day.ts";
import {transactionResponse} from "@/model/interface.ts";
import {Card} from "antd";
import {ModalPopUp} from "@/commons";
import TransitionChart from "@/modules/transaction/commons/Chart.tsx";

interface props {
	date?: Date | string
	id: number
	isNegative?: boolean,
	amount?: number
	data?: transactionResponse[]
	clickTransaction: (id: number) => void
}

const CardTop: React.FC<props> = ({amount, id, date, isNegative, data, clickTransaction}) => {
	const [isOpenChart, setIsOpenChart] = useState<boolean>(false)
	const handleCancel = () => {
		setIsOpenChart(false)
	}


	return <>
		<Card className={`w-full rounded-lg relative shadow-3`}>
			<div className={`flex-between w-[93%] py-6 md:p-4 md:shadow-3 cursor-pointer`} onClick={() =>
				clickTransaction(id)}>
				<div>{parseFullForm(date).toString()}</div>
				<div className={cn(`text-blue-600`, {"text-red-700": isNegative})}><NumberFormatter number={amount || 0}/></div>
			</div>
			<div className={`absolute top-[40%] right-[5px] cursor-pointer`} onClick={() => setIsOpenChart(true)}>
				<span className={`text-red-800 text-sm`}>See report</span>
			</div>
			<div
				className={`absolute top-0 right-0 z-10 w-8 h-8 rounded-full  items-center bg-red-700 text-white`}>
				<span className={` relative right-[-10px] top-[5px]`}>{data?.length}</span>
			</div>
		</Card>

		<ModalPopUp isModalOpen={isOpenChart} showCancel={false} handleOk={handleCancel} handleCancel={handleCancel} title={""}>
			<TransitionChart tran={data} type={"date"}/>
		</ModalPopUp>
	</>

}

export default CardTop