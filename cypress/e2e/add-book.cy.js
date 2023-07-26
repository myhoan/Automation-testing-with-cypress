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
    const bookStorePage = new BookStorePage();
    bookStorePage.loginFromBookStore(userName, password);
    bookStorePage.addBook(data.bookApplication.books[0]);
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
  });
});
