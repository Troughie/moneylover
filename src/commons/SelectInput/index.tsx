import {filterOptionSelect} from "../../utils";
import {Select} from "antd";

interface props {
	field: any
	options: any
	title: string
}

const SelectInput: React.FC<props> = ({field, options, title}) => {
	return <>
		<Select {...field}
				showSearch
				placeholder={title}
				optionFilterProp="children"
				filterOption={filterOptionSelect}
				options={options}
		/>
	</>
}

export default SelectInput