import React from 'react';
import {Controller, useFormContext, FieldValue} from 'react-hook-form';

interface FormControllerProps {
	name: string;
	rules?: object;
	render: (props: { field: FieldValue<any> }) => JSX.Element;
	defaultValue?: any
	label?: string
}

const FormController: React.FC<FormControllerProps> = ({name, label, rules, render, defaultValue}) => {
	const {control, formState: {errors}} = useFormContext()

	return <>
		{label &&
            <label className="mb-[-10px] block font-medium text-black">
				{label}
            </label>}
		{errors[name] && (
			<span className="mb-[-10px] text-red-500">{errors[name]?.message?.toString()}</span>
		)}
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={render}
		/>

	</>
}

export default FormController;