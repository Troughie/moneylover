import UserLayout from "@/layout/userLayout.tsx";
import {BreakCrumb} from "@/components";
import {Button, Pagination} from "antd";
import React, {useEffect, useState} from "react";
import {ModalPopUp} from "@/commons";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {goalSchema, walletSchema} from "@/libs/schema.ts";
import {useQueryClient} from "@tanstack/react-query";
import {post} from "@/libs/api.ts";
import useRequest from "@/hooks/useRequest.ts";
import {walletProps} from "@/model/interface.ts";
import {GoalForm, TableWallet, WalletForm} from "../component";
import useWalletManager from "../function";
import {FormatValueInput} from "@/utils/Format/fortmat.value.input.ts";
import {useLocation} from "react-router-dom";
import {NumberFormatter} from "@/utils/Format";

interface type {
	name: string,
	value: string
}

const typeWallets: type[] = [
	{
		name: "basic Wallet",
		value: "basic"
	},
	{
		name: "Goal wallet",
		value: "goal"
	}
]
const Wallet = React.memo(() => {
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isWalletTypeOpen, setIsWalletTypeOpen] = useState<boolean>(false);
	const [isWalletInfoOpen, setIsWalletInfoOpen] = useState<boolean>(false);
	const [typeWallet, setTypeWallet] = useState<string>("")
	const [pageNumber, setPageNumber] = useState<number>(1)
	const location = useLocation();
	const isModalShow = location.state?.isModalOpen;

	const methods = useForm({mode: "onChange", defaultValues: {currency: "VND"}, resolver: yupResolver(walletSchema)})
	const goalForm = useForm({
		mode: "onChange",
		defaultValues: {currency: "VND", target: 0, start: 0, targetDisplay: "0", startDisplay: "0"},
		resolver: yupResolver(goalSchema)
	})

	useEffect(() => {
		if (isModalShow) {
			// Logic để hiển thị modal
			setIsWalletTypeOpen(true)
		}
	}, [isModalShow]);
	const [infoWallet, setInfoWallet] = useState<walletProps>()

	const balance = methods.watch("amountDisplay")
	const start = goalForm.watch("startDisplay")
	const goal = goalForm.watch("targetDisplay")
	const currency = methods.watch("currency")
	const currencyG = goalForm.watch("currency")

	const {mutate: createWallet} = useRequest({
		mutationFn: (value) => {
			return post({
				url: "addWallet",
				data: value
			})
		},
		onSuccess: () => {
			methods.reset()
			goalForm.reset()
			handleCancel()
			// @ts-ignore
			queryClient.invalidateQueries(["wallet", "wallets"])
		}
	})

	const {wallets, updatePagination, pagination, isFetching} = useWalletManager()
	const handleOk = (data: any) => {
		createWallet(data)
	};
	const handleSubmitGoal = (data: any) => {
		createWallet(data)
	};

	useEffect(() => {
		FormatValueInput(balance, methods.setValue, currency, "balance")
	}, [methods, balance, currency]);

	useEffect(() => {
		FormatValueInput(start, goalForm.setValue, currencyG, "start", "startDisplay", "balance")
	}, [start, currencyG]);

	useEffect(() => {
		FormatValueInput(goal, goalForm.setValue, currencyG, "target", "targetDisplay")
	}, [goal, currencyG]);


	const handleSelectTypeWallet = (type: string) => {
		setTypeWallet(type)
		setIsModalOpen(true)
		setIsWalletTypeOpen(!isWalletTypeOpen)
	}

	const handleInfoWallet = (item: walletProps) => {
		setIsWalletInfoOpen(!isWalletInfoOpen)
		setInfoWallet(item)
	}

	const handleCancel = () => {
		setIsWalletTypeOpen(false);
		setIsWalletInfoOpen(false);
		setIsModalOpen(false);
	};

	const handlePageChange = (pageNumber: number) => {
		// @ts-ignore
		updatePagination({pageNumber: pageNumber - 1});
	};
	useEffect(() => {
		handlePageChange(pageNumber)
	}, [pageNumber]);

	return <UserLayout>
		<BreakCrumb pageName={"Wallet"}/>
		<div className={`container-wrapper p-10 `}>
			<div className={`flex-center border-b pb-5 md:mx-50`}>
				<Button className={`font-bold text-xl `} onClick={() => setIsWalletTypeOpen(!isWalletTypeOpen)} size={`large`}>Add
					Wallet</Button>
			</div>
			<TableWallet wallets={wallets} isFetching={isFetching} handleClick={handleInfoWallet}/>
			{wallets?.length != 0 &&
                <Pagination onChange={(e) => setPageNumber(e)} defaultCurrent={pageNumber} className={`flex-center mt-40`}
                            total={pagination?.totalPage * 10}/>
			}
		</div>
		<ModalPopUp isModalOpen={isWalletTypeOpen} handleCancel={handleCancel} title={"Select wallet type"}>
			<div className={`grid grid-cols-2 gap-4`}>
				{typeWallets.map((el) => (
					<div onClick={() => handleSelectTypeWallet(el.value)} key={el.name} className={`size-[150px] shadow-3 p-4 cursor-pointer`}
					>{el.name}</div>
				))}
			</div>
		</ModalPopUp>
		<ModalPopUp isModalOpen={isWalletInfoOpen} handleOk={handleCancel} handleCancel={handleCancel} title={`Info wallet `}>
			<div>
				<ul className={`flex flex-col gap-2`}>
					<li className={`flex-between`}><span className={`infoWallet`}>Name:</span>{infoWallet?.name}</li>
					<li className={`flex-between`}><span className={`infoWallet`}>Type:</span>{infoWallet?.type}</li>
					<li className={`flex-between`}><span className={`infoWallet`}>Balance:</span>{<NumberFormatter number={infoWallet?.balance}/>}
					</li>
					{infoWallet?.type === "goal" &&
                        <>
                            <li className={`flex-between`}><span className={`infoWallet`}>Start amount:</span>{<NumberFormatter
								number={infoWallet?.start}/>}</li>
                            <li className={`flex-between`}><span className={`infoWallet`}>Goal balance:</span>{<NumberFormatter
								number={infoWallet?.target}/>}</li>
                        </>
					}
				</ul>
			</div>
		</ModalPopUp>
		<ModalPopUp
			isModalOpen={isModalOpen}
			handleOk={typeWallet === "basic" ? methods.handleSubmit(handleOk) : goalForm.handleSubmit(handleSubmitGoal)}
			handleCancel={handleCancel}
			title={`Add wallet to ${typeWallet}`}>
			{typeWallet === "basic" ? (
				<FormProvider {...methods}>
					<WalletForm/>
				</FormProvider>
			) : (
				<FormProvider {...goalForm}>
					<GoalForm/>
				</FormProvider>
			)}
		</ModalPopUp>
	</UserLayout>
})

export default Wallet