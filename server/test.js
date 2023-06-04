const {
  AlchemyProvider,
  Contract,
  ethers,
  JsonRpcProvider,
  Wallet,
} = require("ethers");

async function sign() {
  const provider = new JsonRpcProvider("https://eth.llamarpc.com");
  const signer = new Wallet(
    "f74df54c969ce257e9ad7cda88a1c0aaaef3c5b7c010786fbf5fa65277cce817",
    provider
  );
  const hash = await signer.signMessage("Hedcdscscy");
  console.log(hash);
  const text = ethers.verifyMessage("Hedcdscscy", hash);
  console.log(text);
}

sign();
