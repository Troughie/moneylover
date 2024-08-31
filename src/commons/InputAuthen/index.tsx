import {InputController} from "../index.ts";
import {Input} from "antd";

interface props {
	name: string
	type: "text" | "file" | "email" | "password"
	placeholder: string
	label: string
	icons?: JSX.Element
	setValue?: React.Dispatch<React.SetStateAction<string>>

}

const InputAuthen: React.FC<props> = ({setValue, name, type, placeholder, icons, label}) => {
	return <>
		<div className="mb-4">
			<label className="mb-2.5 block font-medium text-black">
				{label}
			</label>
			<InputController name={name} render={({field}) => <div className="relative">
				<Input
					onChange={(e) => setValue && setValue(e.target.value)}
					{...field}
					type={type}
					placeholder={placeholder}
					className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
				/>
				{!!icons && <span className="absolute right-4 top-4">{icons}</span>}
			</div>}/>
		</div>
	</>
}
export default InputAuthen