Feature: Onboard to Influxdbv2
  Create an initial user and organization

  Scenario: Onboard Basic
# TODO - verify notifications when loading the home page
    Given I open the Influx onboarding page
    Then there is a Welcome message
    Then there is a link to corporate
    When I click on Get Started
    Then the Initial Setup Page is loaded
    When enter a new user name "DEFAULT"
    When enter a new password "DEFAULT"
    When enter confirm the new password "DEFAULT"
    When enter enter a new organization name "DEFAULT"
    When enter a new bucket name "DEFAULT"
    When click next from setup page
    Then verify ready page
    Then the success notification says "Initial user details have been successfully set"
    When click quick start button
    Then the success notification says "The Local Metrics Dashboard has been created"
    Then the success notification contains "The InfluxDB Scraper has been configured"
    When close all notifications
    Then the home page is loaded

  Scenario: Onboard Advanced

    Given I open the Influx onboarding page
    Then there is a Welcome message
    Then there is a link to corporate
    When I click on Get Started
    Then the Initial Setup Page is loaded
    When enter a new user name "DEFAULT"
    When enter a new password "DEFAULT"
    When enter confirm the new password "DEFAULT"
    When enter enter a new organization name "DEFAULT"
    When enter a new bucket name "DEFAULT"
    When click next from setup page
    Then verify ready page
    Then the success notification says "Initial user details have been successfully set"
    When close all notifications
    When click advanced button
    Then the buckets tab is loaded

  Scenario: Onboard field checks






