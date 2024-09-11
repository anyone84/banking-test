import { Router } from 'express';
import { 
  getClients, 
  getClientById, 
  createClient, 
  updateClient, 
  deleteClient 
} from '../controllers/clientController';
import { getAccountsByClientId, createAccount } from '../controllers/accountController';
import { getMovementsForClientAccount } from '../controllers/movementController';

const router: Router = Router();

/**
 * @route GET /clients
 * @group Clients - Operations related to clients
 * @summary Get all clients
 * @returns {array<Client>} 200 - List of all clients
 * @returns {Error}  default - Unexpected error
 */
router.get('/clients', getClients);

/**
 * @route GET /clients/{id}
 * @group Clients - Operations related to clients
 * @param {integer} id.path.required - The client ID
 * @summary Get a client by ID
 * @returns {Client} 200 - The client with the specified ID
 * @returns {Error} 404 - Client not found
 */
router.get('/clients/:id', getClientById);

/**
 * @route POST /clients
 * @group Clients - Operations related to clients
 * @param {Client} client.body.required - Client data to create
 * @summary Create a new client
 * @returns {Client} 201 - The created client
 * @returns {Error} 400 - Invalid input
 */
router.post('/clients', createClient);

/**
 * @route PUT /clients/{id}
 * @group Clients - Operations related to clients
 * @param {integer} id.path.required - The client ID
 * @param {Client} client.body.required - Client data to update
 * @summary Update an existing client
 * @returns {Client} 200 - The updated client
 * @returns {Error} 404 - Client not found
 */
router.put('/clients/:id', updateClient);

/**
 * @route DELETE /clients/{id}
 * @group Clients - Operations related to clients
 * @param {integer} id.path.required - The client ID
 * @summary Delete a client
 * @returns {void} 204 - Client deleted
 * @returns {Error} 404 - Client not found
 */
router.delete('/clients/:id', deleteClient);

/**
 * @route GET /clients/{clientId}/accounts
 * @group Clients - Operations related to clients
 * @param {integer} clientId.path.required - The client ID
 * @summary Get all accounts for a client
 * @returns {array<Account>} 200 - List of accounts for the specified client
 * @returns {Error}  default - Unexpected error
 */
router.get('/clients/:clientId/accounts', getAccountsByClientId);

/**
 * @route POST /clients/{clientId}/accounts
 * @group Clients - Operations related to clients
 * @param {integer} clientId.path.required - The client ID
 * @param {Account} account.body.required - Account data to create
 * @summary Create an account for a client
 * @returns {Account} 201 - The created account
 * @returns {Error} 400 - Invalid input
 */
router.post('/clients/:clientId/accounts', createAccount);

/**
 * @route GET /clients/{clientId}/accounts/{accountId}/movements
 * @group Clients - Operations related to clients
 * @param {integer} clientId.path.required - The client ID
 * @param {integer} accountId.path.required - The account ID
 * @summary Get all movements for a client's account
 * @returns {array<Movement>} 200 - List of movements for the specified account
 * @returns {Error}  default - Unexpected error
 */
router.get('/clients/:clientId/accounts/:accountId/movements', getMovementsForClientAccount);

export default router;
