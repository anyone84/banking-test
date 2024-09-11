/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Operations related to accounts
 */

/**
 * @swagger
 * /accounts/{accountId}:
 *   put:
 *     summary: Update an account
 *     tags: [Accounts]
 *     parameters:
 *       - name: accountId
 *         in: path
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: The updated account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 */

/**
 * @swagger
 * /accounts/{accountId}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     parameters:
 *       - name: accountId
 *         in: path
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Account deleted
 *       404:
 *         description: Account not found
 */

/**
 * @swagger
 * /accounts/{accountId}/movements:
 *   get:
 *     summary: Get all movements for an account
 *     tags: [Accounts]
 *     parameters:
 *       - name: accountId
 *         in: path
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of movements for the specified account
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movement'
 */

/**
 * @swagger
 * /accounts/{accountId}/movements:
 *   post:
 *     summary: Create a movement for an account
 *     tags: [Accounts]
 *     parameters:
 *       - name: accountId
 *         in: path
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movement'
 *     responses:
 *       201:
 *         description: The created movement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movement'
 *       400:
 *         description: Invalid input
 */
