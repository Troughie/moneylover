import {InputController, SelectInput} from "../../../commons";
import {Input} from "antd";

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

			<InputController defaultValue={typeWallet} name={"type"} render={({field}) => <Input defaultValue={typeWallet} hidden {...field}/>}/>

			<InputController name={"balance"} render={({field}) => <Input defaultValue={0} placeholder="Amount" {...field}/>}/>

			<InputController name={"currency"} render={({field}) => <SelectInput field={field} options={currency} title={"Select currency"}/>}/>
		</form>
	</>
}

export default WalletForm