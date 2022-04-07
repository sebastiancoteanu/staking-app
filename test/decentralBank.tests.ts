import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { DecentralBankInstance, RwdInstance, TetherInstance } from '../types/truffle-contracts';

chai.use(chaiAsPromised).should();

const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');
const Rwd = artifacts.require('Rwd');

contract('decentralBank', (accounts) => {
    let tether: TetherInstance, rwd: RwdInstance, decentralBank: DecentralBankInstance;

    function tokensToEther(value: number) {
        return web3.utils.toWei(value.toString());
    }

    before(async () => {
        tether = await Tether.new();
        rwd = await Rwd.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        await rwd.transfer(decentralBank.address, tokensToEther(1000000));
        await tether.transfer(accounts[1], tokensToEther(100), { from: accounts[0] });
    });

    describe('Tether deployment', async () => {
        it('match name successfuly', async () => {
            let name = await tether.name();
            assert.equal(name, 'Tether');
        });
    });

    describe('Rwd deployment', async () => {
        it('match name successfuly', async () => {
            let name = await rwd.name();
            assert.equal(name, 'Reward Token');
        });
    });

    describe('Decentral Bank deployment', async () => {
        it('match name successfuly', async () => {
            let name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank');
        });

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance.toString(), tokensToEther(1000000));
        });
    });

    describe('Yield Farming', async () => {
        it('set staker balance', async () => {
            let result = await tether.balanceOf(accounts[1]);
            assert.equal(result.toString(), tokensToEther(100));
        });

        it('stake defined amount accordingly', async () => {
            let amountToStake = tokensToEther(10);
            let stakingAccount = accounts[1];

            await tether.approve(decentralBank.address, amountToStake, { from: stakingAccount });
            await decentralBank.stake(amountToStake, { from: stakingAccount });

            let currentStakedBalance = await decentralBank.stakingBalance(stakingAccount);
            let remainingBalance = await tether.balanceOf(stakingAccount);

            // staked balance is updated
            assert.equal(currentStakedBalance.toString(), amountToStake);
            
            // staked balance is subtracted from staking account
            assert.equal(remainingBalance.toString(), tokensToEther(90));
        });

        it('reject unauthorized rewarding', async () => {
            let owner = accounts[0];
            let depositingAccount = accounts[1];

            await decentralBank.issueStakingReward({ from: owner });
            await decentralBank.issueStakingReward({ from: depositingAccount }).should.be.rejected;
        });

        it('unstake tokens accordingly', async () => {
            let amountToStake = tokensToEther(10);
            let stakingAccount = accounts[1];

            await tether.approve(decentralBank.address, amountToStake, { from: stakingAccount });
            await decentralBank.stake(amountToStake, { from: stakingAccount });

            await decentralBank.unstakeTokens({ from: stakingAccount });

            let currentStakedBalance = await decentralBank.stakingBalance(stakingAccount);
            let currentBalance = await tether.balanceOf(stakingAccount);

            // staked balance is updated
            assert.equal(currentStakedBalance.toString(), '0');

            // staked balance is added to unstaking account
            assert.equal(currentBalance.toString(), tokensToEther(100));
        });
    });
});
