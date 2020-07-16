module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  plugins: ["unused-imports", "simple-import-sort"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-explicit-any": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "error",
    "unused-imports/no-unused-vars-ts": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_"
      }
    ],
    "simple-import-sort/sort": "error"
  }
};
