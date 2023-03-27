module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    plugins: ["@typescript-eslint"],
    rules: {
        'vue/no-unused-vars': 'warn'
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    }
}