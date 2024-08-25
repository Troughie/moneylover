import {useWallet} from "@/context/WalletContext.tsx";
import cn from "@/utils/cn";
import {convertMoney, NumberFormatter} from "@/utils/Format";
import {useWalletCurrency} from "@/hooks/currency.ts";
import React, {useEffect, useState} from "react";
import {walletProps} from "@/model/interface.ts";
import Check from "@/assets/icons/check.tsx";

interface props {
	chooseWallet: (wallet: walletProps) => void;
	walletCurrent?: walletProps
}

const FilterWallet: React.FC<props> = ({chooseWallet, walletCurrent}) => {
	const currency = useWalletCurrency();
	const {wallets} = useWallet();
	const [convertedBalances, setConvertedBalances] = useState<{
		[key: string]: number;
	}>({});

	useEffect(() => {
		const fetchConvertedBalances = async () => {
			const newConvertedBalances: { [key: string]: number } = {};
			for (const wallet of wallets) {
				newConvertedBalances[wallet.id] = await convertMoney(
					wallet.balance,
					wallet.currency,
					currency
				);
			}
			setConvertedBalances(newConvertedBalances);
		};

		fetchConvertedBalances();
	}, [wallets, currency]);
	return (
		<>
			<div
				className={` h-[calc(100%*2)] overflow-y-scroll rounded-lg w-[40%] p-4 shadow-3 z-10 absolute top-[90%] left-[20px] bg-white`}
			>
				{wallets.map((el) => (
					<div
						key={el.id}
						onClick={() => chooseWallet(el)}
						className={cn(`cursor-pointer border my-1 rounded-lg hover:bg-gray-400 hover:scale-110 duration-300 hover:border-b-bodydark2 hover:border-b-2 mx-10 flex-between gap-4 p-4`, {})}
					>
						<div className={`flex items-center gap-4`}>
							<span className={`font-bold text-2xl font-satoshi`}>{el.name}</span>
							{walletCurrent?.id === el?.id && <Check className={`bg-red-500 rounded-full p-2`}/>}
						</div>
						<span>
				  <NumberFormatter number={convertedBalances[el.id]}/>
            </span>
					</div>
				))}
			</div>
		</>
	);
};

export default FilterWallet;
