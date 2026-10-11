import "dotenv/config"  
import app from "./app";
import { connectDB } from "./db";

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor escoltant al port ${PORT}`);
    });
  } catch (error) {
    console.error("No s'ha pogut carregar el servidor:", error);
    process.exit(1);
  }
}

start();
