import { useEffect, useState } from 'react';
import Web3 from 'web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from 'web3-eth-contract';

import Tether from '../../build/contracts/Tether.json';
import Rwd from '../../build/contracts/Rwd.json';
import DecentralBank from '../../build/contracts/DecentralBank.json';
import { TetherInstance, RwdInstance, DecentralBankInstance } from '../../types/truffle-contracts';

// eslint-disable-next-line no-var
declare var window: any;

interface ReturnData {
	isLoading: boolean;
	walletAddress: string;
	tether: Contract | null;
	rwd: Contract | null;
	decentralBank: Contract | null;
	tetherBalance: string;
	rwdBalance: string;
	stakingBalance: string;
}

const useInitBlockChain = (): ReturnData => {
	const [isLoading, setIsLoading] = useState(false);
	const [walletAddress, setWalletAddress] = useState('');
	const [tether, setTether] = useState<Contract | null>(null);
	const [rwd, setRwd] = useState<Contract | null>(null);
	const [decentralBank, setDecentralBank] = useState<Contract | null>(null);
	const [tetherBalance, setTetherBalance] = useState('0');
	const [rwdBalance, setRwdBalance] = useState('0');
	const [stakingBalance, setStakingBalance] = useState('0');

	const detectCurrentProvider = async () => {
		let provider;

		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			// eslint-disable-next-line
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
		}
		return provider;
	};

	const loadTether = async (networkId: number, account: string) => {
		const tetherData = Tether.networks[String(networkId) as keyof typeof Tether.networks];

		if (tetherData) {
			const tetherContract = new web3.eth.Contract(Tether.abi as AbiItem[], tetherData.address);
			const balance: BN = await (
				(tetherContract.methods as TetherInstance['methods']).balanceOf(account) as any
			).call();

			setTether(tetherContract);
			setTetherBalance(web3.utils.fromWei(balance));
		} else {
			alert('Tether contract not deployed - no detected network');
		}
	};

	const loadRwd = async (networkId: number, account: string) => {
		const rwdData = Rwd.networks[String(networkId) as keyof typeof Rwd.networks];

		if (rwdData) {
			const rwdContract = new web3.eth.Contract(Rwd.abi as AbiItem[], rwdData.address);
			const balance: BN = await ((rwdContract.methods as RwdInstance['methods']).balanceOf(account) as any).call();

			setRwd(rwdContract);
			setRwdBalance(web3.utils.fromWei(balance));
		} else {
			alert('Rwd contract not deployed - no detected network');
		}
	};

	const loadDecentralBank = async (networkId: number, account: string) => {
		const decentralBankData = DecentralBank.networks[String(networkId) as keyof typeof DecentralBank.networks];
		if (decentralBankData) {
			const decentralBankContract = new web3.eth.Contract(DecentralBank.abi as AbiItem[], decentralBankData.address);
			const balance: BN = await (
				(decentralBankContract.methods as DecentralBankInstance['methods']).stakingBalance(account) as any
			).call();

			setDecentralBank(decentralBankContract);
			setStakingBalance(web3.utils.fromWei(balance));
		} else {
			alert('DecentralBank contract not deployed - no detected network');
		}
	};

	const loadBlockChainData = async () => {
		const { web3 }: { web3: Web3 } = window;

		setIsLoading(true);

		try {
			const [account] = await web3.eth.getAccounts();
			const networkId = await web3.eth.net.getId();

			setWalletAddress(account);

			await loadTether(networkId, account);
			await loadRwd(networkId, account);
			await loadDecentralBank(networkId, account);
		} catch (e) {
			console.log('Error occured: ', e);
		} finally {
			setIsLoading(false);
		}
	};

	const initBlockChain = async () => {
		await detectCurrentProvider();
		await loadBlockChainData();
	};

	useEffect(() => {
		initBlockChain();
	}, []);

	return {
		isLoading,
		walletAddress,
		tether,
		rwd,
		decentralBank,
		tetherBalance,
		rwdBalance,
		stakingBalance,
	};
};

export default useInitBlockChain;
