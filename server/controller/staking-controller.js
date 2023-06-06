import { ethers } from "ethers";
import { staking_abi } from "../constant/staking_abi.js";
import { sequelize, Users, Staking, Point } from "../orm/models.js";
import UserController from "./user-controller.js";
import { alchemy } from "../utils/alchemy.js";
import { erc721Address, stakeAddress } from "../utils/constants.js";
import { caculatePoint } from "../utils/caculatePoint.js";

const provider = new ethers.JsonRpcProvider(
  "https://endpoints.omniatech.io/v1/matic/mumbai/public"
);
export const stakingContract = new ethers.Contract(
  stakeAddress,
  staking_abi,
  provider
);

const StakingController = {
  async stake(req) {
    const { tokenId } = req.body;
    try {
      const address = await UserController.getJWTAddress(req);

      const stakingLength = (await Staking.findAll({ where: { tokenId } }))
        .length;
      const isRecording = stakingLength > 0;
      if (isRecording) {
        throw "has staked NFT";
      }

      const stake = await stakingContract.getStake(address, tokenId);
      const isStaking = stake[0];
      const startTime = Number(stake[1]) * 1000;
      const endTime = Number(stake[2]) * 1000;
      const month = Number(stake[3]);
      if (!isStaking) {
        throw "no staking NFT";
      }
      const nft = await alchemy.nft.getNftMetadata(erc721Address, tokenId);
      const attributes = nft.rawMetadata.attributes;
      if (!Array.isArray(attributes)) {
        throw "no staking NFT";
      }
      let level = 1;
      attributes.forEach((attribute) => {
        if (attribute.trait_type === "Font") {
          level = 2;
        }
        if (attribute.trait_type === "Special Edition") {
          level = 3;
        }
      });

      const point = caculatePoint(month, level);

      await Staking.create({
        tokenId,
        address,
        startTime,
        endTime,
        month,
        stakingPoint: point,
      });
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async getAllStake(req) {
    const address = await UserController.getJWTAddress(req);
    const stakings = await Staking.findAll({ where: { address } });
    return stakings;
  },
  async getTotalStake() {
    const stakings = await Staking.findAll();
    return stakings.length;
  },
  async getStakeReward(req) {
    const { tokenId } = req.body;
    console.log(tokenId);
    const address = await UserController.getJWTAddress(req);
    const stake = (await Staking.findOne({ where: { tokenId } })).toJSON();
    console.log(stake);
    if (!stake) {
      throw "No staking exist";
    }
    const isReady = Date.now() > Date.parse(stake.endTime);
    console.log(isReady);
    if (!isReady) {
      throw "Staking is not ready";
    }
    await Point.create({
      address,
      amount: stake.stakingPoint,
    });
    await Staking.destroy({
      where: {
        tokenId,
      },
    });
    console.log(stake.stakingPoint);
    return stake.stakingPoint;
  },
};

export default StakingController;
