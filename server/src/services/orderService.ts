import { randomUUID } from "node:crypto";
import { mockOrders } from "../data/mockOrders";
import { Order, OrderData } from "../types/order";


let orders: Order[] = [...mockOrders]

export async function getAllOrders():Promise<Order[]> {
    return orders    
}

export async function getOrderById(id:string): Promise<Order | undefined> {
    return orders.find((order) => order.id === id)    
}


export async function createOrder(data: OrderData): Promise<Order> {
  const order: Order = { id: randomUUID(), ...data };
  orders.push(order);
  return order;
}

export async function updateOrder(id: string, data: OrderData): Promise<Order | undefined> {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return undefined;

  orders[index] = { id, ...data };
  return orders[index];
}


export async function deleteOrder(id: string): Promise<boolean> {
  const before = orders.length;
  orders = orders.filter((order) => order.id !== id);
  return orders.length < before;
}