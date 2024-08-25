import {HeaderUser} from "@/components";
import React, {ReactNode, useEffect, useState} from "react";
import NavBar from "@/components/User/NavBar";
import LoadingComponent from "@/components/Loading";
import FloatButtonAction from "@/components/FloatButtonAction";
import {Chat} from "@/modules";
import {chatOpenStore, useChatStore} from "@/modules/chat/store/chatStore.ts";
import {motion as m} from "framer-motion";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {categorySchema} from "@/libs/schema.ts";
import {ModalPopUp} from "@/commons";
import CreateCateForm from "@/components/Form/CreateCateForm.tsx";
import {openCategoryForm} from "@/store/CategoryStore.ts";
import useRequest from "@/hooks/useRequest.ts";
import {post} from "@/libs/api.ts";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {useUserStore} from "@/modules/authentication/store/user.ts";

interface CateReq {
	type: string;
	icon: string;
	name: string;
}

const UserLayout: React.FC<{ children: ReactNode }> = ({children}) => {
	const {setIsOpenChat, isOpenChat} = chatOpenStore()
	const {user} = useUserStore.getState().user
	const [walletOpen, setWalletOpen] = useState<boolean>(false)
	const [notification, setNotification] = useState<boolean>(false)
	const Methods = useForm({mode: "onChange", resolver: yupResolver(categorySchema)});
	const {setOpenModal, openModal} = openCategoryForm()
	const {groups, fetchGroups} = useChatStore()

	const cancelModal = () => {
		setWalletOpen(false)
		setNotification(false)
	}

	useEffect(() => {
		fetchGroups()
	}, [user]);

	const {mutate: createCategory} = useRequest({
		mutationFn: (values: CateReq) => {
			return post({
				url: "category/add",
				data: values,
			});
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.categories]);
			Methods.reset();
			setOpenModal(false);
		},
	});

	const handleOke = (data: CateReq) => {
		createCategory(data);
	};
	return <>
		<LoadingComponent/>
		<ModalPopUp isModalOpen={openModal} handleOk={Methods.handleSubmit(handleOke)} handleCancel={() => setOpenModal(false)}>
			<FormProvider {...Methods}>
				<CreateCateForm/>
			</FormProvider>
		</ModalPopUp>
		<div className={`flex bg-mainLinear h-screen overflow-hidden bg-primary1`}>
			<FloatButtonAction count={groups.filter(group => group.unreadCount[user?.id] > 0).length} onClick={() => setIsOpenChat(!isOpenChat)}/>
			{isOpenChat && <>
                <div
                    onClick={() => setIsOpenChat(!isOpenChat)}
                    className="fixed left-0 top-0 z-999 h-full w-full bg-black opacity-50"
                ></div>
                <Chat/>
            </>}

			<NavBar/>
			<div className={`relative flex flex-col w-full overflow-y-auto overflow-x-hidden`}>
				<HeaderUser notificationsOpen={setNotification} isNotificationOpen={notification} walletsOpen={setWalletOpen}
							isWalletOpen={walletOpen}/>
				<m.div
					onClick={cancelModal}
					initial={{opacity: 0.1}}
					animate={{opacity: 2}}
					transition={{duration: 2}}
					className={`mx-auto max-w-screen-2xl w-full p-4`}>
					{children}
				</m.div>
			</div>
		</div>
	</>
}

export default UserLayout