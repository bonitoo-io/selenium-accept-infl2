Feature: Load Data Base
  As a user I want to open the Load Data page
  So that I can explore how data is being loaded into Influxdbv2

  # TODO - tokens are now under Load Data menu item

  Scenario: Verify Tabs
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When open page "load-data" for user "DEFAULT"
    When click the settings tab "Buckets"
    Then the buckets tab is loaded
    When click the settings tab "Telegrafs"
    Then the Telegraf Tab is loaded
    When click the settings tab "Scrapers"
    Then the Scrapers Tab is loaded
