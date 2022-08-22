const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://buger-eats-qa.vercel.app',
    projectId: "8opow8"

  },

});
