# Bank Example

## Description

This is a sample project for a basic banking system using Node.js, TypeScript, and Express. The system handles clients, accounts, and financial transactions. The project includes a structure of routes, controllers, and models with business logic, as well as automated tests using Jest.

## Project Structure

- **`src/`**: Source code of the application.
  - **`controllers/`**: Contains the logic to handle HTTP requests and responses.
  - **`models/`**: Defines data models and business logic.
  - **`routes/`**: Defines routes and routing for the application.
  - **`server.ts`**: Main file that initializes and configures the Express server.
  - **`constants/`**: Contains constants used in the application.
- **`test/`**: Automated tests using Jest.
- **`tsconfig.json`**: TypeScript configuration.
- **`jest.config.ts`**: Jest configuration for tests.
- **`package.json`**: Project configuration and dependencies.

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
