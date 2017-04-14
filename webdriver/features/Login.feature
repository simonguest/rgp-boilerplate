Feature: Login Page
    Login Page should prompt for Facebook credentials

Background:
    Given I open the url "/admin"

Scenario: Check that the login page prompts for Facebook credentials
    Then I expect that the title is "Log into Facebook | Facebook"