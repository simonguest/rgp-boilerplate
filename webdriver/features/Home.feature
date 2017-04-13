Feature: Home Page
    Home Page should load with the title set correctly

Background:
    Given I open the url "/"

Scenario: Check that the home page loads correctly
    Then I expect that the title is "Sample Application"
    Then I expect that element "#title" contains the text "Sample Application"

Scenario: Check that the home page contains the sample company data
    Then I expect that element "body" contains the text "Concur Technologies"
    And I expect that element "body" contains the text "Microsoft Corporation"
    And I expect that element "body" contains the text "University of Washington"