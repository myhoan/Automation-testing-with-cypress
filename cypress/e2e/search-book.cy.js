import { BookStorePage } from "../page-objects/book-store-application/book-store-page";

describe("Search book with multiple results", () => {
  let data;
  beforeEach(() => {
    cy.visit("books");
    cy.fixture("sampleData").then((item) => {
      return (data = item);
    });
  });
  it("Search book with multiple results successfully", () => {
    BookStorePage.searchBook("design");
    BookStorePage.searchBook("Design");
  });
});
