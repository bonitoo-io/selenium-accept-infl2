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
    Then the cell edit overlay is loaded as "Name this Cell"
    When name dashboard cell "вре́менный"
    When click dashboard cell edit cancel button
    Then there is no dashboard cell named "вре́менный"
    When click the empty create cell button
    Then the cell edit overlay is loaded as "Name this Cell"
    When name dashboard cell "вре́менный"
    When click dashboard cell save button
    Then the dashboard contains a cell named "вре́менный"

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
  __Шинель__\n
  _Гоголь_\n
В департаменте… но лучше не называть в каком департаменте...
  """
    Then the cell note popup Markdown preview panel contains
  """
В департаменте… но лучше не называть в каком департаменте...
  """
    When click the cell note popup save button
    Then popup is not loaded
    Then the cell named "вре́менный" has a note indicator
    When click the note indicator of the "вре́менный" cell
    Then the cell note popover contains:
  """
В департаменте… но лучше не называть в каком департаменте...
  """
    When click the cell title "вре́менный"
    Then the cell note popover is not loaded
    When toggle context menu of dashboard cell named "вре́менный"
    Then the cell content popover has item edit note
    When click the cell title "вре́менный"
    Then the cell content popover is not loaded

  Scenario: Edit Cell Note
    When toggle context menu of dashboard cell named "вре́менный"
    When click cell content popover add note
    Then the edit note popup is loaded
    Then the cell note popup Code Mirror text contains:
  """
  В департаменте… но лучше не называть в каком департаменте...
  """
    Then the cell note popup Code Mirror text contains:
  """
  _Гоголь_
  """
    Then the cell note popup Code Mirror text contains:
  """
  __Шинель__
  """
    Then the cell note popup Markdown preview panel contains
  """
В департаменте… но лучше не называть в каком департаменте...
  """
    When clear the cell note popup Code Mirror text
    Then the cell note popup markup preview panel has no text
    When enter the cell note popup CodeMirror text:
  """
  __LE MANTEAU__\n
  _Nikolaï Gogol_\n
Dans une administration russe... mieux vaut ne pas dire le nom de cette administration ...
  """
    Then the cell note popup Markdown preview panel contains
  """
Dans une administration russe... mieux vaut ne pas dire le nom de cette administration ...
  """
    When click the cell note popup save button
    Then popup is not loaded
    When click the note indicator of the "вре́менный" cell
    Then the cell note popover contains:
  """
Dans une administration russe... mieux vaut ne pas dire le nom de cette administration ...
  """
    When click the cell title "вре́менный"
    Then the cell content popover is not loaded

  Scenario: Move cell
    When get metrics of cell named "вре́менный"
    When move the cell named "вре́менный" by "{ "dx": "+400", "dy": "+200" }"
    # Y is 0 below because of float to top feature - cells float to top row when repositioned
    Then the location of the cell named "вре́менный" is changed by "{ "dx": "+400", "dy": "0" }"
    When get metrics of cell named "вре́менный"
    When move the cell named "вре́менный" by "{ "dx": "-400", "dy": "+200" }"
    Then the location of the cell named "вре́менный" is changed by "{ "dx": "-400", "dy": "0" }"
    When get metrics of cell named "вре́менный"
    When move the cell named "вре́менный" by "{ "dx": "0", "dy": "+200" }"
    Then the location of the cell named "вре́менный" is changed by "{ "dx": "0", "dy": "0" }"

  Scenario: Edit Cell - Simple
    Then the cell named "вре́менный" contains the empty graph message
    When toggle context menu of dashboard cell named "вре́менный"
    When click cell content popover configure
    Then the cell edit overlay is loaded as "вре́менный"
    When get the current cell edit preview graph
    When click the cell edit Time Range Dropdown
    When select the cell edit Time Range "30d"
    When click the cell edit Script Editor button
    When paste into cell edit Script Editor
  """
  from(bucket: "qa")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._measurement == "foo")
  |> filter(fn: (r) => r._field == "level")
  """
    When click the cell edit submit button
    Then the cell edit preview graph is shown
    Then the cell edit preview graph is changed
    When click the cell edit save button
    When click the dashboard Time Range Dropdown
    When select dashboard Time Range "30d"
    Then the cell named "вре́менный" contains a graph

  #Scenario: Edit Cell
  # Add cell data

  #Scenario: Resize Cell
  #  When PENDING

  #Scenario: Zoom Cell horizontal
  # When PENDING

  #Scenario: Unzoom Cell
  # When PENDING

  # Scenario: Zoom Cell vertical
  # When PENDING

  #Scenario: Clone Cell
  #  When PENDING

  #Scenario: Rename Cell
  #  When PENDING

  #Scenario: Delete Cell
  #  When PENDING

  #Scenario: Arrange cells (4)
     # Include note
     # All in Row
     # Slide top Right and lower jumps up to top row




