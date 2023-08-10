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
Given("The user is on the Profile Page {string}", (bookStoreUrl) => {
  cy.visit(bookStoreUrl);
});
When(
  "The user login into the Profile Page with {string} and {string}",
  (userName, password) => {
    cy.get("a[href='/login']").click();
    cy.get(data.txtUserName).clear().type(userName);
    cy.get(data.txtPassword).clear().type(password);
    cy.get(data.btnLogin).click();
    cy.contains(userName);
  }
);
Then("The user can input book name {string} to delete a book", (bookName) => {
  cy.get(data.searchTextBox).type(bookName);
  cy.get(data.btnSearch).click();
  cy.get(data.btnDeleteBook).click();
  cy.get(data.btnCloseModal).click();
});
Then("A book is deleted from the user collection page succcessully", () => {
  cy.on("window:form", (value) => {
    expect(value).to.equal("OK");
  });
  cy.on("window:confirm", () => true);
  cy.get(".rt-noData").should("have.text", "No rows found");
});
