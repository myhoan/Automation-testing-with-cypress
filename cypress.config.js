const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://demoqa.com/",
    blockHosts: [
      "pagead2.googlesyndication.com",
      "ad.plus",
      "serving.stat-rock.com",
      "securepubads.g.doubleclick.net",
      "www.google-analytics.com",
    ],
  },
});
