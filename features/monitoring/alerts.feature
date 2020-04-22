@feature-monitoring
@monitoring-alerts
Feature: Monitoring - Alerts - Base
  As a user I want to setup alerts
  So that I can be notified of important changes in the data

Scenario: Load Initial Alerts view
  Given I reset the environment
  Given run setup over REST "DEFAULT"
  When open the signin page
  When UI sign in user "DEFAULT"
  When click nav menu item "Alerting"
  #When hover over the "alerting" menu item
  #When click nav sub menu "Monitoring & Alerting"
  Then the Alerting page is loaded
  When API sign in user "DEFAULT"
  When start live data generator
  # It seems 5s is the quickest we can use stably given default values in create check controls
  # Tried 1s, but need to use agg function like mean so the checks do not seem to match
  """
  { "pulse": 5000, "model": "count10" }
  """
  When wait "10" seconds

  Scenario: Exercise Initial Alerts view Controls
  Then the notification rules create dropdown is disabled
  When click alerting tab "checks"
  When click the create check button
  Then the create check dropodown list contains the items
  """
  threshold,deadman
  """
  When click the create check button
  Then the create check dropdown list is not visible
  When hover the create check question mark
  Then the create check tooltip is visible
  When hover the alerts page title
  Then the create check tooltip is not visible
  When click alerting tab "endpoints"
  When hover the create endpoint question mark
  Then the create endpoint tooltip is visible
  When hover the alerts page title
  Then the create endpoint tooltip is not visible
  When click alerting tab "rules"
  When hover the create rule question mark
  Then the create rules tooltip is visible
  When hover the alerts page title
  Then the create rules tooltip is not visible
  When click alerting tab "endpoints"
  When click create endpoint button
  Then the create endpoint popup is loaded
  When dismiss the popup
  Then popup is not loaded
  When click alerting tab "checks"
  When click the first time create threshold check
  Then the edit check overlay is loaded
  When dismiss edit check overlay
  Then the edit check overlay is not loaded
  When click the first time create deadman check
  Then the edit check overlay is loaded
  When dismiss edit check overlay
  Then the edit check overlay is not loaded

# Create and start endpoint listener for notification checks - maybe move to separate endpoints test suite

# Exercise Configure Check -- N.B. try and reuse dashboard time machine for Define Query
# TODO - Check illogical alert thresholds
# TODO - add simple tags check

  Scenario: Exercise Configure Check - Threshold
    When click the create check button
    When click the create check dropdown item "Threshold"
  # Query Builder steps cover same library as in dashboards - TODO - check for gaps
  # For now cover just configure check step
    When click check editor configure check button
    Then the configure check view is loaded
    Then the create check checklist contains:
  """
  [{ "state": "error", "text": "One field" },
  { "state": "valid", "text": "One aggregate function" },
  { "state": "error", "text": "One or more thresholds"}]
  """
    Then the check interval hint dropdown list is not visible
    When click on check interval input
    Then the check interval hint dropdown list includes
  """
  5s,15s,1m,6h,24h,30d
  """
    When click the interval hint dropdown list item "5m"
    Then the check interval hint dropdown list is not visible
    Then the interval indicator is set to "5m"
    Then the check offset hint dropdown list is not visible
    When click the check offset interval input
    Then the check offset hint dropdown list includes
  """
  0s,5s,1m,1h,12h,2d
  """
    When click the offset hint dropdown list item "1m"
    Then the check offset hint dropdown list is not visible
    Then the offset input is set to "1m"
    When update the check message template to
  """
  Kapela z Varsavy
  """
    Then the check message tempate contains
  """
  Kapela z Varsavy
  """
    When click add threshold condition "CRIT"
    When click the threshold definition dropdown for condition "CRIT"
  # TODO - after issue 17729 is resolved - should be equal criteria e.g. n == 0
    Then the threshold definition dropdown for "CRIT" contain items:
  """
  is above,is below,is inside range,is outside range
  """
    When click the threshold definition dropodown item "Is Inside Range" for condition "CRIT"
    Then there is a binary boundary for the threshold "CRIT" with values "20" and "100"
  # N.B. currently cannot easily set negatve values - TODO use negative values once #17782 is resolved
  # N.B. TODO - check dimensions of inputs - currently in smaller views they are unreadable #17783
    When set the binary boundary for the threshold "CRIT" from "0" to "1000"
    Then there is a binary boundary for the threshold "CRIT" with values "0" and "1000"
    When click add threshold condition "WARN"
    When click the threshold definition dropdown for condition "WARN"
    When click the threshold definition dropodown item "Is Below" for condition "WARN"
    When set the unary boundary value for the threshold definition "WARN" to "0"
    Then there is a unary boundary for the threshhold "WARN" with the value "0"
    When dismiss edit check overlay
    Then the first time create threshold check is visible
    Then the first time create deadman check is visible

  Scenario: Exercise configure check Deadman
  # Just check Deadman fields others were covered in threshold test
    When click the create check button
    When click the create check dropdown item "Deadman"
    When click check editor configure check button
    Then the create check checklist contains:
  """
  [{ "state": "error", "text": "One field" }]
  """
    When click the deadman definition No Values For input
    Then the deadman definition hints dropdown contains:
  """
  15s,5m,1h,12h,7d
  """
    When click the deadman definition hint dropdown item "1m"
    Then the deadman definition No Values For input contains "1m"
    When set the value of the deadman definition No Values for input to "30m"
    When click the deadman definition level dropdown
    Then the deadman definition level dropdown contains:
  """
  CRIT,WARN,INFO,OK
  """
    When click the deadman definition level dropdown item "WARN"
    Then the deadman definition level dropdown selected item is "WARN"
    When click the deadman definition Stop Checking input
    Then the deadman definition stop hints dropdown contains:
  """
  5s,1m,1h,24h,7d,30d
  """
    When click the deadman definition stop hint dropdown item "5m"
    Then the deadman definition stop input contains "5m"
    When set the value of the definition stop input to "10m"
    Then the deadman definition stop input contains "10m"
    When dismiss edit check overlay
    Then the first time create threshold check is visible
    Then the first time create deadman check is visible

# Create Threshold Alerts
  Scenario: Create Simple Threshold Check
    When click the first time create threshold check
    Then the create check checklist contains:
  """
  [{ "state": "error", "text": "One field" },
  { "state": "valid", "text": "One aggregate function" },
  { "state": "error", "text": "One or more thresholds"}]
  """
    Then the save check button is disabled
    When enter the alert check name "Simple Count Check"
    When send keys "ENTER"
    When click the tag "test" in builder card "1"
    When click the tag "val" in builder card "2"
    When click the query builder function "mean"
    Then the create check checklist contains:
  """
  [{ "state": "valid", "text": "One field" },
  { "state": "valid", "text": "One aggregate function" },
  { "state": "error", "text": "One or more thresholds"}]
  """
    Then the save check button is disabled
    When click the time machine query builder function duration input
    When click the query builder function duration suggestion "5s"
    When click the time machine cell edit submit button
    Then the time machine cell edit preview graph is shown
    When click check editor configure check button
    Then the interval indicator is set to "5s"
    Then the time machine cell edit preview graph is shown
    When enter into interval offset "1s"
    When send keys "ENTER"
    When update the check message template to
  """
${ r._check_name } is: ${ r._level } value was ${string(v: r.val)}
  """
    When click add threshold condition "CRIT"
    When click the threshold definition dropdown for condition "CRIT"
    When click the threshold definition dropodown item "Is Above" for condition "CRIT"
    When set the unary boundary value for the threshold definition "CRIT" to "7.5"
    Then the create check checklist is not present
    Then the save check button is enabled
    Then the time machine cell edit preview contains threshold markers:
    """
    CRIT
    """
    When click the check editor save button
    Then there is an alert card named "Simple Count Check"

    # Create Deadman Alerts
  Scenario: Create simple Critical Deadman Check
  # Just check Deadman fields others were covered in threshold test
    When click the create check button
    When click the create check dropdown item "Deadman"
    When enter the alert check name "Deadman Critical Check"
    When click the tag "test" in builder card "1"
    When click the tag "val" in builder card "2"
    When click the time machine cell edit submit button
    Then the time machine cell edit preview graph is shown
    When click check editor configure check button
    When set the check interval input to "10s"
    When set the check offset interval input "2s"
    When click the edit check add tag button
    When set the check tag key of tag "1" to "mrtvola"
    When set the check tag value of tag "1" to "neboztik"
    When click the edit check add tag button
    When set the check tag key of tag "2" to "kartoffel"
    When set the check tag value of tag "2" to "brambor"
    When update the check message template to
  """
${ r._check_name } is: ${ r._level } value [${string(v: r.val)}] has stopped reporting
  """
    When set the value of the deadman definition No Values for input to "30s"
    When set the value of the definition stop input to "1m"
    When click the check editor save button
    Then there is an alert card named "Deadman Critical Check"

# TODO - Add asserts above

# TODO - EDIT Threshold Check and drag threshold control in graph

# Add labels to checks


# Filter Checks

# Edit Checks

# Create Endpoints {HTTP, Slack, Pager Duty}

# Add labels to Endpoints

# Filter Endpoints

# Edit Endppints

# Create Rules

# Add labels to Rules

# Filter Rules

# Edit Rules

# Delete Checks (N.B. what is affect on dependent rules?)

# Delete Endpoints (N.B. what is affect on dependent rules?)

# Delete Rules

# Tear down data generator - In After All hook - needs to be torn down after failure as well as success

# Tear down http listened - In After All hook - ditto



