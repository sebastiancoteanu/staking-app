import React from 'react';
import { Spinner, Row } from 'react-bootstrap';
import './App.css';
import Navigation from './components/common/Navigation';
import Main from './components/main';
import useInitBlockChain from './hooks/useInitBlockChain';

const App = () => {
	const { isLoading, walletAddress, tetherBalance, rwdBalance, stakingBalance, decentralBank, tether } =
		useInitBlockChain();

	return (
		<div>
			<Navigation walletAddress={walletAddress} />
			{isLoading ? (
				<Row className="p-4 justify-content-center">
					<Spinner animation="grow" />
				</Row>
			) : (
				<Main
					tetherBalance={tetherBalance}
					rwdBalance={rwdBalance}
					stakingBalance={stakingBalance}
					decentralBank={decentralBank}
					walletAddress={walletAddress}
					tether={tether}
				/>
			)}
		</div>
	);
};

export default App;
