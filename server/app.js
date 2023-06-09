import express from "express";
import StakingController from "./controller/staking-controller.js";
import UserController from "./controller/user-controller.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import NftController from "./controller/nft-controller.js";
const app = express();
app.use(cookieParser());

// define routes here..

const allowedOrigins = [
  // "http://localhost:3000",
  // "http://13.115.250.186",
  "https://ahegao.love",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

app.get("/", async function (req, res) {
  try {
    await StakingController.staking(params);
    return res.status(200).send({ response: "response 1" });
  } catch (e) {
    return res.send(500, { response: e });
  }
});

app.post("/getMessage", async function (req, res) {
  try {
    const message = await UserController.getMessage(req.body);
    return res.status(200).send({ message });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

app.get("/getJWTAddress", async function (req, res) {
  try {
    const address = await UserController.getJWTAddress(req);
    return res.status(200).send({ address });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

app.post("/sign-in", async function (req, res) {
  try {
    const token = await UserController.signIn(req.body);
    return res
      .cookie("jwt", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: false,
      })
      .send({ token });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

app.post("/stake", async function (req, res) {
  try {
    const message = await StakingController.stake(req);
    return res.status(200).send({ message });
  } catch (e) {
    return res.status(500).send({ err: e });
  }
});

app.get("/getTotalStake", async function (req, res) {
  try {
    const num = await StakingController.getTotalStake();
    return res.status(200).send({ num });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

app.get("/getAllStake", async function (req, res) {
  try {
    const allStake = await StakingController.getAllStake(req);
    return res.status(200).send({ allStake });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

app.get("/getAllNFT", async function (req, res) {
  try {
    const nfts = await NftController.getAllNFT(req);
    return res.status(200).send({ nfts });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

app.post("/getStakeReward", async function (req, res) {
  try {
    const isSuccess = await StakingController.getStakeReward(req);
    return res.status(200).send({ isSuccess });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

app.get("/getUserPoint", async function (req, res) {
  try {
    const point = await UserController.getUserPoint(req);
    return res.status(200).send({ point });
  } catch (e) {
    return res.status(500).send({ response: e });
  }
});

var server = app.listen(5050, function () {
  console.log("Node server is running..");
});
