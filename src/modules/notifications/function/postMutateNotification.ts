import {useQueryClient} from "@tanstack/react-query";
import useRequest from "@/hooks/useRequest.ts";
import {NotificationProps, NotificationType} from "@/modules/notifications/model/notificationModel.ts";
import {post} from "@/libs/api.ts";
import {nameQueryKey} from "@/utils/nameQueryKey.ts";
import {useProfileStore} from "@/modules/userProfile/store";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {routePath} from "@/utils";
import {useUserStore} from "@/modules/authentication/store/user.ts";
import {createGroupChat} from "@/modules/chat/function/chats.ts";
import {useChatStore} from "@/modules/chat/store/chatStore.ts";


const useNotificationPost = () => {
	const navigate = useNavigate()
	const {user} = useUserStore.getState().user
	const queryClient = useQueryClient()
	const {setTypeFriend, setFriendOpen} = useProfileStore()
	const {fetchGroups} = useChatStore()
	const [notification, setNotification] = useState<NotificationProps>()
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

	const {mutate: MarkAsRead} = useRequest({
		mutationFn: (value: string) => {
			return post({
				url: `notification/mark-as-read/${value}`,
			})
		},
		showSuccess: false,
		onSuccess: async () => {
			// @ts-ignore
			queryClient.invalidateQueries([nameQueryKey.notification])
			if (notification?.type === NotificationType.friend) {
				setFriendOpen(true)
				if (notification?.message) {
					setTypeFriend("All")
					const users = [user, notification?.creator]
					await createGroupChat(notification?.creator?.id, notification?.creator?.username, users, "person")
					await fetchGroups()
				} else {
					setTypeFriend("Request")
				}
			}
			if (notification?.type === NotificationType.budget) {
				navigate(routePath.budget.path)
			}
		}
	})

	const handleMarkAsRead = (data: NotificationProps) => {
		if (data) {
			setNotification(data)
		}
		MarkAsRead(data.id)
	}

	return {
		MakeAllRead,
		handleMarkAsRead
	}

}

export default useNotificationPost