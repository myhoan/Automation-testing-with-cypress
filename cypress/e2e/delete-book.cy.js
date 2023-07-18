describe("Delete book", () => {
  it("Delete book successfully", () => {
    cy.visit("login");
    cy.get("#userName").type("hoandinh123");
    cy.get("#password").type("12345Aa!@");
    cy.get("#login").click();
    cy.get("#userName-value").should("have.text", "hoandinh123");
    cy.xpath('//span[text()="Profile"]').click();
    cy.xpath('//input[@id="searchBox"]').type("Speaking JavaScript");
    cy.xpath('//span[@id="basic-addon2"]').click();
    cy.xpath('//span[@id="delete-record-undefined"]').click();
    cy.xpath('//button[@id="closeSmallModal-ok"]').click();
    cy.on("window:form", (value) => {
      expect(value).to.equal("OK");
    });
    cy.log('Delete book successfully')
    cy.get(".rt-noData").should("have.text", "No rows found");
  });
});
