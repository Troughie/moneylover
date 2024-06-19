import {countTotal} from "@/modules/dashboard/interface";

export interface Category {
	id: string,

	name: string;

	categoryIcon: string;

	categoryType: string;

	debt_loan_type: number;
}

interface CategoryNew {
	value: string,

	label: string;

	emoji: string;

	type: string;
}

export enum typeCategory {
	Expense = "Expense",
	Income = "Income",
	Deb = "Debt_Loan"
}

interface baseTran {
	amount: number;
	notes: string;
	date: Date;

}

export interface transactionResponse extends baseTran {
	remind: boolean;
	exclude: boolean;
	id: number,
	category: Category
	done: boolean
}

export interface recurringRequest extends baseTran {
	wallet: string;
	category: string;
	forever: boolean
	date_of_week: number;
	from_date: Date;
	to_date: Date;
	frequency: string
	every: string
	for_time: number
	occurrence_in_month: number
}

export interface transactionRequest extends baseTran {
	wallet: string;
	remind: Date;
	exclude: boolean;
	category: string;
	type: string;
}

export interface ResponseData {
	message: string
	data: any | pagination | countTotal
	error: string
	success: boolean
}

export enum debt_loan_type {
	debt = 1,
	loan = 2
}

export interface pagination {
	content: never[]
	totalPage: number,
	documentsPerPage: number,
	pageNumber: number,
	totalDocument: number,
	isLast: boolean
}

export const parseToNewCate = (categories: Category[]) => {
	const newCate: CategoryNew[] = categories.map((e) => ({
		value: `${e.id}.${e.categoryType}`,
		label: (e.name),
		emoji: e.categoryIcon,
		type: e.categoryType,
	}))
	return newCate
}


export interface paginationRequest {
	pageNumber: number,
	documentsPerPage: number
	sort: string,
	field: string
}

export interface antdOptions {
	label: string
	value: string
}

export interface walletProps {
	id: string;
	name: string;
	type: string;
	balance: number;
	currency: string;
	start: number
	target: number
	main: boolean
}

interface RenamedWalletProps {
	id: string
	label: string;
	value: string;
	wallet_type: string;
	balance: number;
}

export const parseNewWallet = (wallets: walletProps[]) => {
	const newWallets: RenamedWalletProps[] = wallets.map((el) => ({
		id: el.id,
		label: el.name,
		value: el.id,
		wallet_type: el.type,
		balance: el.balance
	}));
	return newWallets
}
