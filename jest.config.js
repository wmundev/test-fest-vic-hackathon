module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|jpeg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!vuetify)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^vuetify/components$":
      "<rootDir>/node_modules/vuetify/lib/components/index.js",
    "^vuetify/directives$":
      "<rootDir>/node_modules/vuetify/lib/directives/index.js",
  },
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
  ],
  testEnvironmentOptions: {
    url: "http://localhost/",
    customExportConditions: ["node", "node-addons"],
  },
};
