let data;
before(() => {
  cy.fixture("sampleData.json").then((item) => {
    return (data = item.variableLocator);
  });
});
export class LoginPage {
  loginToTheApplication(userName, password) {
    cy.get(data.txtUserName).clear().type(userName);
    cy.get(data.txtPassword).clear().type(password);
    cy.get(data.btnLogin).click();
    cy.contains(userName);
  }
  verifyAlertMessageForInvalidCredantial() {
    cy.get(data.txtName).should("have.text", "Invalid username or password!");
  }
}
