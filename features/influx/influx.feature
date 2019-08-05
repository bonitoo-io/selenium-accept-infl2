Feature: Influx common
  Click through the controls common to all influx pages

  Scenario: Open home page
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When open page "HOME" for user "DEFAULT"
    Then influx page is loaded

  Scenario: Hover home item
    Then the home submenu items are "hidden"
    When hover over the "home" menu item
    Then the home submenu items are "visible"
    When click nav sub menu "Create Organization"
    When open page "HOME" for user "DEFAULT"



