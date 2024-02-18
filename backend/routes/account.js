import express from "express";
import Account from "../models/accounts.model.js";
import authMiddleware from "../middleware.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, showBalance);
router.get("/transfer", authMiddleware, transferBalance);

// function that gets the balance of an user

async function showBalance(req, res) {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({ balance: account.balance });
  } catch (error) {
    res.status(403).json({ error: error });
  }
}

async function transferBalance(req, res) {
  const { to, amount } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderAc = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!senderAc || req.amount > senderAc.balance) {
      await session.abortTransaction();
      res.status(403).json({ message: "insufficient balance" });
    }

    const receiverAc = await Account.findOne({ userId: to }).session(session);

    if (!receiverAc) {
      await session.abortTransaction();
      res.status(403).json({ message: "Receiver account not found" });
    }

    // make the transaction

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.status(200).json("transaction successful!");

  } catch (error) {
    await session.abortTransaction();
    res.status(403).json({ error: error.message });
  } 
  
  finally {
    session.endSession();
  }
}

export default router;
