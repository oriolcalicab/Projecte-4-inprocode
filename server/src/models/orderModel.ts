import { Schema, model } from "mongoose";
import { CATEGORIES, STATUSES } from "../types/order";
import type { OrderData } from "../types/order";

const orderSchema = new Schema<OrderData>(
  {
    customerName: { type: String, required: true },
    contact: { type: String, default: "" },
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    deliveryDate: { type: String, required: true },
    category: { type: String, enum: [...CATEGORIES], required: true },
    description: { type: String, default: "" },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: [...STATUSES], default: "pendent" },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      // MongoDB fa servir "_id"; nosaltres volem retornar "id"
      transform: (_doc, ret) => {
        const { _id, ...rest } = ret;
        return rest;
      },
    },
  },
);

export const OrderModel = model<OrderData>("Order", orderSchema)
