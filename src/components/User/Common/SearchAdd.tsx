import {Avatar} from "@/assets";
import {Button} from "antd";

const AddFriend = () => {
	return <>
		<div>
			<input type={"search"} className={`py-4 px-4 rounded-full w-2/3  border-bodydark2 bg-bodydark1 `}
				   placeholder={"Search friend to add.."}/>
			<div className={`mt-8 grid grid-cols-2 gap-6`}>
				<div className={`p-4 shadow-3 flex-between rounded-lg border-bodydark border`}>
					<div className={`flex items-center gap-4`}>
						<img src={Avatar} alt={""} className={`size-10 rounded-full`}/>
						<div className={`flex flex-col justify-start`}>
							<span className={`font-bold text-lg`}>username</span>
							<span className={`py-4`}></span>
						</div>
					</div>
					<Button className={``} type={"primary"}>Add</Button>
				</div>
			</div>
		</div>
	</>
}

export default AddFriend