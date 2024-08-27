import {useCallback, useState} from "react";
import cn from "@/utils/cn";
import AddFriend from "@/components/User/Common/SearchAdd.tsx";
import AllFriend from "@/components/User/Common/AllFriend.tsx";
import RequestFriend from "@/components/User/Common/RequestFriend.tsx";
import {AnimatePresence} from "framer-motion"

const Friends = () => {
	const [selectBtn, setSelectBtn] = useState<string>("All")


	const button = [
		{
			title: "All"
		},
		{
			title: "Request"
		},
		{
			title: "Add"
		}
	]

	const showContentFriend = useCallback(() => {
		if (selectBtn === "All") {
			return <AllFriend/>
		}

		if (selectBtn === "Request") {
			return <RequestFriend/>
		}
		return <><AddFriend/></>

	}, [selectBtn])

	return <>
		<div>
			<div className={`flex gap-3 items-center justify-start`}>
				{button.map((e) =>
					(
						<button onClick={() => setSelectBtn(e.title)}
								className={cn(`px-4 py-2 hover:scale-105 text-black hover:border-b-2 hover:border-b-blue-600`
									, {"border-b-2 border-b-blue-600": selectBtn === e.title})}>{e.title}</button>
					))}
			</div>
			<AnimatePresence>
				<div
					className={`mt-4 p-4 rounded-lg border border-bodydark`}>
					{showContentFriend()}
				</div>
			</AnimatePresence>
		</div>
	</>
}

export default Friends