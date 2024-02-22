import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import connectDB from "./db.js";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

try {
  await connectDB();
  app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
  });
} catch (error) {
  res.status(403).json({ error: "failed connecting to database" });
}
