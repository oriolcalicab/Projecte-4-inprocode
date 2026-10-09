import { Router } from "express";
import { mockOrders } from "../data/mockOrders";

const router = Router();

router.get("/", (_req, res) => {
  res.json(mockOrders);
});

export default router;