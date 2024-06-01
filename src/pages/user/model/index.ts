export interface wallet {
	label: string,
	value: string
}

export interface transaction {
	id: number,
	wallet: string,
	amount: number,
	date: string,
	category: string
	note: string
}

export const walletsDumData: wallet[] = [
	{
		label: "test1",
		value: "1"
	},
	{
		label: "test2",
		value: "2"
	},
	{
		label: "test3",
		value: "3"
	},
]

export const categories = [
	{
		label: "cate1",
		value: "1"
	},
	{
		label: "cate2",
		value: "2"
	},
	{
		label: "cate3",
		value: "3"
	},
]