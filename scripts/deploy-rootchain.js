// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const Web3 = require('web3');
const web3 = new Web3();

async function main() {
  // Deploy the SCLP token
  console.log('deploying token')
  const ForwardToken = await hre.ethers.getContractFactory("ForwardRootToken");
  // const token = await ForwardToken.deploy();
  // await token.deployed();
  // console.log("token deployed to:", token.address);

  // set this accordingly
  const admin = '0x1a4e66888db428ecDA16b27D9342dC7d97681596';
  const minter = '0x1a4e66888db428ecDA16b27D9342dC7d97681596';

  // Deploy proxy contract
  const encodedFunctionSignature = web3.eth.abi.encodeFunctionCall({
    name: 'initialize',
    type: 'function',
    inputs: [{
      type: 'address',
      name: 'owner'
    }]
  }, [minter]
  );
  console.log('%c 🍮 encodedFunctionSignature: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', encodedFunctionSignature);

  console.log('deploying proxy')
  const ProxyContract = await hre.ethers.getContractFactory("ForwardProxy");
  // const proxy = await ProxyContract.deploy(
  //   token.address,
  //   admin,
  //   encodedFunctionSignature
  // );
  // await proxy.deployed();

  console.log('proxy at', proxy.address);

  // verify token contract
  await hre.run("verify:verify", {
    address: token.address,
    constructorArguments: [],
  });


  await hre.run("verify:verify", {
    address: proxy.address,
    contract: 'contracts/ForwardProxy.sol:ForwardProxy',
    constructorArguments: [
      token.address,
      admin,
      encodedFunctionSignature
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
