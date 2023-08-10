@add_book
Feature: Add book to collection
  As a user, I can add a specific book into my collection page
  Scenario: Add book to collection succcessully
    Given There is a book named "<bookName>"
    And The user is on the Book Store Page "<bookStoreUrl>"
    When The user login into the Book Store Page with "<userName>" and "<password>"
    Then The user can input and choose book name "<bookName>" to add a book
    And A book is added into the user collection page succcessully

    Examples:
      | bookStoreUrl | bookName         | userName    | password  |
      | books        | Git Pocket Guide | hoandinh123 | 12345Aa!@ |

