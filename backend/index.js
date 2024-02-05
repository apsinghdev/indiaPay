import Express from "express";
import router from "./routes/index";

const app = express();

app.use("/api/v1", router);



