const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demoqa.com/',
    blockHosts: ["pagead2.googlesyndication.com","ad.plus", "serving.stat-rock.com","securepubads.g.doubleclick.net","www.google-analytics.com"],
  },
});
