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
			<InputController name={"wallet"} render={({field}) => <SelectInput field={field} options={wallets} title={"Select wallet"}/>}/>

			<InputController name={"category"} render={({field}) => <SelectInput field={field} options={categories} title={"Select categories"}/>}/>

			<InputController name={"day"} render={({field}) => <DatePicker {...field}/>}/>

			<InputController name={"amount"} render={({field}) => <Input defaultValue={0} placeholder="Amount" {...field}/>}/>

			<InputController name={"note"} render={({field}) => <TextArea placeholder="Note" {...field}/>}/>
		</form>
	</>
}

export default AddFormTransaction