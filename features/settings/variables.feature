Feature: Settings - Variables
  As a user I want to Read Create Update and Delete Variables
  So that I can eventually reuse them in alerts and dashboards in Influxdbv2

  Scenario: Open Variables Tab
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When hover over the "Settings" menu item
    When click nav sub menu "Variables"
    Then the variables Tab is loaded

  Scenario: Exercise Import Variable Popup
    When click create variable dropdown in header
    When click "import" variable dropdown item
    Then the import variable popup is loaded
    Then dismiss the popup
    Then popup is not loaded
    When click create variable dropdown empty
    When click "import" variable dropdown item
    Then the import variable popup is loaded
    Then dismiss the popup
    Then popup is not loaded

  Scenario: Exercise Create Variable Popup
    When click create variable dropdown in header
    When click "new" variable dropdown item
    Then the create variable popup is loaded
    Then dismiss the popup
    Then popup is not loaded
    
