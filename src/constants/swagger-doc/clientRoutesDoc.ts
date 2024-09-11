/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Operations related to clients
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The client with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: The created client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update an existing client
 *     tags: [Clients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The updated client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Client deleted
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /clients/{clientId}/accounts:
 *   get:
 *     summary: Get all accounts for a client
 *     tags: [Clients]
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of accounts for the specified client
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */

/**
 * @swagger
 * /clients/{clientId}/accounts:
 *   post:
 *     summary: Create an account for a client
 *     tags: [Clients]
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: The created account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /clients/{clientId}/accounts/{accountId}/movements:
 *   get:
 *     summary: Get all movements for a client's account
 *     tags: [Clients]
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: integer
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
