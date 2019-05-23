module.exports = {
  "rootDir": "./",
  "resetMocks": true,
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  "transform": {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest"
  },
  "testMatch": [
    "<rootDir>/tests/**/?(*.)+(spec|test).ts?(x)"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(date-fns)/)"
  ],
  "coverageDirectory": "<rootDir>/test/unit/coverage",
  "collectCoverageFrom": [
    "src/**/*.{ts}",
    "!**/node_modules/**"
  ]
}
;
