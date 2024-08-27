import LoadingSpin from "@/components/Loading/loading.tsx";
import {Avatar} from "@/assets";
import {Button, Empty} from "antd";
import {get, post} from "@/libs/api.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {FriendProps} from "@/model/interface.ts";
import useRequest from "@/hooks/useRequest.ts";
import {motion as m} from "framer-motion"

const RequestFriend = () => {
	const queryClient = useQueryClient()

	const getAllFriend = () => {
		return get({url: `friends-receive`})
	}

	const {data, isLoading} = useQuery({
		queryKey: [nameQueryKey.friendsReceive,],
		queryFn: getAllFriend,
	})

	const {mutate: acceptFriend} = useRequest({
		mutationFn: (value: string) => {
			return post({
				url: `friends/accept/${value}`,
			})
		},

		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.friendsReceive])
		}
	})
	const result: FriendProps[] = data?.data || []
	return <>
		<div>
			<m.div
				initial={{x: "50%", opacity: 0}}
				animate={{x: 0, opacity: 1}}
				exit={{x: "50%", opacity: 0}}
				className={`mt-8 grid grid-cols-2 gap-6`}>
				{isLoading ? <LoadingSpin/> :
					result.length > 0 ? result?.map((e) => (
						<div className={`p-4 shadow-3 flex-between rounded-lg border-bodydark border`}>
							<div className={`flex items-center gap-4`}>
								<img src={Avatar} alt={""} className={`size-10 rounded-full`}/>
								<div className={`flex flex-col justify-start`}>
									<span className={`font-bold text-lg`}>{e?.user?.username || "hehehe"}</span>
									<span className={`py-4 font-normal text-sm`}>{e?.user?.email || "hidden"}</span>
								</div>
							</div>
							<div className={`flex-center flex-col gap-4`}>
								<Button onClick={() => acceptFriend(e?.user?.id)} className={``} type={"primary"}>Accept</Button>
								<Button className={`text-red-400`}>Cancel</Button>
							</div>
						</div>
					)) : <>
						{<Empty/>}
					</>
				}

			</m.div>
		</div>
	</>
}

export default RequestFriend