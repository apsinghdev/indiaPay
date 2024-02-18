import express from "express";
import z from "zod";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import JWT_SECRET from "../config.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware.js";
import Account from "../models/accounts.model.js";

const userRouter = express.Router();

const userData = z.object({
  username: z.string().email(),
  password: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// create signup functionality

const signup = async (req, res) => {
  const result = userData.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json("Incorrect inputs! Try again.");
  }

  const { username, password, firstName, lastName } = req.body;

  // check if a user already exists in the database

  const data = await User.findOne({ username: username });

  if(data){
    return res.status(409).json({ error: "user already exists. please signin" })
  }

  // hash the password

  const hashedPassword = await bcryptjs.hash(password, 10);

  // now store the data with hashed password in the database.
  // first create a new instance of model

  const newUser = new User({
    username: username,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });


  // save the data in db

  try {
    const user = await newUser.save();
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    // as i am already rich, so i'll give some money to the new user

    await Account.create({
      userId: userId,
      balance: Math.floor(1 + Math.random() * 10000),
    });

    return res
      .status(201)
      .json({ message: "user created successfully", token: token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// create signin functionality

// create zod object for input validation

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

const signin = async (req, res) => {
  const result = signinBody.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({ message: "incorrect inputs" });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (user) {
    const userPassword = user.password;
    const passwordFound = await bcryptjs.compare(password, userPassword);

    if (!passwordFound) {
      return res.status(401).json("wrong credentials");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.status(200).json({ token: token });
  } else {
    return res.status(401).json("user not found");
  }
};

// zod schema to update credentials

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

//  function to update the credentials of the user

async function update(req, res) {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(403).json({ message: "invalid credentials" });
  }

  try {
    // if its the password that needs to be updated, hash it first
    if(req.body.hasOwnProperty('password')){
      const { password } = req.body;
      const hashedPassword = await bcryptjs.hash(password, 10);
      req.body.password = hashedPassword;
    }
      await User.updateOne({ _id: req.userId }, req.body);
      return res
        .status(200)
        .json({ message: "credentials updated successfully" });
    
  } catch (error) {
    return res.status(403).json({ error: error.errors });
  }
}

// get all the users based on the filter input

async function getBulk(req, res) {
  try {

    const filterWord = req.query.filter || "";
    const users = await User.find({

      $or: [

        { firstName: { $regex: filterWord, $options: "i" } },
        { secondName: { $regex: filterWord, $options: "i" } },

      ],
    });
    res.status(200).json({

      user: users.map((data) => ({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        _id: data._id,
      })),
      
    });
  } catch (error) {
    res.status(403).json({error: error});
  }
}

// define the routes

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.put("/update", authMiddleware, update);
userRouter.get("/bulk", getBulk);

export default userRouter;
