import {InputController, SelectInput} from "../../../commons";
import {DatePicker, Input} from "antd";

const currency = [
	{label: "VND", value: "VND"},
	{label: "USD", value: "USD"},
]

interface props {
	typeWallet: string
}

const WalletForm: React.FC<props> = ({typeWallet}) => {
	return <>
		<form className={`flex flex-col gap-4 mt-5`}>
			<InputController name={"name"} render={({field}) => <Input  {...field} placeholder={"Enter name wallet"}/>}/>

			<InputController defaultValue={typeWallet} name={"type"} render={({field}) => <Input hidden {...field}/>}/>

			<InputController name={"currency"} render={({field}) => <SelectInput field={field} options={currency} title={"Select currency"}/>}/>

			<InputController name={"start"} render={({field}) => <Input  {...field} placeholder={"Enter starting amount"}/>}/>

			<InputController name={"goal"} render={({field}) => <Input  {...field} placeholder={"Enter goal amount"}/>}/>

			<InputController name={"end_date"} render={({field}) => <DatePicker {...field}/>}/>

		</form>
	</>
}

export default WalletForm