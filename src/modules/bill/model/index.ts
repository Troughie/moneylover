import {Category} from "@/model/interface.ts";

export interface billResponse {
	id: string;

	amount: number;

	notes: string;

	category: Category;

	date: Date;

	from_date: Date;

	frequency: string;

	every: number;
}
