import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

let data;
let expectedBook = [];

Before(() => {
  cy.fixture("sampleData").then((item) => {
    return (data = item.variableLocator);
  });
});
Given("There are books named {string} and {string}", (bookName1, bookName2) => {
  expectedBook = [bookName1, bookName2];
});
Given("The user is on the Book Store Page {string}", (bookStoreUrl) => {
  cy.visit(bookStoreUrl);
});

When("The user input book name {string}", (bookName) => {
  cy.get(data.searchTextBox).clear().type(bookName);
});
Then(
  "All books match with the search results criteria will be displayed",
  () => {
    expectedBook.map((item) => {
      cy.get(".action-buttons span a")
        .invoke("text")
        .should((text) => {
          expect(text.toLowerCase()).to.contain(item.toLowerCase());
        });
    });
  }
);
