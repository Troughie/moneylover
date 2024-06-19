import {Empty, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {transactionResponse} from "@/model/interface.ts";
import {NumberFormatter} from "@/utils/Format";
import React, {useState} from "react";
import {ModalPopUp} from "@/commons";
import {parseFullForm} from "@/utils/day.ts";
import TranDetail from "@/modules/transaction/commons/TranDetail.tsx";
import useRequest from "@/hooks/useRequest.ts";
import {del, post} from "@/libs/api.ts";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {useQueryClient} from "@tanstack/react-query";

interface props {
	isLoading: boolean
	data: transactionResponse[]
}

const TableTransactionRecurring: React.FC<props> = ({isLoading, data}) => {
	const queryClient = useQueryClient()

	const [isOpenChart, setIsOpenChart] = useState<boolean>(false)
	const [recurringSelect, setRecurringSelect] = useState<transactionResponse>()

	const clickTran = (e: transactionResponse) => {
		setIsOpenChart(true)
		setRecurringSelect(e)
	}

	const {mutate: deleteTransaction} = useRequest({
		mutationFn: (values: string | undefined) => {
			return del({
				url: `transaction/delete/${values}`,
			})
		},

		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.transactions, nameQueryKey.wallet])
			setIsOpenChart(false)
		}
	})

	const {mutate: addTransaction} = useRequest({
		mutationFn: (values: string | undefined) => {
			return post({
				url: `transactions/recurring/add/${values}`,
			})
		},

		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.transactions, nameQueryKey.wallet])
			setIsOpenChart(false)
		}
	})

	const deleteTranRecurring = (id?: string) => {
		deleteTransaction(id)
		setIsOpenChart(false)
	}


	const addTranRecurring = (id?: string) => {
		addTransaction(id)
		setIsOpenChart(false)
	}


	return <>
		<div className={`mt-10 px-4 md:px-20 font-satoshi `}>
			<div className={``}>
				{isLoading ? <Spin className={`flex justify-center mt-5`} indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/> :
					data?.length === 0 ? <Empty className={`mt-20`}/> :
						<div className={`grid md:grid-cols-2 gap-6`}>
							{data?.map((el) => (
								<div onClick={() => clickTran(el)} key={el.id}
									 className={`grid-cols-12 grid gap-6 w-full shadow-3 p-6 cursor-pointer`}>
									<div className={`col-span-2`}>
										<img className={` w-10 h-10 rounded-full`} src={el?.category?.categoryIcon} alt=""/>
									</div>
									<div className={`col-span-10`}>
										<div className={`flex-between`}>
											<span>{el?.category?.name}</span>
											<span><NumberFormatter number={el?.amount}/></span>
										</div>
										<span className={`text-xs text-bodydark2 mt-4`}>next {parseFullForm(el?.date).toString()}</span>
									</div>
								</div>
							))}
						</div>
				}
			</div>
		</div>
		<ModalPopUp isModalOpen={isOpenChart} showOke={false} showCancel={false} handleCancel={() => setIsOpenChart(false)}>
			<TranDetail tranDetail={recurringSelect} clickDelete={deleteTranRecurring} clickSecond={addTranRecurring}/>
		</ModalPopUp>
	</>
}

export default TableTransactionRecurring