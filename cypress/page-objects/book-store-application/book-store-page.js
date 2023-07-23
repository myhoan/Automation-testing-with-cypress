import { LoginPage } from "./login-page";

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
    cy.xpath('//a[text()="Speaking JavaScript"]').should(
      "have.text",
      "Speaking JavaScript"
    );
  },
  searchBook(bookName) {
    cy.get("#searchBox").clear().type(bookName);
    cy.xpath('//a[text()="Learning JavaScript Design Patterns"]').should(
      "have.text",
      "Learning JavaScript Design Patterns"
    );
    cy.xpath('//a[text()="Designing Evolvable Web APIs with ASP.NET"]').should(
      "have.text",
      "Designing Evolvable Web APIs with ASP.NET"
    );
  },
};
