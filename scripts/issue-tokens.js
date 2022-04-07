const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(cb) {
    let decentralBank = await DecentralBank.deployed();
    await decentralBank.issueStakingReward();
    console.log('Tokens have been successfully issued');

    cb();
}