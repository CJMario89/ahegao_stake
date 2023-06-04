import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "8GCBJ-V42zarJuCR6t7pCxrwi0GEWUAu",
  network: Network.MATIC_MUMBAI,
};
export const alchemy = new Alchemy(settings);
