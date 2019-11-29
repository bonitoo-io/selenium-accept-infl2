Feature: Dashboards - Dashboard - Base
  As a user I want to Read Create Update and Delete a Dashboard
  So that I can view specific Influxdbv2 data

  Scenario: Load Initial Dashboard view
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When hover over the "Dashboards" menu item
    When click nav sub menu "Dashboards"
    Then the Dashboards page is loaded
    When API sign in user "DEFAULT"
    When API create a label "Cesko" described as "Pravda vitezi" with color "#AAFFAA" for user "DEFAULT"
    When API create a label "Mesto" described as "Matka mest" with color "#FFAAAA" for user "DEFAULT"
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"level", "start": "-30d", "algo": "hydro", "prec": "sec", "name": "foo"}
    """
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"beat", "start": "-30d", "algo": "sine", "prec": "sec", "name": "bar"}
    """
    When click the empty Create dashboard dropdown button
    When click the create dashboard item "New Dashboard"
    Then the new dashboard page is loaded
    Then the empty dashboard contains a documentation link
    Then the empty dashboard contains Add a Cell button
    When name dashboard "про́бный прибо́ров"

  Scenario: Exercise Dashboard Dropdowns
    When click dashboard time locale dropdown
    Then the active dashboard dropdown contains items:
    """
    Local,UTC
    """
    When click dashboard refresh dropdown
    Then the active dashboard dropdown contains dividers:
    """
    Refresh
    """
    Then the active dashboard dropdown contains items:
    """
    Paused,5s,10s,15s,30s,60s
    """
    When click dashboard time range dropdown
    Then the active dashboard dropdown contains dividers:
    """
    Time Range
    """
    Then the active dashboard dropdown contains items:
    """
    Custom Time Range,Past 5m,Past 15m,Past 1h,Past 6h,Past 12h,Past 24h,Past 2d,Past 7d,Past 30d
    """

  Scenario: Create Cell
    When click the empty create cell button
    Then the cell edit overlay is loaded
    When name dashboard cell "вре́менный"
    When click dashboard cell edit cancel button
    Then there is no dashboard cell named "вре́менный"
    When click the empty create cell button
    Then the cell edit overlay is loaded
    When name dashboard cell "вре́менный"
    When click dashboard cell save button
    Then the dashboard contains a cell named "вре́менный"
    #EXPERIM BELOW
    When get metrics of cell named "вре́менный"


  Scenario: Add Note to Cell
    When toggle context menu of dashboard cell named "вре́менный"
    When click cell content popover add note
    Then the edit note popup is loaded
    Then dismiss the popup
    Then popup is not loaded
    When toggle context menu of dashboard cell named "вре́менный"
    When click cell content popover add note
    Then click popup cancel simple button
    Then popup is not loaded
    When toggle context menu of dashboard cell named "вре́менный"
    When click cell content popover add note
    When enter the cell note popup CodeMirror text:
  """
В департаменте… но лучше не называть в каком департаменте.
  """
    #TODO - code mirror gymnastics


  #Scenario: Move cell
  # When Pending

  #Scenario: Resize Cell
  #  When PENDING

  #Scenario: Clone Cell
  #  When PENDING

  #Scenario: Rename Cell
  #  When PENDING

  #Scenario: Delete Cell
  #  When PENDING



