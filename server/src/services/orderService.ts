import { isValidObjectId } from "mongoose";
import { OrderModel } from "../models/orderModel";
import type { OrderData } from "../types/order";

export async function getAllOrders() {
  return OrderModel.find().sort({ deliveryDate: 1 });
}

export async function getOrderById(id: string) {
  if (!isValidObjectId(id)) return null;
  return OrderModel.findById(id);
}

export async function createOrder(data: OrderData) {
  return OrderModel.create(data);
}

export async function updateOrder(id: string, data: OrderData) {
  if (!isValidObjectId(id)) return null;
  return OrderModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteOrder(id: string): Promise<boolean> {
  if (!isValidObjectId(id)) return false;
  const deleted = await OrderModel.findByIdAndDelete(id);
  return deleted !== null;
}