import bcrypt from "bcrypt";

import { badRequestError } from "../middlewares/error.middleware.js";

import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import Transaction from "../models/transaction.model.js";

import { startSession } from "mongoose";

export const transfer = async (userId, input) => {
  const { transactionPin, accountNumber, amount } = input;
  const session = await startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).select("+pin");

    // Check if the PIN matches the stored hashed PIN
    const isPinValid = await bcrypt.compare(transactionPin, user.pin);
    if (!isPinValid) {
      throw badRequestError("Invalid PIN");
    }

    const wallet = await Wallet.findOne({ userId });
    if (wallet.balance < amount) {
      throw badRequestError("Insufficient account balance");
    }

    // Mock API call to Paystack
    const paystackResponse = mockPaystackAPI(amount, accountNumber);
    // Assuming this function mimics a successful Paystack transaction

    if (!paystackResponse.success) {
      throw badRequestError("Transaction failed on Paystack");
    }

    const transaction = new Transaction({
      userId,
      type: "debit",
      category: "transfer",
      amount,
      status: "completed",
    });
    await transaction.save({ session });

    wallet.balance -= amount;
    await wallet.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: "Transfer successful" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return { success: false, message: error.message };
  }
};

export const setTransactionPin = async (userId, input) => {
  const { pin, verifyPin } = input;

  if (pin !== verifyPin) {
    throw badRequestError("PINs do not match");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw badRequestError("User not found");
  }

  const hashedPin = await bcrypt.hash(pin, 10);

  user.pin = hashedPin;
  await user.save();

  return { success: true, message: "Pin set successfully" };
};

export const fetchUsers = async () => {
  try {
    const users = await User.find();
    return { success: true, data: users };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const mockPaystackAPI = (amount, recipient) => {
  // This is just a dummy function to mimic a successful transaction.
  return { success: true };
};

export default {
  setTransactionPin,
  transfer,
  fetchUsers
};
