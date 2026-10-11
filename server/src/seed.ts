import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./db";
import { OrderModel } from "./models/orderModel";
import { mockOrders } from "./data/mockOrders";

const seed = async () => {
  await connectDB();

 
  await OrderModel.deleteMany({});

  
  const data = mockOrders.map(({ id, ...rest }) => rest);
  await OrderModel.insertMany(data);

  console.log(`${data.length} comandes inserides`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});