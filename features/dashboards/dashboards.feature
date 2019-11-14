Feature: Dashboards - Base
  As a user I want to Read Create Update and Delete Dashboards
  So that I can organize my data in Influxdbv2

  Scenario: Load dashboards page
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When hover over the "Dashboards" menu item
    When click nav sub menu "Dashboards"
    Then the Dashboards page is loaded
    When API sign in user "DEFAULT"
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"level", "start": "-30d", "algo": "hydro", "prec": "sec"}
    """
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"beat", "start": "-30d", "algo": "sine", "prec": "sec"}
    """


  Scenario: Create new dashboard
    When click the empty Create dashboard dropdown button
    Then the empty create dashboard dropdown list contains
    """
  New Dashboard,Import Dashboard,From a Template
    """
    When click the create dashboard item "New Dashboard"
    Then the new dashboard page is loaded
    When hover over the "Dashboards" menu item
    When click nav sub menu "Dashboards"
    Then the empty Create dashboard dropdown button is not present
    Then there is a dashboard card named "Name this Dashboard"

  Scenario: Rename dashboard from card
    When hover over dashboard card named "Name this Dashboard"
    Then the export button for the dashboard card "Name this Dashboard" is visible
    Then the clone button for the dashboard card "Name this Dashboard" is visible
    Then the delete button for the dashboard card "Name this Dashboard" is visible
    When hover over dashboard card name "Name this Dashboard"
    When click the edit dashboard card name button for "Name this Dashboard"


