import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/orders", ordersRouter)

export default app;