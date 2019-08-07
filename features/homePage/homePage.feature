Feature: Home Page

  Scenario: logout home page
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When open page "HOME" for user "DEFAULT"
    When click logout from the home page
    Then the sign in page is loaded
    When UI sign in user "DEFAULT"
    Then the home page is loaded

  Scenario: Click Data Collector Panel
    When I click the panel "Data Collector"
    Then the Telegraf Tab is loaded

  Scenario: Click Dashboards Panel
    When hover over the "home" menu item
    When click nav menu item "home"
    When I click the panel "Dashboard"
    Then the Dashboards page is loaded

  Scenario: Click Explorer Panel
    When hover over the "home" menu item
    When click nav menu item "home"
    When I click the panel "Explorer"
    Then the Data Explorer page is loaded


