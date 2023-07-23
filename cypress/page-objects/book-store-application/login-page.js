export const LoginPage = {
  loginToTheApplication(userName, password) {
    cy.get("#userName").clear().type(userName);
    cy.get("#password").clear().type(password);
    cy.get("#login").click();
    cy.contains(userName);
  },
  verifyAlertMessageForInvalidCredantial() {
    cy.get("#name").should("have.text", "Invalid username or password!");
  },
};
