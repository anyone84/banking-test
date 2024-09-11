/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Operations related to movements
 */

/**
 * @swagger
 * /movements/{movementId}:
 *   delete:
 *     summary: Delete a movement
 *     tags: [Movements]
 *     parameters:
 *       - name: movementId
 *         in: path
 *         required: true
 *         description: The movement ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Movement deleted
 *       404:
 *         description: Movement not found
 */
