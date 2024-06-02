import UserLayout from "../../../layout/userLayout.tsx";
import {BreakCrumb} from "../../../components";
import {useState} from "react";
import {Button} from "antd";

const ButtonBudget = [
	{
		name: "Old Budgets",
		value: 1
	},
	{
		name: "This month",
		value: 2
	},
	{
		name: "Future Budgets",
		value: 3
	},
]
const Budget = () => {
	const [indexSelect, setIndexSelect] = useState<number>(1)
	return <UserLayout>
		<BreakCrumb pageName={"Budget"}/>
		<div className={`container-wrapper p-10`}>
			<div className={`flex-center border-b-2 translate-x-[-10px] pb-5 mx-50`}>
				<Button size={`large`}>Add budget</Button>
			</div>
			<div className={`flex-center mx-10 mt-10`}>
				{ButtonBudget?.map((el, i) => (
					<span key={el.name} onClick={() => setIndexSelect(i)}
						  className={`${i === indexSelect ? "border-x-2 font-bold border-t-2 text-sm md:text-xl rounded-t-lg" : "border-b-2 "} px-10 cursor-pointer py-2 lg:py-5 text-nowrap text-xs md:text-lg border-bodydark`}>{el.name}</span>
				))}
			</div>
		</div>
	</UserLayout>
}

export default Budget