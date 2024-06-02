import {DatePicker, Input} from "antd";
import {wallet} from "../../../pages/user/model";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import {InputController, SelectInput} from "../../../commons";

interface props {
	wallets: wallet[]
	categories: wallet[]
}

const AddFormTransaction: React.FC<props> = ({wallets, categories}) => {
	return <>
		<form className={`flex flex-col gap-4 mt-5`}>
			<InputController label={`Wallet`} name={"wallet"}
							 render={({field}) => <SelectInput field={field} options={wallets} title={"Select wallet"}/>}/>

			<InputController label={`Category`} name={"category"}
							 render={({field}) => <SelectInput field={field} options={categories} title={"Select categories"}/>}/>

			<InputController label={`Date`} name={"day"} render={({field}) => <DatePicker {...field}/>}/>

			<InputController label={`Amount`} name={"amount"} render={({field}) => <Input defaultValue={0} placeholder="Amount" {...field}/>}/>

			<InputController label={`Note`} name={"note"} render={({field}) => <TextArea placeholder="Note" {...field}/>}/>
		</form>
	</>
}

export default AddFormTransaction