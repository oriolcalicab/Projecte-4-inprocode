import { useEffect, useState } from "react";
import type { Order } from "../types/order";
import { getOrders } from "../services/ordersService";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError("No s'han pogut carregar les comandes"));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Comandes ({orders.length})</h1>

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      <ul className="mt-3 list-disc pl-5">
        {orders.map((order) => (
          <li key={order.id}>
            {order.customerName} — {order.category} — {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}