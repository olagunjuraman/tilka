import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  category: {
    type: String,
    enum: ["transfer", "withdraw"],
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
