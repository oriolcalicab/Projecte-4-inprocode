import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders";
import { requireAuth } from "./middleware/authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/orders" , requireAuth, ordersRouter)

export default app;