import {Bill, Budget, Forgot, HomeUser, Login, RecurringTran, Register, Transaction, Wallet} from "@/modules";
import {IBudget, IDashBoard, ITransaction, IWallet} from "../assets";
import {IconProps} from "@/model/interface.ts";

export function capitalizeFirstLetter(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export const enum typeAlert {
	success = "success",
	error = "error",
	info = "info",
	warning = "warning"
}

export const colorsProgress = {
	green: "#87d068",
	red: "#ef1702"
}


export interface route {
	path: string,
	name: string,
	element: () => JSX.Element
	icons: React.FC<IconProps>
}

export const routePath = {
	login: {
		path: "/login",
		name: "Login",
		element: Login,
		icons: null
	}, forgot: {
		path: "/forgot",
		name: "Forgot",
		element: Forgot,
		icons: null
	},
	register: {
		path: "/register",
		name: "Register",
		element: Register,
		icons: null
	}
	, dashboard: {
		path: "/dashboard",
		name: "Dashboard",
		element: HomeUser,
		icons: IDashBoard
	},
	transaction: {
		path: "/transaction",
		name: "Transaction",
		element: Transaction,
		icons: ITransaction
	}

	, budget: {
		path: "/budget",
		name: "Budget",
		element: Budget,
		icons: IBudget
	}
	, wallet: {
		path: "/wallet",
		name: "Wallet",
		element: Wallet,
		icons: IWallet
	}, bill: {
		path: "/bill",
		name: "Bill",
		element: Bill,
		icons: IWallet
	},
	recurring: {
		path: "/recurring",
		name: "Recurring",
		element: RecurringTran,
		icons: ITransaction
	}
}

export const routePathArray = () => {

	const result: route[] = []
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {login, bill, register, forgot, ...route} = routePath
	Object.entries(route).map(([, value]) => {
		result.push(value)
	})
	return result
}


export const filterOptionSelect = (input: string, option?: { label: string; value: string }) =>
	(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const dateFormat = 'DD/MM/YYYY';


export const limitNumber = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value))
}


