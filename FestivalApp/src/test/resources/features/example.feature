Feature: Manage DJs

  Scenario: Create a new DJ
    Given a DJ with valid details and a file
    When the admin submits the details and the file
    Then the DJ is created successfully
    And the response status is 201 CREATED