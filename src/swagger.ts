import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Bank Example API',
    version: '1.0.0',
    description: 'API documentation for the Bank Example project.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Client: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'john.doe@example.com',
          },
          phone: {
            type: 'string',
            example: '+1234567890',
          },
        },
        required: ['name', 'email', 'phone'],
      },
      Account: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          accountNumber: {
            type: 'string',
            example: '1234567890',
          },
          balance: {
            type: 'number',
            format: 'float',
            example: 1000.0,
          },
          clientId: {
            type: 'integer',
            example: 1,
          },
        },
        required: ['accountNumber', 'balance', 'clientId'],
      },
      Movement: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          quantity: {
            type: 'number',
            format: 'float',
            example: -50.0,
          },
          date: {
            type: 'integer',
            example: 1632520800000,
          },
          accountId: {
            type: 'integer',
            example: 1,
          },
        },
        required: ['quantity', 'date', 'accountId'],
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/constants/swagger-doc/*.ts'], // Paths to the API routes and controllers
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
