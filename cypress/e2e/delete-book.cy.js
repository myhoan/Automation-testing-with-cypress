import { ProfilePage } from "../PageObjects/BookStoreApplication/ProfilePage";

describe("Delete book", () => {
  let data;
  beforeEach(() => {
    cy.visit("profile");
    cy.fixture("sampleData").then((item) => {
      return (data = item);
    });
  });
  it("Delete book successfully", () => {
    const {userName, password} = data.bookApplication.login
    ProfilePage.loginProfilePage(userName, password);
    ProfilePage.deleteBook(data.bookApplication.books[0]);
    
  });
});
