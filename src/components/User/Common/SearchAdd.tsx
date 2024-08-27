import {Avatar} from "@/assets";
import {Button, Empty} from "antd";
import {useState} from "react";
import useDebounce from "@/hooks/useDebounce.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {get, post} from "@/libs/api.ts";
import {User} from "@/model/interface.ts";
import LoadingSpin from "@/components/Loading/loading.tsx";
import useRequest from "@/hooks/useRequest.ts";
import {motion as m} from "framer-motion"

const AddFriend = () => {
	const [valueSearch, setValueSearch] = useState<string>()
	const queryClient = useQueryClient()

	const searchUser = () => {
		return get({url: `user/search/${valueSearch}`})
	}
	const handleValueSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueSearch(e.target.value)
	}
	const {data, isLoading} = useQuery({
		queryKey: [nameQueryKey.friendsSearch, valueSearch],
		queryFn: searchUser,
	})

	const result: User[] = data?.data || []

	const {mutate: addFriend} = useRequest({
		mutationFn: (value: string) => {
			return post({
				url: `friend/add/${value}`,
			})
		},

		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.friendsSearch])
			setValueSearch(undefined)
		}
	})

	return <>
		<m.div
			initial={{x: "50%", opacity: 0}}
			animate={{x: 0, opacity: 1}}
			exit={{x: "50%", opacity: 0}}
		>
			<input onChange={useDebounce(handleValueSearch, 200)} type={"search"}
				   className={`py-4 px-4 rounded-full w-2/3  border-bodydark2 bg-bodydark1 `}
				   placeholder={"Search friend to add.."}/>
			<div className={`mt-8 grid grid-cols-2 gap-6`}>
				{isLoading ? <LoadingSpin/> :
					result.length > 0 ? result?.map((e) => (
						<div className={`p-4 shadow-3 flex-between rounded-lg border-bodydark border`}>
							<div className={`flex items-center gap-4`}>
								<img src={Avatar} alt={""} className={`size-10 rounded-full`}/>
								<div className={`flex flex-col justify-start`}>
									<span className={`font-bold text-lg`}>{e?.username || "hehehe"}</span>
									<span className={`py-4 font-normal text-sm`}>{e?.email || "hidden"}</span>
								</div>
							</div>
							<Button onClick={() => addFriend(e?.id)} className={``} type={"primary"}>Add</Button>
						</div>
					)) : <>
						{valueSearch && <Empty/>}
					</>
				}

			</div>
		</m.div>
	</>
}

export default AddFriend