import express from 'express';
import { 
  getClients, 
  getClientById, 
  createClient, 
  updateClient, 
  deleteClient 
} from '../controllers/clientController';
import { getAccountsByClientId, createAccount } from '../controllers/accountController';
import { getMovementsForClientAccount } from '../controllers/movementController';

const router = express.Router();

// Rutas para el CRUD
router.get('/clients', getClients); // Obtener todos los clientes
router.get('/clients/:id', getClientById); // Obtener un cliente por ID
router.post('/clients', createClient); // Crear un nuevo cliente
router.put('/clients/:id', updateClient); // Actualizar un cliente existente
router.delete('/clients/:id', deleteClient); // Eliminar un cliente

router.get('/clients/:clientId/accounts', getAccountsByClientId);  // Obtener todas las cuentas de un cliente
router.post('/clients/:clientId/accounts', createAccount);         // Crear una cuenta para un cliente

router.get('/clients/:clientId/accounts/:accountId/movements', getMovementsForClientAccount);


export default router;