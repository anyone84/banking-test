// src/routes/accountRoutes.ts
import { Router } from 'express';
import {updateAccount, deleteAccount } from '../controllers/accountController';
import { getMovementsByAccountId, createMovement } from '../controllers/movementController';

const router = Router();

// Rutas para cuentas
router.put('/accounts/:accountId', updateAccount);                 // Actualizar una cuenta
router.delete('/accounts/:accountId', deleteAccount);              // Eliminar una cuenta

router.get('/accounts/:accountId/movements', getMovementsByAccountId);  // Obtener todos los movimientos de una cuenta
router.post('/accounts/:accountId/movements', createMovement);          // Crear un movimiento para una cuenta

export default router;
