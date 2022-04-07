module.exports = async (
    deployer,
    network,
    accounts
) => {
    const Tether = artifacts.require('Tether');
    const DecentralBank = artifacts.require('DecentralBank');
    const Rwd = artifacts.require('Rwd');

    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    await deployer.deploy(Rwd);
    const rwd = await Rwd.deployed();

    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();
    
    // Transfer all reward tokens to bank
    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    // Distribute 100 tokens to investor
    await tether.transfer(accounts[1], '100000000000000000000')
};