// migrations/1_deploy_core.js
const ChatCore = artifacts.require("ChatCore");

module.exports = async (deployer) => {
  await deployer.deploy(ChatCore);
  console.log("Contract address:", ChatCore.address);
};