import { ProfilePage } from "../page-objects/book-store-application/profile-page";
import { BookStorePage } from "../page-objects/book-store-application/book-store-page";
describe("Delete book", () => {
  let data;
  beforeEach(() => {
    cy.visit("profile");
    cy.fixture("sampleData").then((item) => {
      return (data = item);
    });
  });
  it("Delete book successfully", () => {
    const { userName, password } = data.bookApplication.login;
    const profilePage = new ProfilePage();
    profilePage.loginFromProfilePage(userName, password);
    profilePage.deleteBook(data.bookApplication.books[0]);
    cy.on("window:form", (value) => {
      expect(value).to.equal("OK");
    });
    cy.on("window:confirm", () => true);
    cy.get(".rt-noData").should("have.text", "No rows found");
  });
});
