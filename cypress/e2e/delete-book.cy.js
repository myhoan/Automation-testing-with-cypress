import { ProfilePage } from "../page-objects/book-store-application/profile-page";

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
    ProfilePage.loginFromProfilePage(userName, password);
    ProfilePage.deleteBook(data.bookApplication.books[0]);
  });
});
