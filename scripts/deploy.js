const { Contract } = require("ethers");
const hre = require("hardhat");
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consolevoters(voters) {
  for (const voter of voters) {
    const timestamp = voter.timestamp;
    const name = voter.name;
    const voterID = voter.voterID;
    const partyName = voter.partyName;
    console.log(
      `At ${timestamp},name ${name},voterID ${voterID},partyName ${partyName}`
    );
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const VotingContract = await hre.ethers.getContractFactory("VotingContract");
  const contract = await VotingContract.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before casting vote");
  await cosoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") };
  await contract.connect(from1).registerVoter("saurabh", "123456789101","bjp",amount);
  await contract.connect(from2).registerVoter("kaplas", "123456789102","congress", amount);
  await contract.connect(from3).registerVoter("kumar", "123456789103","aap", amount);

  console.log("After casting vote");
  await cosoleBalances(addresses);

  const voters = await contract.getVoters();
  consolevoters(voters);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});