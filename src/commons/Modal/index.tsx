import {Modal} from "antd";

interface props {
	isModalOpen: boolean,
	handleOk?: () => void,
	handleCancel: () => void,
	children: React.ReactNode
	title: string
}

const ModalPopUp: React.FC<props> = ({isModalOpen, handleCancel, handleOk, children, title}) => {
	return <>
		<Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
			{children}
		</Modal>
	</>
}

export default ModalPopUp