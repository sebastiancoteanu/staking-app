import React from 'react';
import './App.css';
import Navigation from './components/common/Navigation';
import useInitBlockChain from './hooks/useInitBlockChain';

const App = () => {
	const { isLoading, walletAddress, tetherBalance, rwdBalance, stakingBalance } = useInitBlockChain();

	return (
		<div>
			<Navigation walletAddress={walletAddress} />
			<p>Tether Balance: {tetherBalance}</p>
			<p>Rwd Balance: {rwdBalance}</p>
			<p>Staking Balance: {stakingBalance}</p>
			<p>Is loading: {isLoading.toString()}</p>
		</div>
	);
};

export default App;
