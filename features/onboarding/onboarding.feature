Feature: Onboard to Influxdbv2
  Create an initial user and organization

  Scenario: Onboard Basic
# Golden path check 1
    Given I reset the environment
    Given I open the Influx onboarding page
    Then there is a Welcome message
    Then there is a link to corporate
    When I click on Get Started
    Then the Initial Setup Page is loaded
    When enter a new user name "DEFAULT"
    When enter a new password "DEFAULT"
    When enter confirm the new password "DEFAULT"
    When enter a new organization name "DEFAULT"
    When enter a new bucket name "DEFAULT"
    When click next from setup page
    Then verify ready page
    Then the success notification says "Initial user details have been successfully set"
    When click quick start button
    Then the success notification contains "Metrics Dashboard has been created"
    Then the success notification contains "The InfluxDB Scraper has been configured"
    When close all notifications
    Then the home page is loaded

  Scenario: Onboard Advanced
# Golden path check 2
    Given I reset the environment
    Given I open the Influx onboarding page
    Then there is a Welcome message
    Then there is a link to corporate
    When I click on Get Started
    Then the Initial Setup Page is loaded
    When enter a new user name "DEFAULT"
    When enter a new password "DEFAULT"
    When enter confirm the new password "DEFAULT"
    When enter a new organization name "DEFAULT"
    When enter a new bucket name "DEFAULT"
    When click next from setup page
    Then verify ready page
    Then the success notification says "Initial user details have been successfully set"
    When close all notifications
    When click advanced button
    Then the buckets tab is loaded

  Scenario: Onboard field checks
# N.B. would expect there to be rules for min/max length or allowed/disallowed characters in user-names
# however none currently exist -- TODO add tests for such rules if they are ever implemented
    # TODO - setup breadcrumb color change on password length less than 8 chars
    Given I reset the environment
    Given I open the Influx onboarding page
    Then there is a Welcome message
    Then there is a link to corporate
    When I click on Get Started
    Then the Initial Setup Page is loaded
    Then the continue button is disabled
    When enter a new user name "zaphod"
    When enter a new password "42"
    When enter confirm the new password "24"
    Then the form error message says "Passwords do not match"
    When enter confirm the new password "42"
    Then the form error message is not present
    When enter a new organization name "asdf"
    When enter a new bucket name "asdf"
    When click next from setup page without page check
    Then the error notification contains "passwords must be at least 8 characters long"

