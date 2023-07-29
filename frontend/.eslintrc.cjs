module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
    ],
    plugins: ["@typescript-eslint"],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    rules: {

    },
}