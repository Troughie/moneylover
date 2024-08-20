import {FloatButton} from "antd";
import {BiMessageRounded} from "react-icons/bi";

interface props {
	onClick: () => void
}

const FloatButtonAction = ({onClick}: props) => {
	return <>
		<FloatButton
			type="primary"
			style={{insetInlineEnd: 24}}
			icon={<BiMessageRounded/>}
			onClick={onClick}
		>
		</FloatButton>

	</>
}

export default FloatButtonAction