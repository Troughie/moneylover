import UserLayout from "../../../layout/userLayout.tsx";
import {BreakCrumb, FilterFormTransaction, FormTransaction, TableTransaction} from "../../../components";
import {Plus} from "../../../assets";
import {useEffect, useState} from "react";
import {categories, wallet, walletsDumData} from "../model";
import {Button} from "antd";

import Swal from 'sweetalert2'
import {ModalPopUp} from "../../../commons";
import {useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {transactionSchema} from "../../../libs/schema.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import useDayjs from "../../../libs/useDayjs.ts";
import {dateFormat, formattedDate, routePath} from "../../../utils";


const dataDum = [
	{id: 1, wallet: "food", amount: 1000, date: "20 - 6 - 2023", category: "shopping", note: ""},
	{id: 2, wallet: "food", amount: 1000, date: "20 - 6 - 2023", category: "shopping", note: ""},
	{id: 3, wallet: "food", amount: 1000, date: "20 - 6 - 2023", category: "shopping", note: ""},
	{id: 4, wallet: "food", amount: 1000, date: "20 - 6 - 2023", category: "shopping", note: ""},
]

const Transaction = () => {


	const navigate = useNavigate()
	// @ts-ignore
	const methods = useForm({mode: "onChange", resolver: yupResolver(transactionSchema), defaultValues: {day: useDayjs(formattedDate, dateFormat),}})
	const FilterMethods = useForm({mode: "onChange"})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [wallets, setWallets] = useState<wallet[]>([])

	const showModal = () => {
		if (wallets.length === 0) {
			setIsLoading(true)
			Swal.fire({
				title: 'Error!',
				text: 'You don\'t have wallet, do you want create a new wallet??',
				icon: 'warning',
				showCancelButton: true,
				cancelButtonColor: "#d33",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "Yes, i want"
			}).then((result) => {
				if (result.isConfirmed) {
					navigate(routePath.budget.path)
				}
			})
		} else {
			setIsModalOpen(true);
		}
	};

	const handleOk = (data: any) => {
		console.log(data)
	};

	const onSubmit = (data) => {
		console.log('Form submitted with data:', data);
		// Your submit logic here
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const subscription = FilterMethods.watch((value) =>
			console.log(value)
		)
		return () => subscription.unsubscribe()
	}, [FilterMethods.watch])

	useEffect(() => {
		setWallets([...walletsDumData])
	}, []);


	return <UserLayout>
		<BreakCrumb pageName={"transaction"}/>
		<div className={`w-full bg-white h-screen shadow-default`}>
			<form className={`px-4 md:px-10 lg:px-20 grid grid-cols-2 gap-4 lg:grid-cols-5 pt-10 md:gap-6`}>
				<FormProvider {...FilterMethods}>
					<FilterFormTransaction categories={categories} wallets={wallets}/>
				</FormProvider>
				<Button onClick={showModal}
						className={`lg:col-span-1 text-bodydark2 col-span-2 hover:scale-110 duration-500 flex-center gap-4`}>Add <img
					src={Plus} alt=""/></Button>
			</form>
			<TableTransaction data={dataDum} isLoading={isLoading}/>
			<ModalPopUp isModalOpen={isModalOpen} handleOk={methods.handleSubmit(handleOk)} handleCancel={handleCancel} title={"Add transaction"}>
				<FormProvider {...methods}>
					<FormTransaction wallets={wallets} categories={categories}/>
				</FormProvider>
			</ModalPopUp>
		</div>
	</UserLayout>
}

export default Transaction