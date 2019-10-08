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
    When click the Import Variable popup paste JSON button
    Then the Import Variable JSON textarea is visible
    Then the Import JSON as variable button is enabled
    When click the Import Variable popup Upload File button
    Then the Import Variable JSON textarea is not visible
    Then the Import JSON as variable button is not enabled
    Then the Import JSON file upload area is present
    Then dismiss the popup
    Then popup is not loaded

  Scenario: Exercise Create Variable Popup
    When click create variable dropdown in header
    When click "new" variable dropdown item
    Then the create variable popup is loaded
    Then dismiss the popup
    Then popup is not loaded
    When click create variable dropdown empty
    When click "new" variable dropdown item
    Then the create variable popup is loaded
    Then the create variable popup selected type is "Query"
    Then the create variable popup create button is disabled
    Then the create variable popup script editor is visible
    When click the create variable popup type dropdown
    When click the create variable popup type dropdown item "Map"
    Then the create variable popup selected type is "Map"
    Then the create variable popup create button is disabled
    Then the create variable popup script editor is not visible
    Then the create variable popup textarea is visible
    Then the create variable popup default value dropdown is visible
    Then the create variable popup info line contains "0" items
    When click the create variable popup type dropdown
    When click the create variable popup type dropdown item "constant"
    Then the create variable popup selected type is "CSV"
    Then the create variable popup create button is disabled
    Then the create variable popup script editor is not visible
    Then the create variable popup textarea is visible
    Then the create variable popup default value dropdown is visible
    Then the create variable popup info line contains "0" items
    When click the create variable popup type dropdown
    When click the create variable popup type dropdown item "Query"
    Then the create variable popup selected type is "Query"
    Then the create variable popup create button is disabled
    Then the create variable popup script editor is visible
    Then the create variable popup textarea is not visible
    Then the create variable popup default value dropdown is not visible
    Then the create variable popup info line is not visible
    Then dismiss the popup
    Then popup is not loaded

