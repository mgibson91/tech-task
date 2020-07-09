module.exports = {
  transform: {
    "\^.*ts$": "ts-jest",
  },
  testMatch: [
    '<rootDir>/test/*.spec.ts',
    '<rootDir>/test/**/*.spec.ts',
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
  ],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
  },
  testEnvironment: 'node',
};
