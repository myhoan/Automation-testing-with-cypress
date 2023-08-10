Feature: Register student form successfully

    @registration_form_all_field @smoke
    Scenario: Register student form successfully with all fields
        Given The user is on the Registration Student Form
        When The user input valid data as below with all fields
            | firstName | lastName | email              | gender | phoneNumber | dob         | subject | hobbies | picture    | currentAddress                     | state | city  |
            | Hoan      | Dinh     | Hoandinh@gmail.com | Female | 0903678910  | 14 May,2000 | Maths   | Sports  | avatar.jpg | 357 St. Hoang Sa, Ho Chi Minh City | NCR   | Delhi |
        And The user clicks submit button
        Then Student form should be created successfully
        And All information of the student is shown correctly
            | firstName | lastName | email              | gender | phoneNumber | dob         | subject | hobbies | picture    | currentAddress                     | state | city  |
            | Hoan      | Dinh     | Hoandinh@gmail.com | Female | 0903678910  | 14 May,2000 | Maths   | Sports  | avatar.jpg | 357 St. Hoang Sa, Ho Chi Minh City | NCR   | Delhi |

    @registration_form_mandatory_field @smoke
    Scenario: Register student form successfully with mandatory fields
        Given The user is on the Registration Student Form
        When The user input valid data as below with mandatory fields
            | firstName | lastName | email              | gender | phoneNumber | dob         | subject | hobbies | picture | currentAddress | state | city |
            | Hoan      | Dinh     | Hoandinh@gmail.com | Female | 0903678910  | 14 May,2000 |         |         |         |                |       |      |
        And The user clicks submit button
        Then Student form should be created successfully
        And Mandatory information of the student is shown correctly
            | firstName | lastName | email              | gender | phoneNumber | dob         | subject | hobbies | picture | currentAddress | state | city |
            | Hoan      | Dinh     | Hoandinh@gmail.com | Female | 0903678910  | 14 May,2000 |         |         |         |                |       |      |
