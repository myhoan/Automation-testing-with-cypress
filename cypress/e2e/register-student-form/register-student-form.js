import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

let data;
Before(() => {
  cy.fixture("sampleData").then((item) => {
    return (data = item.variableLocator.registerField);
  });
});
Given("The user is on the Registration Student Form", () => {
  cy.visit("automation-practice-form");
});

When("The user input valid data as below with all fields", (dataTable) => {
  dataTable.hashes().forEach((ele) => {
    cy.get(data.txtFirstName).type(ele.firstName);
    cy.get(data.txtLastName).type(ele.lastName);
    cy.get(data.txtEmail).clear().type(ele.email);
    const validGender = cy
      .get(data.lblGender)
      .should("have.text", `${ele.gender}`);
    validGender.click();
    cy.get(data.txtPhoneNumber).clear().type(ele.phoneNumber);
    cy.get(data.dtpDob).click().invoke("val", "").type(ele.dob);
    cy.get("body").click(0, 0);
    cy.get(data.txtSubject).type(`${ele.subject}{enter}`);
    const validHobbie = cy
      .get(data.lblHobbies)
      .should("have.text", `${ele.hobbies}`);
    validHobbie.click();

    if (ele.picture != "") {
      cy.get(data.filPicture).selectFile("cypress/fixtures/" + ele.picture);
    }
    if (ele.currentAddress != "") {
      cy.get(data.txtCurrentAddress).type(ele.currentAddress);
    }
    cy.get(data.sctState).click().type(`${ele.state} {enter}`);
    cy.get(data.sctCity).click().type(`${ele.city} {enter}`);
  });
});
When("The user clicks submit button", () => {
  cy.get(data.btnSubmit).click({ force: true });
});

Then("Student form should be created successfully", () => {
  cy.get(data.modalMessageRegister).should(
    "have.text",
    "Thanks for submitting the form"
  );
});
Then("All information of the student is shown correctly", (dataTable) => {
  dataTable.hashes().forEach((ele) => {
    const specificPicture = ele.picture.split("/").pop();
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]/tbody'
    ).should(
      "have.text",
      `Student Name${ele.firstName} ${ele.lastName}Student Email${ele.email}Gender${ele.gender}Mobile${ele.phoneNumber}Date of Birth${ele.dob}Subjects${ele.subject}Hobbies${ele.hobbies}Picture${specificPicture}Address${ele.currentAddress}State and City${ele.state} ${ele.city}`
    );
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]//td[2]/text()'
    ).should(
      "have.text",
      `${ele.firstName} ${ele.lastName}${ele.email}${ele.gender}${ele.phoneNumber}${ele.dob}${ele.subject}${ele.hobbies}${specificPicture}${ele.currentAddress}${ele.state} ${ele.city}`
    );
  });
});

When(
  "The user input valid data as below with mandatory fields",
  (dataTable) => {
    dataTable.hashes().forEach((ele) => {
      cy.get(data.txtFirstName).type(ele.firstName);
      cy.get(data.txtLastName).type(ele.lastName);
      const validGender = cy
        .get(data.lblGender)
        .should("have.text", `${ele.gender}`);
      validGender.click();
      cy.get(data.txtPhoneNumber).clear().type(ele.phoneNumber);
      cy.get(data.dtpDob).click().invoke("val", "").type(ele.dob);
    });
  }
);

Then("Mandatory information of the student is shown correctly", (dataTable) => {
  dataTable.hashes().forEach((ele) => {
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]/tbody'
    ).should(
      "have.text",
      `Student Name${ele.firstName} ${ele.lastName}Student EmailGender${ele.gender}Mobile${ele.phoneNumber}Date of Birth${ele.dob}SubjectsHobbiesPictureAddressState and City`
    );
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]//td[2]/text()'
    ).should(
      "have.text",
      `${ele.firstName} ${ele.lastName}${ele.gender}${ele.phoneNumber}${ele.dob}`
    );
  });
});
