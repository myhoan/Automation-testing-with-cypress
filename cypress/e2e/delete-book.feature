@delete_book
Feature: Delete book
  As a user, I can delete a specific book in the my collection page
  Scenario: Delete book successfully
    Given There is a book named "<bookName>"
    And The user is on the Profile Page "<profilePageUrl>"
    When The user login into the Profile Page with "<userName>" and "<password>"
    Then The user can input book name "<bookName>" to delete a book
    And A book is deleted from the user collection page succcessully

    Examples:
      | profilePageUrl | bookName         | userName    | password  |
      | profile        | Git Pocket Guide | hoandinh123 | 12345Aa!@ |

