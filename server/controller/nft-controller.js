import { Staking, Users, sequelize } from "../orm/models.js";
import { upsert } from "../orm/utils.js";
import { alchemy } from "../utils/alchemy.js";
import { erc721Address } from "../utils/constants.js";
import { stakingContract } from "./staking-controller.js";
import UserController from "./user-controller.js";

const NftController = {
  async getAllNFT(req) {
    const address = await UserController.getJWTAddress(req);
    const owned = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: [erc721Address],
    });
    const allStake = await stakingContract.getAllStakes(address);
    if (allStake.length === 0) {
      return owned?.ownedNfts;
    }

    const stakes = await alchemy.nft.getNftMetadataBatch(
      allStake.map((tokenId) => {
        return {
          contractAddress: erc721Address,
          tokenId: Number(tokenId),
          tokenType: "ERC721",
        };
      })
    );
    const unsortedAllNFT = [...owned?.ownedNfts, ...stakes];
    const allNFT = unsortedAllNFT.sort((a, b) => {
      return Number(a.tokenId) - Number(b.tokenId);
    });
    const hasStaked = await Staking.findAll({ where: { address } });
    if (hasStaked.length === 0) {
      return allNFT;
    }
    const removedAllNFT = allNFT.filter((nft) => {
      return hasStaked.every((stake) => {
        return stake.toJSON().tokenId.toString() !== nft.tokenId.toString();
      });
    });
    return removedAllNFT;
  },
};

export default NftController;
