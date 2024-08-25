import React, {useEffect, useState} from "react";
import {FilterWallet, ModalPopUp, Notifications} from "@/commons";
import {Calender, IBell, ICopy, IUser} from "@/assets";
import {useLocation, useNavigate} from "react-router-dom";
import {delToken} from "@/utils/jwt.ts";
import ResetPassword from "@/modules/dashboard/component/form/reset.tsx";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {passwordSchema} from "@/libs/schema.ts";
import {useWallet} from "@/context/WalletContext.tsx";
import {useWalletStore} from "@/zustand/budget.ts";
import {changePassword, NotificationProps, walletProps} from "@/model/interface.ts";
import {NumberFormatter} from "@/utils/Format";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import useRequest from "@/hooks/useRequest.ts";
import {get, post} from "@/libs/api.ts";
import {routePath, typeAlert} from "@/utils";
import {motion as m} from "framer-motion";
import {useUserStore} from "@/modules/authentication/store/user.ts";
import {toastAlert} from "@/hooks/toastAlert.ts";
import {Badge} from "antd";

interface props {
	walletsOpen: React.Dispatch<React.SetStateAction<boolean>>
	notificationsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isWalletOpen: boolean
	isNotificationOpen: boolean
}

enum statusNoti {
	All = "All",
	Unread = "Unread"
}

const HeaderUser: React.FC<props> = ({walletsOpen, isWalletOpen, isNotificationOpen, notificationsOpen}) => {
	const {pathname} = useLocation()
	const navigate = useNavigate()
	const [currentDay, setCurrentDay] = useState<number>(0)
	const [btnType, setBtnType] = useState<string>(statusNoti.All)
	const {user} = useUserStore.getState().user
	const [email, setEmail] = useState<string>("")
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [toggleName, setToggleName] = useState<boolean>(false)
	const queryClient = useQueryClient()

	const {transactions, budgets, transaction, transaction_month, transaction_all} = nameQueryKey

	const method = useForm({mode: "onChange", resolver: yupResolver(passwordSchema)})

	const [walletCurrent, setWalletCurrent] = useState<walletProps>()

	const {wallets} = useWallet()


	const {walletSelect, addWallet} = useWalletStore()

	const handleChangeStatusBtnNotification = (status: string) => {
		setBtnType(status)
	}
	const fetchNotification = () => {
		return get({url: `notifications?status=${btnType}`})
	}
	const {data} = useQuery({queryKey: [nameQueryKey.notification, btnType], queryFn: fetchNotification})

	const result: NotificationProps[] = data?.data || []


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
		walletsOpen(!isWalletOpen)
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

		if (user) {
			setEmail(user?.email)
		}
	}, []);

	const savingID = () => {
		navigator.clipboard.writeText(user?.id).then(() =>
			toastAlert({type: typeAlert.success, message: "Copy successfully!"})
		)
	}


	return <>
		<m.div
			className={`flex justify-between sticky top-0 z-50 right-0 bg-white mx-4 rounded-2xl items-center p-6 shadow-3 mt-4`}>
			<div className={`flex gap-4 cursor-pointer`} onClick={() => {
				walletsOpen(!isWalletOpen)
			}}>
				<img src="https://img.icons8.com/?size=100&id=13016&format=png&color=000000" alt="" className={`w-10 h-10 rounded-full bg-black`}/>
				<p>
					<p>{walletCurrent?.name}</p>
					<span className={`font-bold font-satoshi`}>{<NumberFormatter number={walletCurrent?.balance}/>}</span>
				</p>
			</div>
			{isWalletOpen && <FilterWallet chooseWallet={chooseWallet} walletCurrent={walletCurrent}/>}
			{isNotificationOpen && <Notifications setBtnType={handleChangeStatusBtnNotification} btnType={btnType} notifications={result}/>}
			<div className={`flex gap-4 items-center relative`}>
				<div className={`cursor-pointer`} onClick={() => jumpToDay()}>
					<img src={Calender} alt=""/>
					<span className={`absolute bottom-0 left-[5%]`}>{currentDay}</span>
				</div>
				<Badge count={result.filter((e) => e.unread).length}>
					<m.div
						initial={{transform: "rotate(-9deg)"}}
						animate={{transform: "rotate(0)"}}
						transition={{duration: 0.4}}
						className={`cursor-pointer hover:animate-wiggle`} onClick={() => notificationsOpen(!isNotificationOpen)}>
						<IBell/>
					</m.div>
				</Badge>
				<p onClick={() => setToggleName(!toggleName)} className={`cursor-pointer font-satoshi text-xl font-medium flex-between gap-2`}>
					<IUser/><span>{user?.username ?? "No name"}</span>
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
			<div className={`flex items-center gap-4`}>
				<span className={`font-bold text-lg`}>ID: <span className={`text-sm font-normal font-satoshi`}>{user?.id}</span></span>
				<ICopy func={savingID} className={`cursor-pointer hover:scale-110 duration-300`} width={30} height={30}/>
			</div>
			<FormProvider {...method}>
				<ResetPassword/>
			</FormProvider>
		</ModalPopUp>
	</>
}
export default HeaderUser