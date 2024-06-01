import UserLayout from "../../../layout/userLayout.tsx";
import {formatNumber} from "../../../utils/Format";
import {IBudget, ITransaction, Saving} from "../../../assets";
import {BarChart, BreakCrumb, PieChart} from "../../../components";
import {CardDashBoard} from "../../../commons";
import {routePath} from "../../../utils";

const DashBoard = () => {
	return <UserLayout>
		<BreakCrumb pageName={""}/>
		<div className={`w-full h-screen grid md:grid-rows-4 gap-6`}>
			<div className={`grid grid-cols-1 md:grid-cols-12 gap-6 row-span-1 h-auto`}>
				<div
					className={`shadow-4 bg-white rounded-2xl md:col-span-6 py-8 lg:col-span-8 flex flex-col-reverse md:flex-row items-center justify-between px-6`}>
					<div className={`flex flex-col gap-5`}><span
						className={`text-3xl font-semibold`}>Welcome back </span><span
						className={`text-xl font-normal text-bodydark2`}>Total amount of you is {formatNumber(200000)}</span>
					</div>
					<img src={Saving} alt="" className={`w-40 h-40`}/>
				</div>
				<div className={`shadow-4 bg-white rounded-2xl md:col-span-3 lg:col-span-2`}>
					<CardDashBoard link={routePath.transaction.path} label={`Transaction`} img={ITransaction} amount={2000000} total={10}/>
				</div>
				<div className={`shadow-4 bg-white rounded-2xl md:col-span-3 lg:col-span-2`}>
					<CardDashBoard link={routePath.budget.path} label={`Budget`} img={IBudget} amount={2000000} total={2}/>
				</div>
			</div>
			<div className={`row-span-2 h-2/3 gap-6 grid grid-cols-1 md:grid-cols-12`}>
				<div className={`md:col-span-8 bg-white shadow-3 rounded-2xl p-4`}>
					<BarChart/>
				</div>
				<div className={`md:col-span-4 bg-white shadow-3 rounded-2xl p-4 flex justify-center items-center`}>
					<PieChart/>
				</div>
			</div>
		</div>
	</UserLayout>
}
export default DashBoard