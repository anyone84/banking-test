/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // Opcional: Configura el directorio de salida de los reportes de cobertura
  coverageDirectory: "coverage",
  // Opcional: Configura el directorio de salida de los reportes de cobertura
  collectCoverageFrom: ["src/**/*.ts"],
  // Opcional: Configura los patrones de archivo a ignorar para cobertura
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
};
