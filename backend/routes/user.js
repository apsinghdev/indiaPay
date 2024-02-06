import express, { Router } from "express";
import { z } from "zod";
import User from "../models/user.model";
import bcrypt from "bcrypt";

const userRouter = express.Router();

const userData = z.object({
  username: z.string().email(),
  password: z.string().required(),
  firstname: z.string().required(),
  lastname: z.string().required(),
});

const signup = async (req, res) => {
  const result = userData.safeParse(req.body);
  if (result.success) {
    const { username, password, firstname, lastname } = req.body;
    // check if a user already exists in the database
    await User.findOne({ username: username }, (err, user) => {
      if (user) {
        res.status(409).json({ error: "user already exists. please signin" });
      }

    });
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
};
Router.post("/api/v1/user/signup", signup);

module.exports = userRouter;
