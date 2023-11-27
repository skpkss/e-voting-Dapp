const hre = require("hardhat");

async function main() {
  const VotingContract = await hre.ethers.getContractFactory("VotingContract");
  const contract = await VotingContract.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});