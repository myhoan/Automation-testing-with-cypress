import { BookStorePage } from "../page-objects/book-store-application/book-store-page";

describe("Add book to collection", () => {
  let data;
  beforeEach(() => {
    cy.visit("books");
    cy.fixture("sampleData").then((item) => {
      return (data = item);
    });
  });

  it("Add book to collection succcessully", function () {
    const { userName, password } = data.bookApplication.login;
    BookStorePage.loginFromBookStore(userName, password);
    BookStorePage.addBook(data.bookApplication.books[0]);
  });
});
