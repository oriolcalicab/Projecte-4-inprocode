import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../services/orderService";
import { pickOrderData, validateOrder } from "../validation/orderValidation";

const router = Router();

// Llistar totes les comandes
router.get("/", async (_req, res) => {
  res.json(await getAllOrders());
});

// Veure una comanda
router.get<{ id: string }>("/:id", async (req, res) => {
  const order = await getOrderById(req.params.id);

  if (!order) {
    res.status(404).json({ error: "Comanda no trobada" });
    return;
  }

  res.json(order);
});

// Crear una comanda
router.post("/", async (req, res) => {
  const body = req.body ?? {};
  const errors = validateOrder(body, true);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const order = await createOrder(pickOrderData(body));
  res.status(201).json(order);
});

// Editar una comanda
router.put<{ id: string }>("/:id", async (req, res) => {
  const body = req.body ?? {};
  const errors = validateOrder(body, false);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const order = await updateOrder(req.params.id, pickOrderData(body));

  if (!order) {
    res.status(404).json({ error: "Comanda no trobada" });
    return;
  }

  res.json(order);
});

// Eliminar una comanda
router.delete<{ id: string }>("/:id", async (req, res) => {
  const deleted = await deleteOrder(req.params.id);

  if (!deleted) {
    res.status(404).json({ error: "Comanda no trobada" });
    return;
  }

  res.status(204).send();
});

export default router;