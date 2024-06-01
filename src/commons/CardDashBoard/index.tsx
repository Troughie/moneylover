import {formatNumber} from "../../utils/Format";
import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";

interface props {
	img: string,
	label: string
	total: number,
	amount: number
	link: string
}

const CardDashBoard: React.FC<props> = ({amount, total, img, label, link}) => {
	return <>
		<div className={` p-5 flex flex-col justify-around h-full`}>
			<div className={`flex justify-between items-center `}>
				<div className={` rounded-full`}>
					<img src={img} alt="" className={`w-10 h-10`} style={{filter: 'invert(1)'}}/>
				</div>
				<Link to={link}><Button type="text" className={`text-bodydark2 hover:scale-105`}>Detail</Button></Link>
			</div>
			<div className={`flex flex-col justify-start`}>
				<p className={`text-xl font-bold`}>{label}</p>
				<p className={`text-bodydark2 py-2`}>Total : {total}</p>
				<p className={`text-xl text-body`}>Amount:<span
					className={` line-clamp-1`}> {formatNumber(amount)}</span></p>
			</div>

		</div>
	</>
}

export default CardDashBoard