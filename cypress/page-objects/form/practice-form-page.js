let data;
before(() => {
  cy.fixture("sampleData.json").then((item) => {
    return (data = item.variableLocator.registerField);
  });
});
export class PracticeFormPage {
  registerStudent(
    firstName,
    lastName,
    email,
    gender,
    phoneNumber,
    dob,
    subject,
    hobbies,
    picture,
    currentAddress,
    state,
    city
  ) {
    cy.get(data.txtFirstName).type(firstName);
    cy.get(data.txtLastName).type(lastName);
    cy.get(data.txtEmail).clear().type(email);
    const validGender = cy.get(data.lblGender).should("have.text", `${gender}`);
    validGender.click();
    cy.get(data.txtPhoneNumber).clear().type(phoneNumber);
    cy.get(data.dtpDob).click().invoke("val", "").type(dob);
    cy.get("body").click(0, 0);
    cy.get(data.txtSubject).type(`${subject}{enter}`);
    const validHobbie = cy
      .get(data.lblHobbies)
      .should("have.text", `${hobbies}`);
    validHobbie.click();
    cy.get(data.filPicture).selectFile(picture);
    cy.get(data.txtCurrentAddress).type(currentAddress);
    cy.get(data.sctState).click().type(`${state} {enter}`);
    cy.get(data.sctCity).click().type(`${city} {enter}`);
    cy.get(data.btnSubmit).click({ force: true });
    cy.get(data.modalMessageRegister).should(
      "have.text",
      "Thanks for submitting the form"
    );
  }
  registerStudentMadatoryField(firstName, lastName, gender, phoneNumber, dob) {
    cy.get(data.txtFirstName).type(firstName);
    cy.get(data.txtLastName).type(lastName);
    const validGender = cy.get(data.lblGender).should("have.text", `${gender}`);
    validGender.click();
    cy.get(data.txtPhoneNumber).clear().type(phoneNumber);
    cy.get(data.dtpDob).click().invoke("val", "").type(dob);
    cy.get(data.btnSubmit).click({ force: true });
    cy.get(data.modalMessageRegister).should(
      "have.text",
      "Thanks for submitting the form"
    );
  }
}
