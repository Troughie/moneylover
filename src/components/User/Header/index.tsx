import {useEffect, useState} from "react";
import {FilterWallet} from "../../../commons";
import {Calender} from "../../../assets";
import {formatNumber} from "../../../utils/Format";

const HeaderUser = () => {
	const [popWallet, setPopWallet] = useState<boolean>(false)
	const [currentDay, setCurrentDay] = useState<number>(0)
	const today = () => {
		const date: Date = new Date()
		return date.getDate();
	}

	const jumpToDay = () => {
		console.log(new Date())
	}

	useEffect(() => {
		setCurrentDay(today())
	}, []);

	return <>
		<div
			className={`flex justify-between sticky top-0 z-50 right-0 bg-white mx-4 rounded-2xl items-center p-6 shadow-3 mt-4`}>
			<div className={`flex gap-4 cursor-pointer`} onClick={() => {
				setPopWallet(!popWallet)
			}}>
				<img src="#" alt="" className={`w-10 h-10 rounded-full bg-black`}/>
				<p>
					<p>Total</p>
					<span className={`font-bold font-satoshi`}>{formatNumber(1000)}</span>
				</p>
			</div>
			{popWallet && <FilterWallet/>}
			<div className={`flex gap-4 items-center relative`}>
				<div className={`cursor-pointer`} onClick={() => jumpToDay()}>
					<img src={Calender} alt=""/>
					<span className={`absolute bottom-0 left-[5%]`}>{currentDay}</span>
				</div>
				<p className={`font-satoshi text-xl font-medium`}>nguyen tien ngoc</p>
			</div>
		</div>
	</>
}
export default HeaderUser