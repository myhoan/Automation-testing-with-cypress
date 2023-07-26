import { PracticeFormPage } from "../page-objects/form/practice-form-page";

describe("Register student form successfully", () => {
  let data;
  beforeEach(() => {
    cy.visit("automation-practice-form");
    cy.fixture("sampleData").then((item) => {
      return (data = item);
    });
  });
  it("Register student form successfully with all fields", () => {
    cy.visit("automation-practice-form");
    const {
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
      city,
    } = data.studentForm;
    const practiceFormPage = new PracticeFormPage();
    practiceFormPage.registerStudent(
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
    );
    const specificPicture = picture.split("/").pop();
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]/tbody'
    ).should(
      "have.text",
      `Student Name${firstName} ${lastName}Student Email${email}Gender${gender}Mobile${phoneNumber}Date of Birth${dob}Subjects${subject}Hobbies${hobbies}Picture${specificPicture}Address${currentAddress}State and City${state} ${city}`
    );
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]//td[2]/text()'
    ).should(
      "have.text",
      `${firstName} ${lastName}${email}${gender}${phoneNumber}${dob}${subject}${hobbies}${specificPicture}${currentAddress}${state} ${city}`
    );
  });
  it("Register student form successfully with mandatory fields", () => {
    const { firstName, lastName, gender, phoneNumber, dob } = data.studentForm;
    cy.visit("https://demoqa.com/automation-practice-form");
    const practiceFormPage = new PracticeFormPage();
    practiceFormPage.registerStudentMadatoryField(
      firstName,
      lastName,
      gender,
      phoneNumber,
      dob
    );
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]/tbody'
    ).should(
      "have.text",
      `Student Name${firstName} ${lastName}Student EmailGender${gender}Mobile${phoneNumber}Date of Birth${dob}SubjectsHobbiesPictureAddressState and City`
    );
    cy.xpath(
      '//table[@class="table table-dark table-striped table-bordered table-hover"]//td[2]/text()'
    ).should(
      "have.text",
      `${firstName} ${lastName}${gender}${phoneNumber}${dob}`
    );
  });
});
