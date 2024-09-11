import { Router } from 'express';
import { updateAccount, deleteAccount } from '../controllers/accountController';
import { getMovementsByAccountId, createMovement } from '../controllers/movementController';

const router = Router();

/**
 * @route PUT /accounts/{accountId}
 * @group Accounts - Operations related to accounts
 * @param {integer} accountId.path.required - The account ID
 * @param {Account} account.body.required - Account data to update
 * @summary Update an account
 * @returns {Account} 200 - The updated account
 * @returns {Error} 404 - Account not found
 */
router.put('/accounts/:accountId', updateAccount);

/**
 * @route DELETE /accounts/{accountId}
 * @group Accounts - Operations related to accounts
 * @param {integer} accountId.path.required - The account ID
 * @summary Delete an account
 * @returns {void} 204 - Account deleted
 * @returns {Error} 404 - Account not found
 */
router.delete('/accounts/:accountId', deleteAccount);

/**
 * @route GET /accounts/{accountId}/movements
 * @group Accounts - Operations related to accounts
 * @param {integer} accountId.path.required - The account ID
 * @summary Get all movements for an account
 * @returns {array<Movement>} 200 - List of movements for the specified account
 * @returns {Error}  default - Unexpected error
 */
router.get('/accounts/:accountId/movements', getMovementsByAccountId);

/**
 * @route POST /accounts/{accountId}/movements
 * @group Accounts - Operations related to accounts
 * @param {integer} accountId.path.required - The account ID
 * @param {Movement} movement.body.required - Movement data to create
 * @summary Create a movement for an account
 * @returns {Movement} 201 - The created movement
 * @returns {Error} 400 - Invalid input
 */
router.post('/accounts/:accountId/movements', createMovement);

export default router;
