const Ajv = require("ajv");
import { REQUEST_API_URL } from "../constants/request-api";
import { SchemaUser } from "../support/schemas/userGET";
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

const userName = Cypress.env("bookStoreUser").userName;
const password = Cypress.env("bookStoreUser").password;

let token;
let userID;
export const Authorization = {
  loginUser() {
    cy.request({
      method: "Post",
      url: `${Cypress.config("baseUrl")}Account/v1/Login`,
      body: {
        userName,
        password,
      },
    }).then(($response) => {
      cy.setCookie("token", $response.body.token);
      cy.setCookie("userName", $response.body.username);
      cy.setCookie("userID", $response.body.userId);
      cy.setCookie("expires", $response.body.expires);
      expect($response.status).to.eq(200);
      userID = $response.body.userId;
    });
  },
  getToken() {
    cy.request({
      method: "POST",
      url: REQUEST_API_URL.GENERATE_TOKEN,
      body: {
        userName,
        password,
      },
    }).then((response) => {
      if (userName && password) {
        expect(response.status).is.eq(200);
        token = response.body.token;
      } else {
        expect(response.body.status).to.eq("Failed");
        expect(response.body.result).to.eq("User authorization failed.");
      }
    });
  },

  getAuthorized() {
    cy.request({
      method: "POST",
      url: REQUEST_API_URL.AUTHORIZED,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        userName,
        password,
      },
    }).then(($response) => {
      expect($response.status).to.eq(200);
      expect($response.body).to.eq(true);
    });
  },

  getUserDetail() {
    cy.request({
      method: "GET",
      url: `${REQUEST_API_URL.GET_DETAILS_USER}/${userID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.have.eq(200);
      const validate = ajv.compile(schemaUser);
      const valid = validate(response.body);
      expect(valid, "schema valid?").to.be.true;
    });
  },

  generateTokenUnauthorized() {
    cy.request({
      method: "POST",
      url: REQUEST_API_URL.GENERATE_TOKEN,
      body: {
        userName: "demoauto",
        password: "demoauto",
      },
    }).then(($response) => {
      expect($response.body.status).to.eq("Failed");
      expect($response.body.result).to.eq("User authorization failed.");
    });
  },
  generateTokenNullValue() {
    cy.request({
      method: "POST",
      url: REQUEST_API_URL.GENERATE_TOKEN,
      body: {
        userName: null,
        password: null,
      },
      failOnStatusCode: false,
    }).then(($response) => {
      expect($response.status).to.eq(400);
    });
  },
  generateTokenBadRequestMethod() {
    cy.request({
      method: "PATCH",
      url: REQUEST_API_URL.GENERATE_TOKEN,
      body: {
        userName: "demoauto",
        password: "demoauto",
      },
      failOnStatusCode: false,
    }).then(($response) => {
      expect($response.status).to.eq(404);
    });
  },
};

export const BookStore = {
  addBook() {
    cy.getCookie("token").then(($token) => {
      const token = $token.value;
      cy.getCookie("userID").then(($id) => {
        const userId = $id.value;
        cy.request({
          method: "POST",
          url: REQUEST_API_URL.ADD_BOOK,
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
  },
  addBookInvalidValue() {
    cy.getCookie("token").then(($token) => {
      const token = $token.value;

      cy.getCookie("userID").then(($id) => {
        const userId = $id.value;

        cy.request({
          method: "POST",
          url: REQUEST_API_URL.ADD_BOOK,
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
  },
  addBookNullValue() {
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
  },
  deleteBook() {
    cy.getCookie("token").then(($token) => {
      const token = $token.value;

      cy.getCookie("userID").then(($id) => {
        const userId = $id.value;

        cy.request({
          method: "DELETE",
          url: REQUEST_API_URL.DELETE_BOOK,
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
  },
  deleteBookInvalidIsbn() {
    cy.getCookie("token").then(($token) => {
      const token = $token.value;

      cy.getCookie("userID").then(($id) => {
        const userId = $id.value;

        cy.request({
          method: "DELETE",
          url: REQUEST_API_URL.DELETE_BOOK,
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
  },
  deleteBookNullIsbn() {
    cy.request({
      method: "DELETE",
      url: REQUEST_API_URL.DELETE_BOOK,
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
  },
  replaceBook() {
    cy.getCookie("token").then(($token) => {
      const token = $token.value;

      cy.getCookie("userID").then(($id) => {
        const userId = $id.value;

        cy.request({
          method: "PUT",
          url: `${REQUEST_API_URL.REPLACE_BOOK}/${book.ISBN}`,
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
  },
  replaceBookInvalidIsbn() {
    cy.getCookie("token").then(($token) => {
      const token = $token.value;

      cy.getCookie("userID").then(($id) => {
        const userId = $id.value;

        cy.request({
          method: "PUT",
          url: `${REQUEST_API_URL.REPLACE_BOOK}/${book.ISBN}`,
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
  },
  replaceBookUnauthorize() {
    cy.request({
      method: "PUT",
      url: `${REQUEST_API_URL.REPLACE_BOOK}/${book.ISBN}`,
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
  },
};
