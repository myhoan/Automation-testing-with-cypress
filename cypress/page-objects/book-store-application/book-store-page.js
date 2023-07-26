import { LoginPage } from "./login-page";

let data;
before(() => {
  cy.fixture("sampleData.json").then((item) => {
    return (data = item.variableLocator);
  });
});

export class BookStorePage {
  loginFromBookStore(username, password) {
    const loginPage = new LoginPage();
    cy.get(data.btnLogin).click();
    loginPage.loginToTheApplication(username, password);
  }
  addBook(bookName) {
    cy.contains(bookName).click();
    cy.contains("Add To Your Collection").click({ force: true });
  }
  searchBook(bookName) {
    cy.get(data.searchTextBox).clear().type(bookName);
    cy.get(".action-buttons span a")
      .invoke("text")
      .should((text) => {
        expect(text.toLowerCase()).to.contain(bookName.toLowerCase());
      });
  }
}
