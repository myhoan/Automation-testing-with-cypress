import { afterEach } from "mocha";
import { Authorization, BookStore } from "../../utils/api-request";

describe("Automation testing with API in BookStore page", () => {
  describe("Add a book test cases", () => {
    beforeEach(() => {
      Authorization.loginUser();
    });

    describe("Add a book successfully", () => {
      afterEach(() => {
        BookStore.deleteBook();
      });
      it("Add a book to collection successfully through API", () => {
        BookStore.addBook();
      });
    });
    describe("Add a book unsuccessfully", () => {
      it("Add a book unsuccessfully with invalid isbn", () => {
        BookStore.addBookInvalidValue();
      });

      it("Add a book unsuccessfully with null authorization", () => {
        BookStore.addBookNullValue();
      });
    });
  });

  describe("Replace book test cases", () => {
    beforeEach(() => {
      Authorization.loginUser();
    });
    describe("Replace a book successfully", () => {
      describe("Replace a book successfully with isbn", () => {
        beforeEach(() => {
          BookStore.addBook();
        });
        it("Replace a book successfully through API", () => {
          BookStore.replaceBook();
        });
      });
      describe("Replace a book unsuccessfully", () => {
        it("Replace a book unsuccessfully with invalid isbn", () => {
          BookStore.replaceBookInvalidIsbn();
        });
        it("Replace a book unsuccessfully with null authorization", () => {
          BookStore.replaceBookUnauthorize();
        });
      });
    });
  });

  describe("Delete book test cases", () => {
    beforeEach("Login and add a book successfully through API", () => {
      Authorization.loginUser();
      BookStore.addBook();
    });

    describe("Delete a book successfully", () => {
      it("Delete a book successfully through API", () => {
        BookStore.deleteBook();
      });
    });

    describe("Delete a book unsuccessfully", () => {
      afterEach(() => {
        BookStore.deleteBook();
      });

      it("Delete a book unsuccessfully with invalid isbn", () => {
        BookStore.deleteBookInvalidIsbn();
      });

      it("Delete a book unsuccessfully with null authorization", () => {
        BookStore.deleteBookNullIsbn();
      });
    });
  });
});
