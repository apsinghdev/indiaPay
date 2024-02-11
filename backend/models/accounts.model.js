import mongoose from "mongoose";
import { number } from "zod";
const { Schema } = mongoose;

const accountsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
  balance: {
    type: Number,
    required: true,
  }
});

const Account = mongoose.model('Accounts', accountsSchema);

module.exports = Account;
