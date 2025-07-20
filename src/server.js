import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import { connect } from "./prismaClient.js";

dotenv.config(); // Carga las variables del archivo .env

const app = express();

// Middleware
app.use(cors()); // Permite peticiones de otros dominios (como React en Render)
app.use(express.json()); // Permite recibir JSON en el body

// Rutas
app.use("/api", taskRoutes);

// Conectar a la base de datos
connect();

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
