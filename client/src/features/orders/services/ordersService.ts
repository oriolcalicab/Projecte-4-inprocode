import { apiFetch } from "../../../shared/services/apiClient";
import type { Order } from "../types/order";

export function getOrders() {
  return apiFetch<Order[]>("/orders");
}