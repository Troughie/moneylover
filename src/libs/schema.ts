import * as yup from "yup"

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

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.min(6, 'Email must be at least 6 characters')
		.max(60, 'Email must not exceed 60 characters')
		.matches(PATTERN_VALID_EMAIL, 'Email is not valid! ex:xxxxx@xxxx.xxx'),
	password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
})