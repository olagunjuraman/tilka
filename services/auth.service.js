import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { startSession } from "mongoose";

import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";

import { badRequestError } from "../middlewares/error.middleware.js";
import redisClient from "../config/redis.js";
import config from "../config/config.js";

export const signUp = async (input) => {
  const { firstName, lastName, email, password } = input;
  const session = await startSession();
  session.startTransaction();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw badRequestError("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await user.save();

  const newWallet = new Wallet({ userId: user._id, balance: 500 });
  await newWallet.save({ session });

  await session.commitTransaction();
  session.endSession();

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

export const logIn = async (input) => {
  const { email, password } = input;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw badRequestError("Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw badRequestError("Invalid email or password");
  }

  const { id, role } = user;

  const token = jwt.sign({ userId: id, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  const refreshToken = jwt.sign({ userId: id }, config.refreshToken.secret, {
    expiresIn: config.refreshToken.expiresIn,
  });

  await redisClient.set(
    `auth:${id}`,
    refreshToken,
    "EX",
    parseInt(config.refreshToken.expiresIn)
  );

  const userObject = user.toObject();
  delete userObject.password;

  return {
    user: userObject,
    token,
    refreshToken,
  };
};

export const refreshAccessToken = async (input) => {
  let userId;
  try {
    const payload = jwt.verify(input.refreshToken, config.refreshToken.secret);
    userId = payload.userId;
  } catch (error) {
    throw badRequestError("Invalid refresh token");
  }

  const existingRefreshToken = await redisClient.get(`auth:${userId}`);
  if (!existingRefreshToken || existingRefreshToken !== input.refreshToken) {
    throw badRequestError("Invalid refresh token");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw badRequestError("User not found");
  }

  const newToken = jwt.sign(
    { userId: user.id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  return {
    user,
    token: newToken,
  };
};

export default {
  signUp,
  logIn,
  refreshAccessToken,
};
