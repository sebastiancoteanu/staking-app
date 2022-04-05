pragma solidity ^0.8.0;

import './Rwd.sol';
import './Tether.sol';

contract DecentralBank {
	address public owner;
	string public name = 'Decentral Bank';
	Tether public tether;
	Rwd public rwd;

	constructor(Rwd _rwd, Tether _tether) {
		rwd = _rwd;
		tether = _tether;
	}
}
