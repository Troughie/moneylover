import {Message} from "@/modules/chat/function/chats.ts";
import cn from "@/utils/cn";
import dayjs from "dayjs";

interface props {
	msg: Message
	isYour: boolean
	lastMessagePerson: boolean
	firstMessPerson: boolean
}

const MsgBox = ({msg, isYour, lastMessagePerson, firstMessPerson}: props) => {
	return <>
		<div>
			<div className={cn(`flex items-end h-full`, {"justify-end items-start": isYour})}>
				<div className={`flex flex-col h-full space-y-2 text-xs max-w-xs mx-2 order-2 items-start`}>
					<div className={cn(`relative flex flex-col gap-1`)}>
						<div className={`inline-block pl-6`}>
							{msg.files.length > 0 && <>
								{msg.files.map((e) => (
									<img src={e} alt="" className={`object-contain rounded-lg`}/>
								))}
                            </>}
						</div>
						<div className={cn(`flex items-end group`, {" justify-end": isYour})}>
							<div className={cn(`flex justify-end items-end h-full`, {"hidden": isYour || !lastMessagePerson})}>
								<img src="#" alt="" className={cn(`size-6 rounded-full order-1`, {"flex": isYour})}/>
							</div>
							<div className={cn(`relative w-full`, {"flex justify-end": isYour, "ml-6": !isYour && !lastMessagePerson})}>
								<span
									className={cn(`p-4 rounded-full inline-block text-sm bg-gray-200 text-black`,
										{
											"bg-blue-500 text-white": isYour,
											"rounded-tr-sm": isYour && lastMessagePerson,
											"rounded-br-sm": isYour && firstMessPerson,
											"rounded-e-[190rem]": isYour && !lastMessagePerson && !firstMessPerson,
											"rounded-s-[190rem]": !isYour && !lastMessagePerson && !firstMessPerson,
											"rounded-bl-sm": !isYour && firstMessPerson,
											"rounded-tl-sm": !isYour && lastMessagePerson
										}
									)}>
							{msg?.text}
								</span>
							</div>
							<span
								className={cn(`group-hover:flex duration-300 hidden absolute top-5 min-w-fit text-nowrap p-2 rounded-lg bg-gray-200 shadow-3`
									, {
										"-left-42.5": isYour,
										"-right-42.5": !isYour
									}
								)}>{dayjs(msg.timer).format('MMMM D, YYYY, h:mm A')}</span>
						</div>
					</div>

				</div>
			</div>

		</div>
	</>
}

export default MsgBox