export const PracticeFormPage = {
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
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#userEmail").clear().type(email);
    const validGender = cy
      .get("label[for='gender-radio-2']")
      .should("have.text", `${gender}`);
    validGender.click();
    cy.get("#userNumber").clear().type(phoneNumber);
    cy.get("#dateOfBirthInput").click().invoke("val", "").type(dob);
    cy.get("body").click(0, 0);
    cy.get("#subjectsInput").type(`${subject}{enter}`);
    const validHobbie = cy
      .get("label[for='hobbies-checkbox-1']")
      .should("have.text", `${hobbies}`);
    validHobbie.click();
    cy.get("#uploadPicture").selectFile(picture);
    cy.get("#currentAddress").type(currentAddress);
    cy.get("#state").click().type(`${state} {enter}`);
    cy.get("#city").click().type(`${city} {enter}`);
    cy.get("#submit").click({ force: true });
    cy.get("#example-modal-sizes-title-lg").should(
      "have.text",
      "Thanks for submitting the form"
    );
  },
};
