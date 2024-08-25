import {calculateElapsedTime} from "@/utils/day.ts";
import {NotificationProps} from "@/model/interface.ts";

interface props {
	notification: NotificationProps
}

const NotificationCard = ({notification}: props) => {
	return (<div className="mt-2 hover:bg-gray-300 duration-200 cursor-pointer px-6 py-4 bg-white rounded-lg shadow w-full">
		<div className=" inline-flex items-center justify-between w-full">
			<div className="inline-flex items-center">
				<img
					src="https://cdn-icons-png.flaticon.com/128/763/763812.png"
					alt="Training Icon" className="w-6 h-6 mr-3"/>
				<h3 className="font-bold text-base text-gray-800">{notification.wallet}</h3>
			</div>
			<p className="text-xs text-gray-500">
				{calculateElapsedTime(notification.createdDate)} ago
			</p>
		</div>
		<div className={`flex-between`}>
			<p className="mt-1 text-sm">
				<span className={`font-bold text-lg`}> {notification.user} </span>
				<span> created a transaction for </span>
				<span className={`font-bold text-lg`}> {notification.category} </span> <br/>
			</p>
			{notification.unread && <div className={`bg-blue-500 rounded-full size-4`}></div>}
		</div>
	</div>)
}

export default NotificationCard