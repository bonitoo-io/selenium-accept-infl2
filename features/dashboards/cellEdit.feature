Feature: Dashboards - Dashboard - Cell Edit
  As a user I want to Create and Update Cells
  So that I can view specific Influxdbv2 data

  Scenario: Load Cell Edit View
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
    { "points": 2880, "measurement":"pulse", "start": "-48h", "algo": "log", "prec": "sec", "name": "beat"}
    """
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 7200, "measurement":"signal", "start": "-30d", "algo": "sine", "prec": "sec", "name": "foo"}
    """
    When click the empty Create dashboard dropdown button
    When click the create dashboard item "New Dashboard"
    Then the new dashboard page is loaded
    Then the empty dashboard contains a documentation link
    Then the empty dashboard contains Add a Cell button
    When name dashboard "Fitness"

    # +page-title - edit name this cell # covered in dashboard test
    # +Graph dropdown
    # +cog-cell--button
    # +cancel-cell-edit--button
    # +save-cell--button # already covered in dashboard test
    # time-machine--view
       # +empty-graph--no-queries
       # +giraffe-autosizer
       # +raw-data-table
    # time-machine--bottom
       # +raw-data--toggle
       # +CSV download
       # +Refresh Rate
       # +Reload
       # +Time Range
       # +switch-to-script-editor
       # +Submit#
       # +Add Query
       # +Queries
          # +Builder
             # +Schema navigator
             # +Aggregate functions
          # +Script Editor
             # +Aggregate functions
             # +Variables

  Scenario: Exercise Basic Cell Edit Controls
    When click the empty create cell button
    Then the cell edit overlay is loaded as "Name this Cell"
    When name dashboard cell "Kliky"
    When click dashboard cell edit cancel button
    Then there is no dashboard cell named "Kliky"
    When click the empty create cell button
    Then the cell edit overlay is loaded as "Name this Cell"
    When name dashboard cell "Kliky"
    When click the dashboard cell view type dropdown
    Then the dashboard cell view type dropdown list contains:
  """
  xy,line-plus-single-stat,heatmap,histogram,single-stat,gauge,table,scatter
  """
    When click the dashboard cell view type dropdown
    Then the cell view type dropdown list is not present
    When click cell view customize button
    Then the view options container is present
    Then the cell view customize button is highlighted
    When click cell view customize button
    Then the view options container is not present
    Then the cell view customize button is not highlighted
    Then the time machine view empty graph is visible
    When click time machine autorefresh dropdown
    Then the time machine autorefresh dropdown list contains:
  """
  Paused,5s,10s,30s,60s
  """
    When select the time machine autorefresh rate "60s"
    Then the time machine force refresh button is not present
    When click time machine autorefresh dropdown
    When select the time machine autorefresh rate "Paused"
    Then the time machine force refresh button is present
    When click the cell edit Time Range Dropdown
    Then the time machine Time Range dropdown list contains:
  """
  Custom Time Range,Past 5m,Past 15m,Past 1h,Past 6h,Past 12h,Past 24h,Past 2d,Past 7d,Past 30d
  """
    When click the cell edit Time Range Dropdown
    Then the time machine Time Range dropdown list is not present
    Then the time machine query builder is visible
    When click the cell edit Script Editor button
    Then the time machine flux editor is visible
    When click the cell edit Query Builder button
    When click the time machine flux editor
    Then the time machine flux editor is visible
    Then the time machine switch to Query Builder warning is not present
    When click the cell edit Query Builder button
    When click the cell edit Query Builder confirm button
    Then the time machine query builder is visible
    Then the time machine switch to Query Builder warning is not present
    Then the time machine flux editor is not present


    #When click dashboard cell save button
    #Then the dashboard contains a cell named "вре́менный"
    # ~~page-title -- name edit
    # ~~Graph drop down
    # ~~cog-cell--button
    # cancel-cell-edit--button
    # save-cell-edit--button
    # ~~time-machine--view
       # ~~empty-graph--no-queries
    # time-machine--bottom
       # ~~Refresh Rate -- N.B. pause has update button which disappears with other refresh rate values
       # ~~Time Range
       # ~~switch-to-script-editor
       # ~~switch-to-query-builder

  #Scenario: Create basic query
    # time-machine--view
       # giraffe-autosizer
    # time-machine--bottom
          # Builder
             # Schema navigator
         # Submit#

  #Scenario: Resize Preview

  #Scenario: Create Second Query
    # Add Query
    # Queries
       # Schema navigator
       # Aggregate functions

  #Scenario: Delete Second Query

  #Scenario: Edit Query
    # time-machine--bottom
       # switch-to-script-editor
       # Queries
          # Script Editor

  #Scenario: Edit Query - Add functions
    # time-machine--bottom
       # switch-to-script-editor
       # Queries
          # Script Editor
             # Aggregate functions

  #Scenario: Edit Query - Add variables
    # time-machine--bottom
       # switch-to-script-editor
       # Queries
          # Script Editor
             # Variables


  #Scenario: Change time range
    # time-machine--bottom
       # Time Range

  #Scenario: Exercise Add functions - Query Builder
    # time-machine--bottom
        # Queries
            # Builder
              # +Aggregate functions

  #Scenario: View raw data

    # time-machine--bottom
         # raw-data--toggle
    # time-machine--view
        # raw-data-table

  #Scenario: Sort raw data

  #Scenario: Download results as CSV
       # CSV download

  #Scenario: Refresh Rates
       # Refresh Rate
       # Reload

  #Scenario: Short Cut keys
     # [CTRL + ENTER] -> Submit








