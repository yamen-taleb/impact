/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      diagnostics: false,
      astTransformers: {
        before: [
          {
            path: 'ts-jest-mock-import-meta',
            options: { metaObjectReplacement: { env: { VITE_API_BASE_URL: 'http://localhost' } } }
          }
        ]
      },
      tsconfig: {
        verbatimModuleSyntax: false,
        module: "CommonJS",
        jsx: "react-jsx"
      }
    }],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "keycloak-js": "<rootDir>/__mocks__/keycloak-js.js"
  },
};
