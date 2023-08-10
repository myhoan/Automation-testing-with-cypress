import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

let data;
let addedBook;

Before(() => {
  cy.fixture("sampleData").then((item) => {
    return (data = item.variableLocator);
  });
});
Given("There is a book named {string}", (bookName) => {
  addedBook = bookName;
});
Given("The user is on the Book Store Page {string}", (bookStoreUrl) => {
  cy.visit(bookStoreUrl);
});
When(
  "The user login into the Book Store Page with {string} and {string}",
  (userName, password) => {
    cy.get(data.btnLogin).click();
    cy.get(data.txtUserName).clear().type(userName);
    cy.get(data.txtPassword).clear().type(password);
    cy.get(data.btnLogin).click();
    cy.contains(userName);
  }
);
Then(
  "The user can input and choose book name {string} to add a book",
  (bookName) => {
    cy.contains(bookName).click();
    cy.contains("Add To Your Collection").click({ force: true });
  }
);
Then("A book is added into the user collection page succcessully", () => {
  cy.on("window:form", (str) => {
    expect(str).to.equal("Book added to your collection.");
    expect(txt).to.equal("OK");
  });
  cy.on("window:confirm", () => true);
  cy.visit("profile");
  cy.xpath('//a[text()="Git Pocket Guide"]').should(
    "have.text",
    "Git Pocket Guide"
  );
});
