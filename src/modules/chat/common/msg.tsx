import {Message} from "@/modules/chat/function/chats.ts";
import cn from "@/utils/cn";

interface props {
	msg: Message
	isYour: boolean
}

const MsgBox = ({msg, isYour}: props) => {
	return <>
		<div className={`chat-message`}>
			<div className={cn(`flex items-end`, {"justify-end items-start": isYour})}>
				<div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start`}>
					<div className={cn(`flex gap-2`, {"flex-col": isYour})}>
						<span
							className={cn(`p-4 rounded-lg inline-block text-sm rounded-bl-none bg-gray-200 text-black`, {"bg-blue-500 text-white": isYour})}>
							{msg?.text}
						</span>
						<span className={cn(`flex items-end text-bodydark2 text-xs`, {"flex justify-end": isYour})}>{msg?.time}</span>
					</div>
				</div>
				<img src="#" alt="" className={cn(`size-6 rounded-full order-1`, {"flex items-start justify-start mt-2": isYour})}/>
			</div>

		</div>
	</>
}

export default MsgBox