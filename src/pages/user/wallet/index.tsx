import UserLayout from "../../../layout/userLayout.tsx";
import {BreakCrumb, WalletForm} from "../../../components";
import {Button} from "antd";
import {useEffect, useState} from "react";
import {ModalPopUp} from "../../../commons";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {walletSchema} from "../../../libs/schema.ts";
import {wallet, walletsDumData} from "../model";
import {IDelete} from "../../../assets";
import cn from "../../../utils/cn";

interface type {
	name: string,
	value: number
}

const typeWallets: type[] = [
	{
		name: "basic Wallet",
		value: 1
	},
	{
		name: "Linked wallet",
		value: 2
	},
	{
		name: "Credit wallet",
		value: 3
	},
	{
		name: "Goal wallet",
		value: 4
	}
]
const Wallet = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isWalletTypeOpen, setIsWalletTypeOpen] = useState<boolean>(false);
	const [isWalletInfoOpen, setIsWalletInfoOpen] = useState<boolean>(false);
	const [typeWallet, setTypeWallet] = useState<string>("")
	const methods = useForm({defaultValues: {currency: "VND"}, resolver: yupResolver(walletSchema)})
	const [wallets, setWallets] = useState<wallet[]>()
	const [infoWallet, setInfoWallet] = useState<wallet>()
	const handleOk = (data: any) => {
		console.log(data)
	};

	const handleSelectTypeWallet = (type: string) => {
		setTypeWallet(type)
		setIsWalletTypeOpen(!isWalletTypeOpen)
		setIsModalOpen(!isModalOpen)
	}

	const handleInfoWallet = (item: wallet) => {
		setIsWalletInfoOpen(!isWalletInfoOpen)
		setInfoWallet(item)
	}

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleCancelType = () => {
		setIsWalletTypeOpen(false);
	};
	const handleCancelInfo = () => {
		setIsWalletInfoOpen(false);
	};

	useEffect(() => {
		setWallets(walletsDumData)
	}, []);

	return <UserLayout>
		<BreakCrumb pageName={"Wallet"}/>
		<div className={`container-wrapper p-10 `}>
			<div className={`flex-center border-b pb-5 md:mx-50`}>
				<Button className={`font-bold text-xl `} onClick={() => setIsWalletTypeOpen(!isWalletTypeOpen)} size={`large`}>Add
					Wallet</Button>
			</div>
			<div className={`text-center`}>
				<p className={`my-5 text-2xl font-bold  text-nowrap`}>List wallet</p>
				<div className={`grid pb-5 grid-cols-12 border-b-bodydark2 border-b text-center`}>
					<div className={`col-span-1 text-sm text-bodydark2`}>Id</div>
					<div className={`col-span-3 text-sm text-bodydark2`}>Name</div>
					<div className={`col-span-2 text-sm text-bodydark2`}>Type</div>
					<div className={`col-span-3 text-sm text-bodydark2`}>Balance</div>
					<div className={`col-span-2 text-sm text-bodydark2`}>Action</div>
				</div>
				{wallets?.length === 0 ? (
					<span>No wallet found.</span>
				) : (
					wallets?.map((el, i) => (
						<div onClick={() => handleInfoWallet(el)}
							 className={cn(`grid mt-2 grid-cols-12 hover:scale-110 hover:font-semibold text-center duration-500 cursor-pointer py-4`, {"bg-blue-50": i % 2 === 0})}>
							<span className={`col-span-1`}>{i}</span>
							<span className={`col-span-3`}>{el.label}</span>
							<span className={`col-span-2`}>{el.value}</span>
							<span className={`col-span-3`}>{el.value}</span>
							<span className={`col-span-3`}><img src={IDelete} alt=""/></span>
						</div>
					))
				)}
			</div>
		</div>
		<ModalPopUp isModalOpen={isWalletTypeOpen} handleCancel={handleCancelType} title={"Select wallet type"}>
			<div className={`grid grid-cols-2 gap-4`}>
				{typeWallets.map((el) => (
					<div key={el.name} className={`size-[150px] shadow-3 p-4 cursor-pointer`}
						 onClick={() => handleSelectTypeWallet(el.name)}>{el.name}</div>
				))}
			</div>
		</ModalPopUp>
		<ModalPopUp isModalOpen={isWalletInfoOpen} handleOk={handleCancelInfo} handleCancel={handleCancelInfo} title={`Info wallet `}>
			<div className={`grid grid-cols-2 gap-4`}>
				hello
			</div>
		</ModalPopUp>
		<ModalPopUp isModalOpen={isModalOpen} handleOk={methods.handleSubmit(handleOk)} handleCancel={handleCancel} title={"Add transaction"}>
			<FormProvider {...methods}>
				<WalletForm typeWallet={typeWallet}/>
			</FormProvider>
		</ModalPopUp>
	</UserLayout>
}

export default Wallet