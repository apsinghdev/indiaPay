import Express from "express";
import userRouter from "./user";

const router = Express.Router();

router.use("/api/v1/user", userRouter);

module.exports = router;
