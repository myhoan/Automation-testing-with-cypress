import { LoginPage } from "./login-page";

let data;
before(() => {
  cy.fixture("sampleData.json").then((item) => {
    return (data = item.variableLocator);
  });
});
export class ProfilePage {
  loginFromProfilePage(username, password) {
    const loginPage = new LoginPage();
    cy.get("a[href='/login']").click();
    loginPage.loginToTheApplication(username, password);
  }
  deleteBook(bookName) {
    cy.get(data.searchTextBox).type(bookName);
    cy.get(data.btnSearch).click();
    cy.get(data.btnDeleteBook).click();
    cy.get(data.btnCloseModal).click();
  }
  deleteAllBook() {
    cy.contains("Delete All Books").click({ force: true });
    cy.get(data.modalHeader)
      .should("be.visible")
      .and("contain", "Delete All Books");
    cy.get(data.modalBody)
      .should("be.visible")
      .and("contain", "Do you want to delete all books?");
    cy.get(data.btnCloseModal).click();
    cy.on("window:alert", (str) => {
      if (str === "All Books deleted.") {
        expect(str).to.equal("All Books deleted.");
      } else {
        expect(str).to.equal("No books available in your's collection!");
      }
    });
    cy.on("window:confirm", () => true);
  }
}
