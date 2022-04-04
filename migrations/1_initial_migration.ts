const Migrations = artifacts.require("Migrations");

export default function (deployer: Truffle.Deployer) {
  deployer.deploy(Migrations);
};
