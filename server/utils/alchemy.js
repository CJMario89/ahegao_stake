import { Network, Alchemy } from "alchemy-sdk";
import "dotenv/config";

const settings = {
  apiKey: process.env.alchemy_api_key,
  network: Network.ETH_MAINNET,
};
export const alchemy = new Alchemy(settings);
