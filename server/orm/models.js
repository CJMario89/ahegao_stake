import Sequelize, { DataTypes } from "sequelize";

const sequelize = new Sequelize("ahegao", "mario", "mario", {
  host: "localhost",
  dialect: "mariadb",
});

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    paranoid: true,
    timestamps: true,
  }
);

const Staking = sequelize.define(
  "Staking",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tokenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stakingPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    paranoid: true,
    timestamps: true,
  }
);

const Point = sequelize.define(
  "Point",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    paranoid: true,
    timestamps: true,
  }
);

export { sequelize, Users, Staking, Point };
