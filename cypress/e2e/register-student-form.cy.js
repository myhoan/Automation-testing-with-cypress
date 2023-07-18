const AVATAR = "cypress/fixtures/avatar.jpg";

describe('Register student form successfully', () => {
  it('Register student form successfully with all fields', () => {
    cy.visit('automation-practice-form')
    cy.get('#firstName').type('Hoan')
    cy.get('#lastName').type('Dinh')
    cy.get('#userEmail').type('Hoandinh@gmail.com')
    cy.xpath('//label[text()="Female"]').click()
    cy.get('#userNumber').type('0903678910')
    cy.get("#dateOfBirthInput").click().invoke("val", "").type("14 May 2000")
    cy.get('body').click(0, 0)
    cy.get('#subjectsContainer').type('Maths{enter}')
    cy.xpath('//label[text()="Sports"]').click()
    cy.xpath('//label[text()="Music"]').click()
    cy.get('#uploadPicture').selectFile(AVATAR);
    cy.get('#currentAddress').type('357 St. Hoang Sa, Ho Chi Minh City')
    cy.get("#state").click().type("NCR {enter}");
    cy.get("#city").click().type("Delhi {enter}");
    cy.get('#submit').click({force:true})
    cy.log('Verify that register with all fields successfully')
    cy.get('#example-modal-sizes-title-lg').should('have.text','Thanks for submitting the form')
    // cy.xpath('//table[@class="table table-dark table-striped table-bordered table-hover"]/tbody').should('have.text','Hoan DinhHoandinh@gmail.comFemale090367891014 May, 2000MathsSportMusicavatar.jpg357 St. Hoang Sa, Ho Chi Minh CityNCR Delhi')
    // cy.xpath('//table[@class="table table-dark table-striped table-bordered table-hover"]//td[2]/text()').should('have.text','Hoan Dinh Hoandinh@gmail.com Female 0903678910 14 May, 2000 Maths Sport Music avatar.jpg 357 St. Hoang Sa, Ho Chi Minh City NCR Delhi')
  })

  it('Register student form successfully with mandatory fields', () => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.get('#firstName').type('Hoan')
    cy.get('#lastName').type('Dinh')
    cy.xpath('//label[text()="Female"]').click()
    cy.get('#userNumber').type('0903678910')
    cy.get('#submit').click({force:true})
    cy.log('Verify that register with mandatory fields successfully')
    cy.get('#example-modal-sizes-title-lg').should('have.text','Thanks for submitting the form')
  })
})
