import { Router } from 'express';
import { deleteMovement } from '../controllers/movementController';

const router = Router();

/**
 * @route DELETE /movements/{movementId}
 * @group Movements - Operations related to movements
 * @param {integer} movementId.path.required - The movement ID
 * @summary Delete a movement
 * @returns {void} 204 - Movement deleted
 * @returns {Error} 404 - Movement not found
 */
router.delete('/movements/:movementId', deleteMovement);

export default router;
