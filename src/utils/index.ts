import {Bill, Budget, HomeUser, Login, Register, Transaction, Wallet} from "../pages";
import {IBudget, IDashBoard, ITransaction, IWallet} from "../assets";

export function capitalizeFirstLetter(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export const enum typeAlert {
	success = "success",
	error = "error",
	info = "info"
}


export interface route {
	path: string,
	name: string,
	element: () => JSX.Element
	icons: string
}

export const routePath = {
	login: {
		path: "/login",
		name: "Login",
		element: Login,
		icons: ""
	},
	register: {
		path: "/register",
		name: "Register",
		element: Register,
		icons: ""
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
	}
}

export const routePathArray = () => {

	const result: route[] = []
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {login, register, ...route} = routePath
	Object.entries(route).map(([, value]) => {
		result.push(value)
	})
	return result
}


export const filterOptionSelect = (input: string, option?: { label: string; value: string }) =>
	(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const date = new Date();
export const formattedDate = date.toISOString().split('T')[0].replace(/-/g, ' ');
export const dateFormat = 'YYYY-MM-DD';
