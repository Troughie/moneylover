import {useQuery} from "@tanstack/react-query";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {get} from "@/libs/api.ts";
import {ResponseData} from "@/model/interface.ts";
import {billResponse} from "@/modules/bill/model";

const fetchBill = (): Promise<ResponseData> => {
	return get({url: "bills"});
}

const useBillData = () => {
	const {data, isFetching} = useQuery({queryKey: [nameQueryKey.bills,], queryFn: fetchBill})

	if (data) {
		const result: billResponse[] = data?.data || []
		return {
			bills: result,
			isFetching
		}
	}
	return {
		bills: [],
		isFetching: false
	}
}

export default useBillData