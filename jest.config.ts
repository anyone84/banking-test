/**
 * @type {import('@jest/types').Config.InitialOptions}
 * Jest configuration file for TypeScript projects.
 * 
 * This configuration file sets up Jest to work with TypeScript and Node.js.
 * 
 * @property {string} preset - Specifies the preset configuration to use. "ts-jest" is used for TypeScript projects.
 * @property {string} testEnvironment - Specifies the environment in which to run the tests. "node" indicates a Node.js environment.
 * @property {string[]} testMatch - An array of glob patterns indicating a set of files for Jest to detect as test files. In this case, it looks for files ending in ".spec.ts" or ".test.ts".
 * @property {string[]} moduleFileExtensions - An array of file extensions Jest will use to resolve modules. It includes "ts" for TypeScript files and "js" for JavaScript files.
 * @property {object} transform - Specifies how Jest should transform files before testing. "ts-jest" is used to transform TypeScript files.
 * @property {string} coverageDirectory - (Optional) Specifies the directory where Jest should output its coverage reports. Defaults to "coverage".
 * @property {string[]} collectCoverageFrom - (Optional) Specifies which files should be considered for coverage collection. In this case, it includes all TypeScript files in the "src" directory.
 * @property {string[]} coveragePathIgnorePatterns - (Optional) Specifies patterns for files to ignore when collecting coverage. In this case, it ignores files in the "node_modules" and "dist" directories.
 */
module.exports = {
  preset: "ts-jest", // Use ts-jest preset for TypeScript support
  testEnvironment: "node", // Run tests in a Node.js environment
  testMatch: ["**/?(*.)+(spec|test).ts"], // Match files with .spec.ts or .test.ts extensions for testing
  moduleFileExtensions: ["ts", "js"], // Resolve TypeScript and JavaScript file extensions
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  coverageDirectory: "coverage", // Optional: Directory for coverage reports
  collectCoverageFrom: ["src/**/*.ts"], // Optional: Files to include in coverage collection
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"], // Optional: Patterns to ignore for coverage
};
