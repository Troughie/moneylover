import useRequest from "@/hooks/useRequest.ts";
import {post} from "@/libs/api.ts";
import {useState} from "react";
import {ResponseData, User} from "@/model/interface.ts";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {useQueryClient} from "@tanstack/react-query";

interface props {
	userId?: string
	walletId?: string
	permission?: string
}

const usePostWalletMutate = () => {
	const [userFound, setUserFound] = useState<User>()
	const [valueInput, setValueInput] = useState<string>()
	const queryClient = useQueryClient()

	const {mutate: getUser} = useRequest({
		mutationFn: (value) => {
			return post({
				url: `user/${value}`,
			})
		},
		showSuccess: false,
		onSuccess: (res: ResponseData) => {
			setUserFound(res?.data)
		}
	})

	const {mutate: addManagerToWallet} = useRequest({
		mutationFn: (value: props) => {
			return post({
				url: `manager/add`,
				data: value
			})
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.wallet])
		}
	})

	const {mutate: removeManager} = useRequest({
		mutationFn: (value: props) => {
			return post({
				url: `manager/delete`,
				data: value
			})
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.wallet])
		}
	})

	const {mutate: changeMainWallet} = useRequest({
		mutationFn: (value) => {
			return post({
				url: `wallet/changeMain/${value}`,
			})
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.wallet])
		}
	})


	const {mutate: changePermission} = useRequest({
		mutationFn: (value: props) => {
			return post({
				url: `manager/permission/change`,
				data: value
			})
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.wallet])
		}
	})


	const onChangeWalletMain = (id: string | undefined) => {
		changeMainWallet(id)
	};

	const addManager = async (func: Promise<void>, user: User | undefined, walletID: string) => {
		const param: props = {
			walletId: walletID,
			userId: user?.id
		}
		addManagerToWallet(param)
		setValueInput(undefined)
		setUserFound(undefined)
		await func
	}

	const getUserWithCode = (code: React.ChangeEvent<HTMLInputElement>) => {

		const value = code.target.value
		if (value.trim()) {
			getUser(value)
		}
	}

	return {getUserWithCode, userFound, valueInput, addManager, setValueInput, onChangeWalletMain, changePermission, removeManager}
}

export default usePostWalletMutate