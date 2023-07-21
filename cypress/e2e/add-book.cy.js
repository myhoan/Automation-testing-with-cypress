describe("Add book to collection", () => {
  it("Add book to collection succcessully", () => {
    cy.visit("login");
    cy.get("#userName").type("hoandinh123");
    cy.get("#password").type("12345Aa!@");
    cy.get("#login").click();
    cy.get("#userName-value").should("have.text", "hoandinh123");
    cy.xpath('//span[text()="Book Store"]').click();
    cy.xpath('//a[text()="Speaking JavaScript"]').click();
    cy.xpath(
      '//button[@id="addNewRecordButton" and text()="Add To Your Collection"]'
    ).click({ force: true });
    cy.on("window:form", (txt) => {
      expect(txt).to.contains("Book added to your collection.");
      expect(txt).to.equal("OK");
    });
    cy.xpath('//span[text()="Profile"]').click();
    cy.log("Verify that add book to collection successfully");
    cy.xpath('//a[text()="Speaking JavaScript"]').should(
      "have.text",
      "Speaking JavaScript"
    );
  });
});
