import {useQueries,} from "@tanstack/react-query";
import {ResponseData, transactionResponse} from "@/model/interface.ts";
import {get} from "@/libs/api.ts";
import {useWalletStore} from "@/store/WalletStore.ts";
import {BudgetResponse} from "@/modules/budget/interface";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";

interface props {
	budgets: BudgetResponse[]
	transactions: transactionResponse[]
}


const fetchBudgets = (key: any): Promise<ResponseData> => {
	return get({url: "budgets", params: {wallet: key.queryKey[1]?.id}})
}


const fetchTranAll = (key: any): Promise<ResponseData> => {
	return get({url: "transactions", params: {wallet: key.queryKey[1]?.id}})
}

const useHomePage = (): props => {

	const {walletSelect} = useWalletStore()

	const data = useQueries({
		queries: [
			{queryKey: [nameQueryKey.budget, walletSelect], queryFn: fetchBudgets, enabled: !!walletSelect},
			{queryKey: [nameQueryKey.transaction_all, walletSelect], queryFn: fetchTranAll, enabled: !!walletSelect},
		],
	})

	return {
		budgets: data[0]?.data?.data || [],
		transactions: data[1]?.data?.data || []
	}
}

export default useHomePage