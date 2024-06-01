import {InputController, SelectInput} from "../../../commons";
import React from "react";
import {wallet} from "../../../pages/user/model";
import {DatePicker} from 'antd';

interface props {
	wallets: wallet[]
	categories: wallet[]
}

const FilterForm: React.FC<props> = ({wallets, categories}) => {
	const {RangePicker} = DatePicker
	return <>
		<InputController name={"wallet"}
						 render={({field}) => <SelectInput field={field} options={wallets} title={"Select wallet"}/>}/>

		<InputController name={"category"}
						 render={({field}) => <SelectInput field={field} options={categories} title={"Select category"}/>}/>

		<InputController name={"rangeDate"}
						 render={({field}) => <RangePicker {...field} className={`col-span-2`} style={{width: '100%'}}/>}/>
	</>
}

export default FilterForm