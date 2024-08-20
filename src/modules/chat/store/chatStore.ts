import create from 'zustand';
import {Group, getUserGroups} from "@/modules/chat/function/chats.ts";
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

export const useChatStore = create<GroupState>(set => ({
	groups: [],
	fetchGroups: async () => {
		const {user} = useUserStore.getState().user

		const groups = await getUserGroups(user?.id); // Adjust if needed
		set({groups});
	},
}));