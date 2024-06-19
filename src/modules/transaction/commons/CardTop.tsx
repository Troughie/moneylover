import cn from "@/utils/cn";
import {NumberFormatter} from "@/utils/Format";
import React from "react";
import {parseFullForm} from "@/utils/day.ts";
import {transactionResponse} from "@/model/interface.ts";

interface props {
	date: Date | string
	id: number
	isNegative: boolean,
	amount?: number
	category?: transactionResponse[],
	clickTransaction: (id: number) => void
}

const CardTop: React.FC<props> = ({amount, id, date, isNegative, category, clickTransaction}) => {
	return <>
		<div className={`w-full relative cursor-pointer shadow-3 p-4`} onClick={() =>
			clickTransaction(id)}>
			<div className={`flex-between py-6 md:p-4 md:shadow-3`}>
				<div>{parseFullForm(date).toString()}</div>
				<div className={cn(`text-blue-600`, {"text-red-700": isNegative})}><NumberFormatter number={amount}/></div>
			</div>
			<div
				className={`absolute top-0 right-0 z-10 w-8 h-8 rounded-full  items-center bg-red-700 text-white`}>
				<span className={` relative right-[-10px] top-[5px]`}>{category?.length}</span>
			</div>
		</div>

	</>

}

export default CardTop