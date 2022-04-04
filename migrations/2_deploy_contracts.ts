const Tether = artifacts.require('Tether');
export default async function deployContracts(deployer: Truffle.Deployer) {
    await deployer.deploy(Tether);
}