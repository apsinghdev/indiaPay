import express, { Router } from "express";
import { z } from "zod";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import JWT_SECRET from "../config";

const userRouter = express.Router();

Router.post("/api/v1/user/signup", signup);

const userData = z.object({
  username: z.string().email(),
  password: z.string().required(),
  firstname: z.string().required(),
  lastname: z.string().required(),
});

const signup = async (req, res) => {
  const result = userData.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json("Incorrect inputs! Try again.");
  }

  const { username, password, firstname, lastname } = req.body;

  // check if a user already exists in the database

  User.findOne({ username: username }, (err, user) => {
    if (user) {
      return res
        .status(409)
        .json({ error: "user already exists. please signin" });
    }
  });

  // hash the password

  const hashedPassword = await bcryptjs.hash(password, 10);

  // now store the data with hashed password in the database.
  // first create a new instance of model

  const newUser = new User({
    username: username,
    password: hashedPassword,
    firstname: firstname,
    lastname: lastname,
  });

  // save the data in db

  try {
    const user = await newUser.save();
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.send(201).json({ message: "user created successfully", token: token });
  } catch (error) {
    res.send(500).json(error.message);
  }
};

module.exports = userRouter;
