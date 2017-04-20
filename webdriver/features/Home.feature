Feature: Home Page
    Home Page should load correctly in all conditions

Background:
    Given I open the url "/"
    Given I load the dataset "typical"
    Given The application is working correctly

Scenario: Check that the home page loads correctly
    Then I expect that the title is "Sample Application"
    And I expect that element "#title" contains the text "Sample Application"

Scenario: Check that the home page contains the sample companies
    Then I expect that element "body" contains the text "Concur Technologies"
    And I expect that element "body" contains the text "Microsoft Corporation"
    And I expect that element "body" contains the text "University of Washington"

Scenario: Check that the user gets a friendly error message if there are problems with the API call
    Given The application exhibits the "organizations_api_returns_error" behavior
    Given I open the url "/"
    Then I wait on element "#error" for 1000ms to contain a text