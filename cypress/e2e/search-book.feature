@search_book
Feature: Search book with multiple results

  As a user, I can search a specific book in the book page
  Scenario: Search book with multiple results successfully
    Given There are books named "Learning JavaScript Design Patterns" and "Designing Evolvable Web APIs with ASP.NET"
    And The user is on the Book Store Page "<bookStoreUrl>"
    When The user input book name "<bookName>"
    Then All books match with the search results criteria will be displayed

    Examples:
      | bookStoreUrl | bookName |
      | books        | Design   |
      | books        | design   |


