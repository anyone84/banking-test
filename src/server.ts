// Import the 'express' module
import express, { Application } from "express";
import clientRoutes from "./routes/clientRoutes";
import accountRoutes from "./routes/accountRoutes";
import movementRoutes from "./routes/movementRoutes";
import dotenv from "dotenv";

dotenv.config();

// Create an Express application
const app: Application = express();

// Set the port number for the server
const portNumber: number = parseInt(process.env.PORT || "");
const port: number = Number.isInteger(portNumber) ? portNumber : 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api", clientRoutes);
app.use("/api", accountRoutes);
app.use("/api", movementRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
