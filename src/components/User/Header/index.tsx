import React, {useEffect, useState} from "react";
import {FilterWallet, ModalPopUp, Notifications} from "@/commons";
import {Calender, IBell, IUser} from "@/assets";
import {useLocation, useNavigate} from "react-router-dom";
import {delToken} from "@/utils/jwt.ts";
import ResetPassword from "@/modules/dashboard/component/form/reset.tsx";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {passwordSchema} from "@/libs/schema.ts";
import {useWallet} from "@/context/WalletContext.tsx";
import {useWalletStore} from "@/zustand/budget.ts";
import {changePassword, walletProps} from "@/model/interface.ts";
import {NumberFormatter} from "@/utils/Format";
import {useQueryClient} from "@tanstack/react-query";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import useRequest from "@/hooks/useRequest.ts";
import {post} from "@/libs/api.ts";
import {routePath} from "@/utils";
import {motion as m} from "framer-motion";

interface props {
	user_id: string
	username: string
	email: string
}

const HeaderUser = React.memo(() => {
	const {pathname} = useLocation()
	const navigate = useNavigate()
	const [popWallet, setPopWallet] = useState<boolean>(false)
	const [notifications, setNotifications] = useState<boolean>(false)
	const [currentDay, setCurrentDay] = useState<number>(0)
	const [user, setUser] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [toggleName, setToggleName] = useState<boolean>(false)
	const queryClient = useQueryClient()

	const {transactions, budgets, transaction, transaction_month, transaction_all} = nameQueryKey

	const method = useForm({mode: "onChange", resolver: yupResolver(passwordSchema)})

	const [walletCurrent, setWalletCurrent] = useState<walletProps>()

	const {wallets} = useWallet()


	const {walletSelect, addWallet} = useWalletStore()

	const {mutate: changePassword} = useRequest({
		mutationFn: (values: changePassword) => {
			return post({
				url: "auth/changePassword",
				data: values
			})
		},

		onSuccess: () => {
			logout(routePath.login.path)
		}
	})

	const handleOk = (data: any) => {
		const passwordNew: changePassword = {
			email,
			...data
		}
		changePassword(passwordNew)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const logout = (path: string = "/") => {
		delToken()
		navigate(path)
	}

	const today = () => {
		const date: Date = new Date()
		return date.getDate();
	}

	const jumpToDay = () => {
		console.log(new Date())
	}

	const chooseWallet = (data: walletProps) => {
		setWalletCurrent(data)
		addWallet(data)
		// @ts-ignore
		queryClient.invalidateQueries([transactions, budgets, transaction, transaction_all, transaction_month])
		setPopWallet(!popWallet)
	}

	useEffect(() => {
		setToggleName(false)
	}, [pathname]);


	useEffect(() => {
		const wallet = wallets.find(el => el.main)
		const wc1 = wallets.find(el => el.id === walletSelect?.id)
		if (!walletSelect) {
			if (wallet) {
				addWallet(wallet)
			}
		}
		if (wc1) {
			// @ts-ignore
			addWallet(wc1)
			setWalletCurrent(wc1)
		} else {
			// @ts-ignore
			addWallet(wallet)
			setWalletCurrent(wallet)
		}


	}, [walletSelect, wallets]);

	useEffect(() => {
		setCurrentDay(today())

		const user = localStorage.getItem("user")
		if (user) {
			const result: props = JSON.parse(user)
			setUser(result?.username)
			setEmail(result?.email)
		}
	}, []);


	return <>
		<m.div
			className={`flex justify-between sticky top-0 z-50 right-0 bg-white mx-4 rounded-2xl items-center p-6 shadow-3 mt-4`}>
			<div className={`flex gap-4 cursor-pointer`} onClick={() => {
				setPopWallet(!popWallet)
			}}>
				<img src="https://img.icons8.com/?size=100&id=13016&format=png&color=000000" alt="" className={`w-10 h-10 rounded-full bg-black`}/>
				<p>
					<p>{walletCurrent?.name}</p>
					<span className={`font-bold font-satoshi`}>{<NumberFormatter number={walletCurrent?.balance}/>}</span>
				</p>
			</div>
			{popWallet && <FilterWallet chooseWallet={chooseWallet}/>}
			{notifications && <Notifications/>}
			<div className={`flex gap-4 items-center relative`}>
				<div className={`cursor-pointer`} onClick={() => jumpToDay()}>
					<img src={Calender} alt=""/>
					<span className={`absolute bottom-0 left-[5%]`}>{currentDay}</span>
				</div>
				<div className={`cursor-pointer hover:animate-wiggle`} onClick={() => setNotifications(!notifications)}>
					<IBell/>
				</div>
				<p onClick={() => setToggleName(!toggleName)} className={`cursor-pointer font-satoshi text-xl font-medium flex-between gap-2`}>
					<IUser/><span>{user ?? "No name"}</span>
				</p>
			</div>
			{toggleName &&
                <>
                    <div className={`absolute top-[80px] bg-white p-8 shadow-3 right-0`}>
                        <ul className={`font-bold text-2xl`}>
                            <li onClick={() => setIsModalOpen(!isModalOpen)}
                                className={`cursor-pointer mx-2 mb-4 py-4 border-b-bodydark2 border-b`}>Setting
                            </li>
                            <li onClick={() => logout()} className={`mx-2 cursor-pointer`}>Logout</li>
                        </ul>
                    </div>
                </>
			}
		</m.div>
		<ModalPopUp isModalOpen={isModalOpen} handleOk={method.handleSubmit(handleOk)} handleCancel={handleCancel} title={`Change password`}>
			<FormProvider {...method}>
				<ResetPassword/>
			</FormProvider>
		</ModalPopUp>
	</>
})
export default HeaderUser