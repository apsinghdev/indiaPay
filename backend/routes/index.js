import Express from "express";
import userRouter from "./user";
import accountRouter from "./account";

const router = Express.Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/account", accountRouter);

module.exports = router;
