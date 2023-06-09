import { Staking, Users, sequelize } from "../orm/models.js";
import { upsert } from "../orm/utils.js";
import { alchemy } from "../utils/alchemy.js";
import { erc721Address } from "../utils/constants.js";
import { stakingContract } from "./staking-controller.js";
import UserController from "./user-controller.js";

export async function getAlchemyNFTs(address) {
  let allNFTs = [];
  const nfts = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [erc721Address],
  });
  allNFTs = nfts.ownedNfts;
  let reqCount = parseInt(nfts.totalCount / 101);
  let pageKey = nfts.pageKey;
  while (reqCount > 0) {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: [erc721Address],
      pageKey: pageKey,
    });
    pageKey = nfts.pageKey;
    allNFTs = [...allNFTs, ...nfts.ownedNfts];
    reqCount--;
  }
  return allNFTs;
}

export async function getStakeAlchemyNFTs(allStake) {
  let reqCount = parseInt(allStake.length / 101) + 1;
  let start = 0;
  let end = allStake.length > 100 ? 100 : allStake.length;
  let stakes = [];
  while (reqCount > 0) {
    const nfts = await alchemy.nft.getNftMetadataBatch(
      allStake
        .filter((stake, i) => i >= start && i < end)
        .map((tokenId) => {
          return {
            contractAddress: erc721Address,
            tokenId: Number(tokenId),
            tokenType: "ERC721",
          };
        })
    );
    start += 100;
    end += 100;
    end = allStake.length > end ? end : allStake.length;
    stakes = [...stakes, ...nfts];
    console.log(stakes);
    reqCount--;
  }
  return stakes;
}

const NftController = {
  async getAllNFT(req) {
    const address = await UserController.getJWTAddress(req);
    const owned = await getAlchemyNFTs(address);
    const allStake = await stakingContract.getAllStakes(address);
    if (allStake.length === 0) {
      return owned;
    }

    const stakes = await getStakeAlchemyNFTs(allStake);
    const unsortedAllNFT = [...owned, ...stakes];
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
