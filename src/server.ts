import express, { Application } from 'express';
import clientRoutes from './routes/clientRoutes';
import accountRoutes from './routes/accountRoutes';
import movementRoutes from './routes/movementRoutes';
import dotenv from 'dotenv';
import { swaggerSpec, swaggerUi } from './swagger';

dotenv.config();

const app: Application = express();

const portNumber: number = parseInt(process.env.PORT || "");
const port: number = Number.isInteger(portNumber) ? portNumber : 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', clientRoutes);
app.use('/api', accountRoutes);
app.use('/api', movementRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
