import {Empty, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {debt_loan_type, transactionResponse} from "@/model/interface.ts";
import {NumberFormatter} from "@/utils/Format";
import React, {useState} from "react";
import CardBottom from "@/modules/transaction/commons/CardBottom.tsx";
import CardTop from "@/modules/transaction/commons/CardTop.tsx";
import {ModalPopUp} from "@/commons";
import TransitionChart from "@/modules/transaction/commons/Chart.tsx";

interface props {
	isLoading: boolean
	data: transactionResponse[]
	openBalance: number
	endBalance: number
	openDetail: (tran: transactionResponse) => void
}

enum typeCategory {
	Expense = "Expense",
	Income = "Income"
}

const TableTransaction: React.FC<props> = ({isLoading, openDetail, data, endBalance, openBalance}) => {

	const [isSelect, setIsSelect] = useState<number[]>([])
	const [isOpenChart, setIsOpenChart] = useState<boolean>(false)

	const clickTransaction = (id: number) => {
		if (isSelect.includes(id)) {
			const result = isSelect.filter(el => el != id)
			setIsSelect(result)
		} else {
			setIsSelect(prev => ([...prev, id]))
		}
	}

	const handleCancel = () => {
		setIsOpenChart(false)
	}

	const resultData = data?.reduce((result, obj) => {
		const existInObj = result.find(item => item?.date === obj.date)
		const isPlusAmount = obj?.category?.categoryType === typeCategory.Income || obj?.category?.debt_loan_type === debt_loan_type.debt
		const isDivideAmount = obj?.category?.categoryType === typeCategory.Expense || obj?.category?.debt_loan_type === debt_loan_type.loan
		if (existInObj) {
			if (isDivideAmount) {
				existInObj.amount -= obj?.amount;
			} else if (isPlusAmount) {
				existInObj.amount += obj?.amount;
			}
		} else {
			if (isDivideAmount) {
				result.push({...obj, amount: -obj?.amount})
			} else if (isPlusAmount) {
				result.push({...obj})
			}
		}
		return result
	}, [] as transactionResponse[])

	return <>
		{data?.length > 0 && <div className={`py-4 px-6 shadow-3 md:w-2/5 mx-auto `}>
            <p className={`flex-between`}>
                <span className={`text-sm text-bodydark2`}>Opening balance</span>
                <span><NumberFormatter number={openBalance}/></span>
            </p>
            <p className={`flex-between my-4`}>
                <span className={`text-sm text-bodydark2`}>Ending balance</span>
                <span><NumberFormatter number={endBalance}/></span>
            </p>
            <span className={`flex-center text-sm text-green-600 cursor-pointer`} onClick={() => setIsOpenChart(!isOpenChart)}>View report for this period</span>
        </div>}

		<div className={`mt-10 px-4 md:px-20 font-satoshi `}>
			<div className={``}>
				{isLoading ? <Spin className={`flex justify-center mt-5`} indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/> :
					data.length === 0 ? <Empty className={`mt-20`}/> :
						<>
							{resultData?.map((header, i) => {
								const isNegative = header?.amount < 0
								const category = data?.filter(el => el.date === header?.date)
								return <div className={`flex relative w-full  flex-wrap gap-x-3`} key={i}>
									<CardTop date={header?.date} isNegative={isNegative} amount={header?.amount}
											 clickTransaction={clickTransaction} id={header.id} category={category}/>

									<CardBottom isSelect={isSelect.includes(header?.id)} openDetail={openDetail} trans={category}/>
								</div>
							})}
						</>}
			</div>
		</div>
		<ModalPopUp isModalOpen={isOpenChart} handleOk={handleCancel} handleCancel={handleCancel} title={""}>
			<TransitionChart tran={data}/>
		</ModalPopUp>
	</>
}

export default TableTransaction