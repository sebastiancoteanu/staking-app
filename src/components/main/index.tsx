import React, { FC } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from 'web3-eth-contract';
import ActionForm from './ActionForm';

interface Props {
	tetherBalance: string;
	rwdBalance: string;
	stakingBalance: string;
	decentralBank: Contract | null;
	walletAddress: string;
	tether: Contract | null;
}

const Main: FC<Props> = ({ tetherBalance, rwdBalance, stakingBalance, decentralBank, walletAddress, tether }) => (
	<Container>
		<Row className="justify-content-center my-4">
			<Col lg="8">
				<Table className="text-center">
					<thead>
						<tr>
							<th>Staking Balance</th>
							<th>Reward Balance</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{stakingBalance} TETHER</td>
							<td>{rwdBalance} RWD</td>
						</tr>
					</tbody>
				</Table>
			</Col>
		</Row>
		{decentralBank && tether && (
			<ActionForm
				tetherBalance={tetherBalance}
				decentralBank={decentralBank}
				walletAddress={walletAddress}
				tether={tether}
			/>
		)}
	</Container>
);

export default Main;
