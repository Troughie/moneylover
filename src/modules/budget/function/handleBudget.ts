import dayjs from "dayjs";
import {swalAlert} from "@/hooks/swalAlert.ts";
import {typeAlert} from "@/utils";
import {BudgetRequest, BudgetResponse, BudgetSimilar} from "@/modules/budget/interface";
import {MutateOptions} from "@tanstack/react-query";

export const handleSubmitBudget = (data: any, budgets: BudgetSimilar[], createBudget: (variables: any, options?: (MutateOptions<unknown, unknown, any, unknown> | undefined)) => void) => {
	const start = dayjs(data?.period_start);
	const end = dayjs(data?.period_end);

	if (end.diff(start) < 1) {
		swalAlert({
			message: "End date must be greater than start date!",
			type: typeAlert.error,
		});
		return;
	}

	const {category, wallet} = data;
	const categoryId = category.split(".")[0];

	const existBudget = budgets.find((el) =>
		end.isSame(dayjs(el.period_end)) &&
		start.isSame(dayjs(el.period_start)) &&
		el.category.find((e) => e.id === categoryId) &&
		el.wallet === wallet
	);

	const request: BudgetRequest = {
		...data,
		category: categoryId,
		id: existBudget?.id,
		period_start: start.format("YYYY-MM-DD"),
		period_end: end.format("YYYY-MM-DD")
	};

	if (existBudget) {
		swalAlert({
			message: ` budget for this time is already existed. Do you want to overwrite it or add to it?`,
			type: typeAlert.warning,
			btnText: "Overwrite",
			showCancel: true,
			showDeny: true,
			denyBtn: "Add to it ",
			thenFunc: (result) => {
				if (result.isConfirmed) {
					request.overWrite = true;
					createBudget(request);
				} else if (result.isDenied) {
					request.overWrite = false;
					createBudget(request);
				}
			},
		});
	} else {
		createBudget(request);
	}
};


export const mergeBudgetSimilar = (budgets: BudgetResponse[]) => {

	return budgets.reduce((result, budget) => {
		// const {category,...res}=budget
		const existBudget = result.find((b) => budget.name === b.name);
		if (!existBudget) {
			result.push({
				...budget,
				name: budget.name,
				category: [{...budget.category, idBudget: budget.id, amountBudget: budget.amount}],
				amount: budget.amount,
				wallet: budget.wallet,
				period_end: budget.period_end,
				period_start: budget.period_start,
				id: budget.id
			})
		} else {
			existBudget.amount += budget.amount
			existBudget.category.push({...budget.category, idBudget: budget.id, amountBudget: budget.amount})
		}
		return result
	}, [] as BudgetSimilar[])
}