const Ajv = require("ajv");
import { SchemaUser } from "../../support/schemas/userGET";
describe("Testing api authenticate", () => {
  const user = {
    userName: Cypress.env("bookStoreUser").userName,
    password: Cypress.env("bookStoreUser").password,
  };
  let token;
  const ajv = new Ajv();
  const schemaUser = SchemaUser;
  beforeEach(() => {
    cy.authenticate(user);
  });
  describe("Successful Tests", () => {
    it("Generate token after login successfully", () => {
      cy.request({
        method: "POST",
        url: `${Cypress.config("baseUrl")}Account/v1/GenerateToken`,
        body: {
          userName: user.userName,
          password: user.password,
        },
      }).then(($response) => {
        expect($response.status).to.eq(200);
        expect($response.body.token).to.exist;
        expect($response.body.status).to.eq("Success");
        token = $response.body.token;
      });
    });
    it("Authorized successfully", () => {
      cy.log(token);
      cy.request({
        method: "POST",
        url: `${Cypress.config("baseUrl")}Account/v1/Authorized`,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          userName: user.userName,
          password: user.password,
        },
      }).then(($response) => {
        expect($response.status).to.eq(200);
        expect($response.body).to.eq(true);
      });
    });
    it("Get detail user", () => {
      cy.getCookie("userID").then(($id) => {
        const userId = $id.value;

        cy.request({
          method: "GET",
          url: `${Cypress.config("baseUrl")}Account/v1/User/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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

  describe("Failure Test", () => {
    it("Generate token with invalid input", () => {
      cy.request({
        method: "POST",
        url: `${Cypress.config("baseUrl")}Account/v1/GenerateToken`,
        body: {
          userName: "demoauto",
          password: "demoauto",
        },
      }).then(($response) => {
        expect($response.body.status).to.eq("Failed");
        expect($response.body.result).to.eq("User authorization failed.");
      });
    });

    it("Generate Token with null authorization", () => {
      cy.request({
        method: "POST",
        url: `${Cypress.config("baseUrl")}Account/v1/GenerateToken`,
        body: {
          userName: null,
          password: null,
        },
        failOnStatusCode: false,
      }).then(($response) => {
        expect($response.status).to.eq(400);
      });
    });

    it("Generate Token with bad request method", () => {
      cy.request({
        method: "PATCH",
        url: `${Cypress.config("baseUrl")}Account/v1/GenerateToken`,
        body: {
          userName: user.username,
          password: user.password,
        },
        failOnStatusCode: false,
      }).then(($response) => {
        expect($response.status).to.eq(404);
      });
    });
  });
});
