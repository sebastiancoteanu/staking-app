import React, { FC, KeyboardEvent, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { DecentralBankInstance, TetherInstance } from '../../../types/truffle-contracts';

interface Props {
	tetherBalance: string;
	decentralBank: Contract;
	walletAddress: string;
	tether: Contract;
}

const ActionForm: FC<Props> = ({ tetherBalance, decentralBank, walletAddress, tether }) => {
	const [isStaking, setIsStaking] = useState(false);
	const [isUnstaking, setIsUnstaking] = useState(false);

	const input = useRef<HTMLInputElement>(null);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const stakeTokens = async () => {
		const amountToStake = input.current?.value;

		if (typeof amountToStake === 'undefined' || amountToStake.length === 0) {
			return;
		}

		const amountInWei = Web3.utils.toWei(amountToStake, 'ether');

		setIsStaking(true);

		// eslint-disable-next-line no-underscore-dangle
		const decentralBankAddress: string = (decentralBank as any)._address;

		await ((tether.methods as TetherInstance['methods']).approve(decentralBankAddress, amountInWei) as any)
			.send({ from: walletAddress })
			.on('transactionHash', () => {
				((decentralBank.methods as DecentralBankInstance['methods']).stake(amountInWei) as any)
					.send({ from: walletAddress })
					.on('transactionHash', () => {
						setIsStaking(false);
						// eslint-disable-next-line
						(input.current as any).value = '';
					});
			});
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const unstakeTokens = async () => {
		setIsUnstaking(true);

		await ((decentralBank.methods as DecentralBankInstance['methods']).unstakeTokens() as any)
			.send({ from: walletAddress })
			.on('transactionHash', () => {
				setIsUnstaking(false);
			});
	};

	const preventDefaultSubmit = (e: KeyboardEvent<HTMLFormElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	const actionIsDisabled = isStaking || isUnstaking;

	return (
		<Row className="justify-content-center my-4">
			<Col lg="8">
				<Form onKeyDown={preventDefaultSubmit}>
					<Form.Group className="mb-3" controlId="stakedTokens">
						<Form.Label className="w-100">
							<Row>
								<Col className="d-flex">Stake Tokens</Col>
								<Col className="d-flex justify-content-end">Your Balance: {tetherBalance}</Col>
							</Row>
						</Form.Label>
						<Form.Control type="number" placeholder="Enter amount" ref={input} />
						<Form.Text className="text-muted">Please check the amount before submitting</Form.Text>
					</Form.Group>
					<Row className="g-2 mt-4">
						<Col>
							<Button
								variant="primary"
								type="button"
								className="w-100"
								onClick={stakeTokens}
								disabled={actionIsDisabled}
							>
								{isStaking ? <Spinner animation="border" size="sm" /> : `Deposit`}
							</Button>
						</Col>
						<Col>
							<Button
								variant="outline-primary"
								type="button"
								className="w-100"
								onClick={unstakeTokens}
								disabled={actionIsDisabled}
							>
								{isUnstaking ? <Spinner animation="border" size="sm" /> : `Withdraw`}
							</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default ActionForm;
