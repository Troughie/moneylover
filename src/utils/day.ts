import dayjs from "dayjs";
import {antdOptions} from "@/model/interface.ts";
import {dateFormat} from "@/utils/index.ts";
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekday from "dayjs/plugin/weekday";
import {createdAt} from "@/modules/chat/function/chats.ts";

dayjs.extend(weekday);
dayjs.extend(isoWeek)
dayjs.extend(quarterOfYear)

interface dayOfWeek {
	value: string | number
	label: string
}

export const firstNLastNextMonth = () => {
	const now = dayjs();
	const currentMonth = now.month();
	const currentYear = now.year();

	const firstDayOfCurrentMonth = dayjs(new Date(currentYear, currentMonth, 1));

	const firstDayOfNextMonth = firstDayOfCurrentMonth.add(1, "month")
	return {
		start: firstDayOfNextMonth
	}
}

const convertTimeStampToDate = (createdAt: createdAt) => {
	return new Date((createdAt?.seconds + createdAt?.nanoseconds * 10 ** -9) * 1000)
}

export const timeSendMess = (createdAt: createdAt) => {
	const timeSend = convertTimeStampToDate(createdAt)
	return `${timeSend.getHours()}:${timeSend.getMinutes()}`
}

export const calculateElapsedTime = (createdAt: createdAt) => {
	const createdAtDate = convertTimeStampToDate(createdAt)
	const now = new Date();
	const elapsedTimeInMs = now.getTime() - createdAtDate?.getTime();

	const seconds = Math.floor(elapsedTimeInMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days}d`;
	if (hours > 0) return `${hours}h`;
	if (minutes > 0) return `${minutes}m`;
	return `${seconds}s`;
};

export const getCurrentOneWeek = () => {
	const dayFormat = "DD/MM"
	const now = dayjs();
	const currentMonth = now.month();
	const currentYear = now.year();

	const startOfCurrentWeek = now.startOf('isoWeek');
	const endOfCurrentWeek = now.endOf('isoWeek');

	const firstDayOfCurrentMonth = dayjs(new Date(currentYear, currentMonth, 1));
	const lastDayOfCurrentMonth = dayjs(new Date(currentYear, currentMonth + 1, 0));

	const result: antdOptions[] = [
		{
			value: `${startOfCurrentWeek.format(dateFormat)}-${endOfCurrentWeek.format(dateFormat)}-This week`,
			label: `This week (${startOfCurrentWeek.format(dayFormat)}-${endOfCurrentWeek.format(dayFormat)})`,
		},
		// 	label: `Next week (${startOfNextWeek.format(dayFormat)}-${endOfNextWeek.format(dayFormat)})`,
		// },
		{
			value: `${firstDayOfCurrentMonth.format(dateFormat)}-${lastDayOfCurrentMonth.format(dateFormat)}-This month`,
			label: `This month (${firstDayOfCurrentMonth.format(dayFormat)}-${lastDayOfCurrentMonth.format(dayFormat)})`
		},
		{
			value: "1",
			label: "Custom"
		}
	]

	return result

}


export const dayInWeek = () => {
	const startOfWeek = dayjs().startOf('week');
	const daysOfWeek: dayOfWeek[] = [];

	for (let i = 1; i < 8; i++) {
		daysOfWeek.push({
			label: startOfWeek.add(i, 'day').format('dddd'),
			value: i
		});
	}

	return daysOfWeek;
}

export const getDayAndPositionOfWeek = (day: Date | string | dayjs.Dayjs) => {
	const date = dayjs(day);

	const dayOfWeek = date.day();
	const daysOfWeekMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const dayOfWeekName = daysOfWeekMap[dayOfWeek];

	const startOfMonth = date.startOf("month");
	const weekOfMonth = date.isoWeek() - startOfMonth.isoWeek() + 1;

	return {
		dayName: dayOfWeekName,
		week: weekOfMonth,
		day: dayOfWeek
	}
}

export const parseFullForm = (date: Date | string | undefined) => {

	const today = dayjs().startOf("day")
	const dateCurrent = dayjs(date).startOf("day")
	if (!today.isSame(dateCurrent)) {
		return dayjs(date).format("dddd , DD-MM-YYYY")
	} else {
		return "Today  ,   " + dayjs(date).format("DD-MM-YYYY")
	}
}

export const convertToCurrentDate = (date: Date | string) => dayjs(new Date().setDate(new Date(date).getDate()))