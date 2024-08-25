import create from 'zustand';
import {Group, getUserGroups, getLatestMessageForGroup} from "@/modules/chat/function/chats.ts";
import {useUserStore} from "@/modules/authentication/store/user.ts";

interface GroupState {
	groups: Group[];
	fetchGroups: () => Promise<void>;
}

interface handleChatOpen {
	isOpenChat: boolean
	setIsOpenChat: (open: boolean) => void
}

export const chatOpenStore = create<handleChatOpen>(set => ({
	isOpenChat: false,
	setIsOpenChat: (open: boolean) => {
		set({isOpenChat: open});
	},
}));

export const useChatStore = create<GroupState>(set => {
	return ({
		groups: [],
		fetchGroups: async () => {
			const {user} = useUserStore.getState().user

			const groups = await getUserGroups(user?.id); // Adjust if needed
			const lastMess = await Promise.all(
				groups?.map(async (e) => {
					const result = await getLatestMessageForGroup(e.id);
					return {...e, result};
				}) ?? []
			);

			const sortedGroups = lastMess?.sort((a, b) => {
				// Sort by latest message timestamp if unread count is the same
				const latestMessageTimeA = a.result?.createdAt || 0;
				const latestMessageTimeB = b.result?.createdAt || 0;

				return +latestMessageTimeB - +latestMessageTimeA;
			});
			set({groups: sortedGroups});
		},
	});
});