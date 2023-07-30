const Ajv = require("ajv");
import { SchemaUser } from "../../support/schemas/userGET";
describe("BookStore Testing API", () => {
  const bookCollection = [
    {
      isbn: "9781449337711",
    },
    {
      isbn: "9781449365035",
    },
    {
      isbn: "9781593275846",
    },
  ];
  const ajv = new Ajv();
  const schemaUser = SchemaUser;
  const book = {
    title: "Git Pocket Guide",
    ISBN: "9781449325862",
  };

  const user = {
    userName: Cypress.env("bookStoreUser").userName,
    password: Cypress.env("bookStoreUser").password,
  };
  describe("Add book tests", () => {
    beforeEach(() => {
      cy.authenticate(user);
    });

    describe("Successful Tests", () => {
      it("Add a book to collection through API", () => {
        cy.getCookie("token").then(($token) => {
          const token = $token.value;

          cy.getCookie("userID").then(($id) => {
            const userId = $id.value;

            cy.request({
              method: "POST",
              url: `${Cypress.config("baseUrl")}BookStore/v1/Books`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: {
                userId,
                collectionOfIsbns: [{ isbn: book.ISBN }],
              },
            }).then(($response) => {
              expect($response.status).to.eq(201);
              expect($response.body.books[0].isbn).to.eq(book.ISBN);
            });
          });
        });
      });
    });
    describe("Failure Tests", () => {
      it("Add a book with invalid data input", () => {
        cy.getCookie("token").then(($token) => {
          const token = $token.value;

          cy.getCookie("userID").then(($id) => {
            const userId = $id.value;

            cy.request({
              method: "POST",
              url: `${Cypress.config("baseUrl")}BookStore/v1/Books`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: {
                userId,
                collectionOfIsbns: [{ isbn: 93510 }],
              },
              failOnStatusCode: false,
            }).then(($response) => {
              expect($response.status).to.eq(400);
            });
          });
        });
      });

      it("Add a book with null authorization", () => {
        cy.request({
          method: "POST",
          url: `${Cypress.config("baseUrl")}BookStore/v1/Books`,
          headers: {
            Authorization: null,
          },
          body: {
            userId: null,
            collectionOfIsbns: [{ isbn: book.ISBN }],
          },
          failOnStatusCode: false,
        }).then(($response) => {
          expect($response.status).to.eq(401);
        });
      });
    });
  });

  describe("Replace book tests", () => {
    beforeEach(() => {
      cy.authenticate(user);
    });
    describe("Successful Tests", () => {
      describe("Successful Tests", () => {
        it("Replace a book through API", () => {
          cy.getCookie("token").then(($token) => {
            const token = $token.value;

            cy.getCookie("userID").then(($id) => {
              const userId = $id.value;

              cy.request({
                method: "PUT",
                url: `${Cypress.config("baseUrl")}BookStore/v1/Books/${
                  book.ISBN
                }`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: {
                  userId,
                  isbn: bookCollection[1].isbn,
                },
              }).then(($response) => {
                expect($response.status).to.eq(200);
                const validate = ajv.compile(schemaUser);
                const valid = validate($response.body);
                expect(valid, "schema valid?").to.be.true;
              });
            });
          });
        });
      });
      describe("Failure tests", () => {
        it("Replace a book with invalid input", () => {
          cy.getCookie("token").then(($token) => {
            const token = $token.value;

            cy.getCookie("userID").then(($id) => {
              const userId = $id.value;

              cy.request({
                method: "PUT",
                url: `${Cypress.config("baseUrl")}BookStore/v1/Books/${
                  book.ISBN
                }`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: {
                  userId,
                  isbn: "testing",
                },
                failOnStatusCode: false,
              }).then(($response) => {
                expect($response.status).to.eq(400);
              });
            });
          });
        });
        it("Replace a book with null authorization", () => {
          cy.request({
            method: "PUT",
            url: `${Cypress.config("baseUrl")}BookStore/v1/Books/${book.ISBN}`,
            headers: {
              Authorization: null,
            },
            body: {
              userId: null,
              isbn: "testing",
            },
            failOnStatusCode: false,
          }).then(($response) => {
            expect($response.status).to.eq(400);
          });
        });
      });
    });
  });

  describe("Delete book tests", () => {
    beforeEach("Login and add a book through API", () => {
      cy.authenticate(user);
      cy.addBook(book.ISBN);
    });

    describe("Successful Tests", () => {
      it("Delete a book through API", () => {
        cy.getCookie("token").then(($token) => {
          const token = $token.value;

          cy.getCookie("userID").then(($id) => {
            const userId = $id.value;

            cy.request({
              method: "DELETE",
              url: `${Cypress.config("baseUrl")}BookStore/v1/Book`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: {
                userId,
                isbn: book.ISBN,
              },
            }).then(($response) => {
              expect($response.status).to.eq(204);
            });
          });
        });
      });
    });

    describe("Failure Tests", () => {
      afterEach("Delete the book", () => {
        cy.deleteBook(book.ISBN);
      });

      it("Delete a book with invalid input", () => {
        cy.getCookie("token").then(($token) => {
          const token = $token.value;

          cy.getCookie("userID").then(($id) => {
            const userId = $id.value;

            cy.request({
              method: "DELETE",
              url: `${Cypress.config("baseUrl")}BookStore/v1/Book`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: {
                userId,
                isbn: "testing",
              },
              failOnStatusCode: false,
            }).then(($response) => {
              expect($response.status).to.eq(400);
            });
          });
        });
      });

      it("Delete a book with null authorization", () => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.config("baseUrl")}BookStore/v1/Book`,
          headers: {
            Authorization: null,
          },
          body: {
            userId: null,
            isbn: book.ISBN,
          },
          failOnStatusCode: false,
        }).then(($response) => {
          expect($response.status).to.eq(401);
        });
      });
    });
  });
});
