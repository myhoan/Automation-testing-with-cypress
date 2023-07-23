import { LoginPage } from "./LoginPage";

export const ProfilePage = {
  loginProfilePage(username, password) {
    cy.get("a[href='/login']").click();
    LoginPage.loginToTheApplication(username, password);
  },
  deleteBook(bookName) {
    cy.get("#searchBox").type(bookName);
    cy.get("#basic-addon2").click();
    cy.get("#delete-record-undefined").click();
    cy.get("#closeSmallModal-ok").click();
    cy.on("window:form", (value) => {
      expect(value).to.equal("OK");
    });
    cy.on("window:confirm", () => true);
    cy.get(".rt-noData").should("have.text", "No rows found");
  },
  deleteAllBook() {
    cy.contains("Delete All Books").click({force: true});
    cy.get(".modal-header")
      .should("be.visible")
      .and("contain", "Delete All Books");
    cy.get(".modal-body")
      .should("be.visible")
      .and("contain", "Do you want to delete all books?");
    cy.get("#closeSmallModal-ok").click();
    cy.on("window:alert", (str) => {
      if (str === "All Books deleted.") {
        expect(str).to.equal("All Books deleted.");
      } else {
        expect(str).to.equal("No books available in your's collection!");
      }
    });
    cy.on("window:confirm", () => true);
  },
};
