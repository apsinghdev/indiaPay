import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.DB_URI;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
export default async function connectDB() {
  try {
    await mongoose.connect(URI, clientOptions);
    console.log("database connected successfully");
  } catch (error) {
    console.log("Error connecting to database", error.message);
    process.exit(1);
  }
}
