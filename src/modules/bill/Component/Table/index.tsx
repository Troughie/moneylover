import useBillData from "@/modules/bill/function";
import {LoadingOutlined} from "@ant-design/icons";
import {Button, Empty, Spin} from "antd";
import {formatDate} from "@/utils/Format/formatDate.ts";
import dayjs from "dayjs";
import {NumberFormatter} from "@/utils/Format";

const TableBill = () => {
	const {bills, isFetching} = useBillData()
	console.log(bills)
	return <>
		<div className={`mx-40 p-4 shadow-3 mb-4`}>
			<p className={`text-xl font-bold`}>Remaining bills</p>
			<p className={`flex-between`}>
				<span className={`text-xs text-bodydark2`}>Overdue</span>
				<span className={`text-lg font-bold`}><NumberFormatter number={0}/></span>
			</p>
			<p className={`flex-between`}>
				<span className={`text-xs text-bodydark2`}>For today</span>
				<span className={`text-lg font-bold`}><NumberFormatter number={0}/></span>
			</p>
			<p className={`flex-between`}>
				<span className={`text-xs text-bodydark2`}>This period</span>
				<span className={`text-lg font-bold`}><NumberFormatter number={0}/></span>
			</p>
		</div>
		{isFetching ? <Spin className={`flex justify-center mt-5`} indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/> :
			bills?.length === 0 ? <Empty className={`mt-20`}/> :
				<div className={`grid relative w-full md:grid-cols-2 gap-8`}>
					{bills?.map((el) => {
						const dueDay = dayjs(el.from_date).diff(el.date, "day")
						return <div className={`flex gap-10 shadow-3 p-8`}>
							<img src={el.category.categoryIcon} alt="" className={`w-12 h-12 rounded-full`}/>
							<div className={`flex gap-4 flex-col`}>
								<span className={`font-bold text-xl`}>{el.category.name}</span>
								<span className={`text-xs text-bodydark2`}>Next bill is {formatDate(el.from_date).toString()}</span>
								<span className={`font-light text-lg`}>Due in {dueDay} days</span>
								<Button type={`primary`}>Pay <NumberFormatter number={el.amount}/></Button>
							</div>
						</div>
					})}
				</div>
		}

	</>
}

export default TableBill