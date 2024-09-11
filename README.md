# Bank Example

## Description

This is a sample project for a basic banking system using Node.js, TypeScript, and Express. The system handles clients, accounts, and financial transactions. The project includes a structure of routes, controllers, and models with business logic, as well as automated tests using Jest.

### Project Structure

- **`src/`**: Contains the source code of the API.
  - **`controllers/`**: Controllers to handle business logic.
  - **`models/`**: Data models for clients, accounts, and movements.
  - **`routes/`**: Definition of the API routes.
  - **`swagger.ts`**: Swagger configuration for API documentation.
  - **`constants/`**: Constant files, including Swagger documentation.
    - **`swagger-doc/`**: Route documentation in Swagger format.
  - **`server.ts`**: Configuration and startup of the Express server.

- **`test/`**: Contains unit and integration tests.
- **`jest.config.ts`**: Jest configuration for testing.
- **`package.json`**: NPM configuration file.
- **`tsconfig.json`**: TypeScript configuration.

## API Documentation

API documentation is generated with Swagger and is available for interactive testing. You can access it at the following URL: `http://localhost:3000/api-docs`

## API Routes

### Clients

- **`GET /clients`**: Get all clients.
- **`GET /clients/{id}`**: Get a client by ID.
- **`POST /clients`**: Create a new client.
- **`PUT /clients/{id}`**: Update an existing client.
- **`DELETE /clients/{id}`**: Delete a client.
- **`GET /clients/{clientId}/accounts`**: Get all accounts for a client.
- **`POST /clients/{clientId}/accounts`**: Create an account for a client.

### Accounts

- **`PUT /accounts/{accountId}`**: Update an account.
- **`DELETE /accounts/{accountId}`**: Delete an account.
- **`GET /accounts/{accountId}/movements`**: Get all movements for an account.
- **`POST /accounts/{accountId}/movements`**: Create a movement for an account.

### Movements

- **`DELETE /movements/{movementId}`**: Delete a movement.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-URL>
   cd bank-example

2. Install the dependencies:

   ```bash
   npm install

## Scripts

- `npm run build`: Compiles TypeScript code to JavaScript in the `dist` directory.
- `npm run dev`: Runs the server in development mode using `nodemon`.
- `npm start`: Runs the server using the compiled code in `dist`.
- `npm test`: Runs tests with Jest.
- `npm run test`:watch: Runs tests in watch mode.
- `npm run coverage`: Generates a test coverage report.

## Configuration

1. Create a `.env` file in the root directory of the project with the following variables:

   ```bash
   PORT=3000

## Usage

1. Start the server in development mode, the server will be available at `http://localhost:3000`

   ```bash
   npm run dev


2. Run the tests. Run the tests to ensure everything is working correctly.

   ```bash
   npm test

3. Generate test coverage. Coverage reports will be saved in the `coverage` directory.

   ```bash
   npm run coverage
