import {billResponse} from "@/modules/bill/model";

const CalculatorBill = (transactions: billResponse[]) => {
	return transactions.reduce((result, el) => result + el.amount, 0)
}

export default CalculatorBill