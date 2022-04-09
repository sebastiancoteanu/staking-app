import React, { FC } from 'react';
import { Navbar, Container } from 'react-bootstrap';

interface Props {
	walletAddress: string;
}

const Header: FC<Props> = ({ walletAddress }) => (
	<Navbar expand="lg" className="px-3">
		<Container fluid>
			<Navbar.Brand href="/">Staking Dapp</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
				<Navbar.Text>Wallet: {walletAddress}</Navbar.Text>
			</Navbar.Collapse>
		</Container>
	</Navbar>
);

export default Header;
