import hre from "hardhat";

async function main() {
  const Certificate = await hre.ethers.getContractFactory("CertificateVerification");
  const cert = await Certificate.deploy();
  await cert.waitForDeployment();
  console.log("Contract deployed at:", await cert.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});