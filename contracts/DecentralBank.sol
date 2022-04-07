pragma solidity ^0.8.0;

import './Rwd.sol';
import './Tether.sol';

contract DecentralBank {
	address public owner;
	string public name = 'Decentral Bank';
	Tether public tether;
	Rwd public rwd;
	address[] public stakers;

	mapping(address => uint) public stakingBalance;
	mapping(address => bool) public hasStaked;
	mapping(address => bool) public isStaking;

	constructor(Rwd _rwd, Tether _tether) {
		rwd = _rwd;
		tether = _tether;
		owner = msg.sender;
	}

	function stake(uint _amount) public {
		require(_amount > 0, 'Amount cannot be lower than or equal to 0');

		tether.transferFrom(msg.sender, address(this), _amount);
		stakingBalance[msg.sender] += _amount;

		if (!hasStaked[msg.sender]) {
			stakers.push(msg.sender);
		}

		isStaking[msg.sender] = true;
		hasStaked[msg.sender] = true;
	}

	function unstakeTokens() public {
		uint stakedBalance = stakingBalance[msg.sender];

		require(stakedBalance > 0, 'Staked balance should be greater than 0');

        tether.transfer(msg.sender, stakedBalance);
		stakingBalance[msg.sender] = 0;
		isStaking[msg.sender] = false;
	}

	function issueStakingReward() public {
		require(owner == msg.sender, 'The caller must be the owner');

		for (uint i = 0; i < stakers.length; i++) {
			address rewardedAccount = stakers[i];
			uint stakedBalance = stakingBalance[rewardedAccount];

			if (stakedBalance > 0) {
				rwd.transfer(rewardedAccount, stakedBalance / 10);
			}
		}
	}
}
