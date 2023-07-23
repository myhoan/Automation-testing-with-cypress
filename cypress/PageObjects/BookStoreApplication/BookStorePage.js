import { LoginPage } from "./LoginPage";

export const BookStorePage = {
  loginFromBookStore(username, password) {
    cy.get("#login").click();
    LoginPage.loginToTheApplication(username, password);
  },
  addBook(bookName) {
    
    cy.contains(bookName).click();
    cy.contains("Add To Your Collection").click({ force: true });
    cy.on("window:form", (str) => {
      expect(str).to.equal("Book added to your collection.");
      expect(txt).to.equal("OK");
    });
    cy.on("window:confirm", () => true);
    cy.visit("profile");
    cy.get(".rt-tbody").should("contain", bookName);
   
  },
};
