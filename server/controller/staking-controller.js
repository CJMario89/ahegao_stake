import { ethers } from "ethers";
import { staking_abi } from "../constant/staking_abi.js";
import { sequelize, Users, Staking, Point } from "../orm/models.js";
import UserController from "./user-controller.js";
import { alchemy } from "../utils/alchemy.js";
import { erc721Address, stakeAddress } from "../utils/constants.js";
import { caculatePoint } from "../utils/caculatePoint.js";

const provider = new ethers.JsonRpcProvider(
  "https://eth-rpc.gateway.pokt.network"
);
export const stakingContract = new ethers.Contract(
  stakeAddress,
  staking_abi,
  provider
);

const StakingController = {
  async stake(req) {
    const { tokenIds } = req.body;
    try {
      const address = await UserController.getJWTAddress(req);

      const stakingLength = (
        await Staking.findAll({ where: { tokenId: tokenIds } })
      ).length;
      const isRecording = stakingLength > 0;
      if (isRecording) {
        throw "has staked NFT";
      }
      const _tokenIds = tokenIds.map((tokenId) => {
        return Number(tokenId);
      });
      console.log(_tokenIds);
      const stakes = await stakingContract.getStakes(address, _tokenIds);
      const nfts = await alchemy.nft.getNftMetadataBatch(
        _tokenIds.map((tokenId) => {
          return {
            contractAddress: erc721Address,
            tokenId,
            tokenType: "ERC721",
          };
        })
      );

      const stakings = tokenIds.map((tokenId, i) => {
        const stake = stakes[i];
        const nft = nfts[i];
        const isStaking = stake[0];
        const startTime = Number(stake[1]) * 1000;
        const endTime = Number(stake[2]) * 1000;
        const month = Number(stake[3]);
        if (!isStaking) {
          throw "no staking NFT";
        }
        const attributes = nft.rawMetadata.attributes;
        if (!Array.isArray(attributes)) {
          throw "no staking NFT";
        }
        let level = 1;
        attributes.forEach((attribute) => {
          if (attribute.trait_type === "Font") {
            if (attribute.value !== "Empty") {
              level = 2;
            }
          }
          if (attribute.trait_type === "Special Edition") {
            level = 3;
          }
        });

        const point = caculatePoint(month, level);
        return {
          tokenId,
          address,
          startTime,
          endTime,
          month,
          stakingPoint: point,
        };
      });

      await Staking.bulkCreate(stakings);
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async getAllStake(req) {
    const address = await UserController.getJWTAddress(req);
    const _stakings = await Staking.findAll({ where: { address } });
    if (_stakings.length === 0) {
      return [];
    }
    const tokenIds = _stakings.map((stake) => {
      return stake.tokenId;
    });

    const nfts = await alchemy.nft.getNftMetadataBatch(
      tokenIds.map((tokenId) => {
        return {
          contractAddress: erc721Address,
          tokenId,
          tokenType: "ERC721",
        };
      })
    );
    const stakings = _stakings.map((stake, i) => {
      return { ...stake.toJSON(), ...nfts[i] };
    });

    return stakings;
  },
  async getTotalStake() {
    const stakings = await Staking.findAll();
    return stakings.length;
  },
  async getStakeReward(req) {
    const { tokenIds } = req.body;
    console.log(tokenIds);
    const address = await UserController.getJWTAddress(req);
    const stakes = await Staking.findAll({ where: { tokenId: tokenIds } });
    console.log(stakes);
    if (stakes.length === 0) {
      throw "No staking exist";
    }
    const points = stakes.map((stake) => {
      const isReady = Date.now() > Date.parse(stake.endTime);
      console.log(isReady);
      if (!isReady) {
        throw "Staking is not ready";
      }
      return {
        address,
        amount: stake.stakingPoint,
      };
    });

    await Point.bulkCreate(points);
    await Staking.destroy({
      where: {
        tokenId: tokenIds,
      },
    });
    return true;
  },
};

export default StakingController;
