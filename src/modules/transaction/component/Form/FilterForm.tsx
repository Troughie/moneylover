import {InputController, SelectInput} from "@/commons";
import {useCategory} from "@/context/CategoryContext.tsx";
import React from "react";
import {parseToNewCate} from "@/model/interface.ts";


const FilterForm = React.memo(() => {


	const {categories} = useCategory()
	const newCate = parseToNewCate(categories)
	return <>
		<InputController name={"category"}
						 render={({field}) => <SelectInput className={`w-2/5`} field={field} options={newCate} title={"Select category"}/>}/>

		
	</>
})

export default FilterForm