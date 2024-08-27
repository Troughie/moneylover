import LoadingSpin from "@/components/Loading/loading.tsx";
import {Avatar} from "@/assets";
import {Empty} from "antd";
import {useQuery} from "@tanstack/react-query";
import {get} from "@/libs/api.ts";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {FriendProps} from "@/model/interface.ts";
import {motion as m} from "framer-motion"

const AllFriend = () => {
	// const queryClient = useQueryClient()

	const getAllFriend = () => {
		return get({url: `friends-request`, params: {type: "accepted"}})
	}

	const {data, isLoading} = useQuery({
		queryKey: [nameQueryKey.friendsSearch,],
		queryFn: getAllFriend,
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
						</div>
					)) : <>
						{<Empty/>}
					</>
				}

			</m.div>
		</div>
	</>
}

export default AllFriend