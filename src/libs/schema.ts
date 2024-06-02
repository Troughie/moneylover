import * as yup from "yup"

const today = new Date();
today.setHours(0, 0, 0, 0);

yup.addMethod(yup.number, 'divisibleBy', function (divisor: number, message: string) {
	return this.test('divisibleBy', message, function (value) {
		const {path, createError} = this;
		return value === undefined || value % divisor === 0 || createError({path, message: message || `Value must be divisible by ${divisor}`});
	});
});

declare module 'yup' {
	interface NumberSchema {
		divisibleBy(divisor: number, message: string): this;
	}
}
export const PATTERN_VALID_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const transactionSchema = yup.object().shape({
	wallet: yup.string().required('Select one wallet'),
	category: yup.string().required('Select one category'),
	day: yup.date().required("date is required"),
	amount: yup.number().nullable().required('Amount is required').typeError('Amount must be a number'),
	note: yup.string()
})

export const walletSchema = yup.object().shape({
	name: yup.string().required("Enter name wallet"),
	type: yup.string().required("Select one type first"),
	balance: yup.number().nullable().required('balance is required').typeError('balance must be a number'),
	currency: yup.string().required('Select one currency')
})

export const goalSchema = yup.object().shape({
	name: yup.string().required("Enter name wallet"),
	type: yup.string().required("Select one type first"),
	end_date: yup.date().required("End day is required").min(today, "End day must be later than today"),
	start: yup.number()
		.nullable()
		.required('Start amount is required')
		.typeError('Field must be a number')
		.when('currency', {
			is: (value: string) => value === 'VND',
			then: schema => schema.divisibleBy(1000, 'Start amount must be divisible by 1000'),
			otherwise: schema => schema
		}),
	goal: yup.number()
		.nullable()
		.required('Goal value is required')
		.typeError('Field must be a number')
		.when('currency', {
			is: (value: string) => value === 'VND',
			then: schema => schema.divisibleBy(1000, 'Goal value must be divisible by 1000'),
			otherwise: schema => schema
		}),
	currency: yup.string().required('Select one currency'),
});
export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.min(6, 'Email must be at least 6 characters')
		.max(60, 'Email must not exceed 60 characters')
		.matches(PATTERN_VALID_EMAIL, 'Email is not valid! ex:xxxxx@xxxx.xxx'),
	password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
})