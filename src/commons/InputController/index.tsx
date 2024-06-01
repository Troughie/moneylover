import React from 'react';
import {Controller, useFormContext, FieldValue} from 'react-hook-form';

interface FormControllerProps {
	name: string;
	rules?: object;
	render: (props: { field: FieldValue<any> }) => JSX.Element;
	defaultValue?: any
}

const FormController: React.FC<FormControllerProps> = ({name, rules, render, defaultValue}) => {
	const {control, formState: {errors}} = useFormContext()

	return <>
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={render}
		/>
		{errors[name] && (
			<span className="text-red-500">{errors[name]?.message?.toString()}</span>
		)}
	</>
}

export default FormController;