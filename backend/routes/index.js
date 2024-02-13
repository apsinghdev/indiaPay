import Express from "express";
import userRouter from "./user.js";
import accountRouter from "./account.js";

const router = Express.Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/account", accountRouter);

export default router;
