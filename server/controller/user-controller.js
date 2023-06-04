import { ethers } from "ethers";
import jwt from "jsonwebtoken";
import { Point, Users, sequelize } from "../orm/models.js";
import { upsert } from "../orm/utils.js";

const UserController = {
  async getMessage(params) {
    const { address } = params;
    try {
      return await sequelize.sync().then(async () => {
        const now = new Date(Date.now()).toString();
        const message = await upsert(
          Users,
          { address, secret: now },
          { address }
        ).then(() => {
          return `I want to login on Ahegao at ${now}. I accept the Ahegao Terms of Service`;
        });
        return message;
      });
    } catch (e) {
      console.log(e);
      throw e.message;
    }
  },
  async getJWTAddress(req) {
    try {
      if (!req.cookies.jwt) {
        throw "no user found";
      }
      const userModel = await Users.findOne({
        where: { token: req.cookies.jwt },
      });
      if (!userModel) {
        throw "no user found";
      }
      const user = userModel.toJSON();
      return user.address;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  async signIn(params) {
    const { address, signature } = params;
    try {
      const user = (
        await Users.findOne({ where: { address: address } })
      ).toJSON();
      const secret = user.secret;
      if (!secret) {
        throw "no secrect found";
      }
      const message = `I want to login on Ahegao at ${secret}. I accept the Ahegao Terms of Service`;
      const _address = ethers.verifyMessage(message, signature);

      if (address.toLowerCase() !== _address.toLowerCase()) {
        throw "signer is not matched";
      }

      const token = jwt.sign(address, secret);
      return await upsert(Users, { token: token }, { address: address }).then(
        () => {
          return token;
        }
      );
    } catch (e) {
      console.log(e);
      throw new { code: 500, message: e.message }();
    }
  },
  async getUserPoint(req) {
    const address = await this.getJWTAddress(req);
    const points = await Point.findAll({ where: { address } });
    let totalPoint = 0;
    points.map((point) => {
      totalPoint += Number(point.toJSON().amount);
    });
    return totalPoint;
  },
};

export default UserController;
