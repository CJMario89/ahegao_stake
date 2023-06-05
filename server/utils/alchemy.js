import { Network, Alchemy } from "alchemy-sdk";
import "dotenv/config";

const settings = {
  apiKey: process.env.alchemy_api_key,
  network: Network.MATIC_MUMBAI,
};
export const alchemy = new Alchemy(settings);
