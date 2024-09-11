import { Router } from 'express';
import { deleteMovement } from '../controllers/movementController';

const router = Router();

// Rutas para movimientos
router.delete('/movements/:movementId', deleteMovement);                // Eliminar un movimiento

export default router;
