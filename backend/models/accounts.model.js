import mongoose from "mongoose";
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

export default Account;
