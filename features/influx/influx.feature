Feature: Influx common
  Click through the controls common to all influx pages

  Scenario: Open home page
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When open page "HOME" for user "DEFAULT"
    Then influx page is loaded
    Then the header contains the org name "DEFAULT"

  Scenario: Hover home item
    Then the home submenu items are "hidden"
    When hover over the "home" menu item
    Then the home submenu items are "visible"
    When click nav sub menu "Create Organization"
    Then the Create Organization form is loaded
    When open page "HOME" for user "DEFAULT"
    When hover over the "home" menu item
    When click nav sub menu "Logout"
    Then the sign in page is loaded
    When UI sign in user "DEFAULT"

  Scenario: Hover Data Explorer
    Then the menu item text "Data Explorer" is "hidden"
    When hover over the "explorer" menu item
    Then the menu item text "Data Explorer" is "visible"
    When click nav sub menu "Data Explorer"
    Then the Data Explorer page is loaded

   Scenario: Hover Dashboards
     Then the menu item text "Dashboards" is "hidden"
     When hover over the "dashboards" menu item
     Then the menu item text "Dashboards" is "visible"
     When click nav sub menu "Dashboards"
     Then the Dashboards page is loaded

  Scenario: Hover Tasks
    Then the menu item text "Tasks" is "hidden"
    When hover over the "tasks" menu item
    Then the menu item text "Tasks" is "visible"
    When click nav sub menu "Tasks"
    Then the Tasks page is loaded

