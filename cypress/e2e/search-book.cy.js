describe("Search book with multiple results", () => {
  it("Search book with multiple results successfully", () => {
    cy.visit('books')
    cy.log("Search book is searched with Lower case");
    cy.xpath('//input[@id="searchBox"]').clear().type("design");
    cy.log("Verify that all books match with input criteria will be displayed");
    cy.xpath('//a[text()="Learning JavaScript Design Patterns"]').should(
        "have.text",
        "Learning JavaScript Design Patterns"
      );
      cy.xpath('//a[text()="Designing Evolvable Web APIs with ASP.NET"]').should(
        "have.text",
        "Designing Evolvable Web APIs with ASP.NET"
      );
    cy.log("Search book is searched with Upper case");
    cy.xpath('//input[@id="searchBox"]').clear().type("Design");
    cy.log("Verify the search result is displayed correctly with input criteria");
    cy.xpath('//a[text()="Learning JavaScript Design Patterns"]').should(
      "have.text",
      "Learning JavaScript Design Patterns"
    );
    cy.xpath('//a[text()="Designing Evolvable Web APIs with ASP.NET"]').should(
      "have.text",
      "Designing Evolvable Web APIs with ASP.NET"
    );
  });
});
