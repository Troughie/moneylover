import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import cn from "../../utils/cn";
import {transaction} from "../../pages/user/model";

interface props {
	isLoading: boolean
	data: transaction[]
}

const FormTransaction: React.FC<props> = ({isLoading, data}) => {
	return <>
		<div className={`mt-10 px-4 md:px-20 font-satoshi `}>
			<div className={`grid pb-5 grid-cols-12 border-b-bodydark2 border-b text-center`}>
				<div className={`col-span-1 text-sm text-bodydark2`}>Id</div>
				<div className={`col-span-2 text-sm text-bodydark2`}>Wallet</div>
				<div className={`col-span-2 text-sm text-bodydark2`}>Amount</div>
				<div className={`col-span-2 text-sm text-bodydark2`}>Date</div>
				<div className={`col-span-1 text-sm text-bodydark2`}>Category</div>
				<div className={`col-span-4 text-sm text-bodydark2`}>Note</div>
			</div>
			{isLoading ? <Spin className={`flex justify-center mt-5`} indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/> :
				<>
					{data?.map((el, i) => (
						<div key={el.id}
							 className={cn(`grid mt-2 grid-cols-12 hover:scale-110 hover:font-semibold text-center duration-500 cursor-pointer py-4`, {"bg-blue-50": i % 2 === 0})}>
							<div className={`col-span-1 text-sm text-bodydark2`}>{el.id}</div>
							<div className={`col-span-2 text-sm text-bodydark2`}>{el.wallet}</div>
							<div className={`col-span-2 text-sm text-bodydark2`}>{el.amount}</div>
							<div className={`col-span-2 text-sm text-bodydark2`}>{el.date}</div>
							<div className={`col-span-1 text-sm text-bodydark2`}>{el.category}</div>
							<div className={`col-span-4 text-sm text-bodydark2`}>{el.note}</div>
						</div>
					))}
				</>}
		</div>
	</>
}

export default FormTransaction