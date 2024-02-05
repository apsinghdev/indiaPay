import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25,
  },
});

const User = userSchema.model("User", userSchema);

export default User;
