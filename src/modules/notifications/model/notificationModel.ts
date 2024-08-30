import {User} from "@/model/interface.ts";

export interface NotificationProps {
	id: string,
	user: string
	wallet: string
	unread: string
	category: string
	createdDate: string
	type: string
	message: string
	creator: User
}

export enum NotificationType {
	friend = "friend",
	transaction = "transaction",
	budget = "budget",
	budgetCreate = "budgetCreate"
}