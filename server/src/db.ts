import mongoose from "mongoose";

export async function connectDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("Falta la variable MONGOODB_URI al fitxer .env");
    }

    await mongoose.connect(uri);
    console.log("Connectat a MongoDB");
}