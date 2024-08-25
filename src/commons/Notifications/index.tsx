import {NotificationProps} from "@/model/interface.ts";
import {Button, Empty} from "antd";
import useRequest from "@/hooks/useRequest.ts";
import {post} from "@/libs/api.ts";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {useQueryClient} from "@tanstack/react-query";
import NotificationCard from "@/commons/Notifications/notification.tsx";

interface props {
	notifications: NotificationProps[]
	btnType: string
	setBtnType: (status: string) => void
}

enum statusNoti {
	All = "All",
	Unread = "Unread"
}

const Notifications = ({notifications, setBtnType, btnType}: props) => {
	const queryClient = useQueryClient()

	const {mutate: MakeAllRead} = useRequest({
		mutationFn: (values: NotificationProps[]) => {
			return post({
				url: "notification/mark-all-as-read",
				data: values
			})
		},
		onSuccess: () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.notification])
		}
	})
	return <>
		<div
			className={`flex gap-2 flex-col h-[calc(100%*2)] overflow-y-scroll rounded-lg w-[40%] p-4 shadow-3 z-10 absolute top-[90%] right-[20px] bg-white`}
		>
			{notifications.length > 0 ?
				<>
					<div className={`flex-between `}>
						<div className={`flex gap-4`}>
							{Object.entries(statusNoti).map(([status]) => (
								<Button type={btnType === status ? "primary" : "default"} onClick={() => setBtnType(status)}>{status}</Button>
							))}
						</div>
						<p onClick={() => MakeAllRead(notifications)}
						   className={`text-blue-500 underline cursor-pointer hover:scale-105 duration-200`}>Mark
							all read</p>
					</div>
					{notifications?.map((e) => (
						<>
							<NotificationCard key={e.id} notification={e}/>
						</>
					))}
				</> : <Empty description={"No notifications"}/>}

		</div>
	</>
}

export default Notifications