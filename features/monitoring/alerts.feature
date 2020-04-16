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
  When dismiss edit chck overlay
  Then the edit check overlay is not loaded
  When click the first time create deadman check
  Then the edit check overlay is loaded
  When dismiss edit chck overlay
  Then the edit check overlay is not loaded

# Create and start endpoint listener for notification checks - maybe move to separate endpoints test suite

# Exercise Configure Check -- N.B. try and reuse dashboard time machine for Define Query
# Check illogical alert thresholds


# Create Threshold Alerts
  Scenario: Create Simple Threshold Check
    When click the first time create threshold check
    When enter the alert check name "Simple Count Check"
    When send keys "ENTER"
    When click the tag "test" in builder card "1"
    When click the tag "val" in builder card "2"
    When click the query builder function "mean"
    When click the time machine query builder function duration input
    When click the query builder function duration suggestion "5s"
    When click the time machine cell edit submit button
    When click check editor configure check button
    Then the interval indicator is set to "5s"
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
    When click the check editor save button

# TODO - Add asserts

# TODO - EDIT Threshold Check and drag threshold control in graph


# Create Deadman Alerts

# Filter alerts

# Edit Alerts

# Create Endpoints {HTTP, Slack, Pager Duty}

# Filter Endpoints

# Edit Endppints

# Create Rules

# Filter Rules

# Edit Rules

# Delete Alerts (N.B. what is affect on dependent rules?)

# Delete Endpoints (N.B. what is affect on dependent rules?)

# Delete Rules

# Tear down data generator - In After All hook - needs to be torn down after failure as well as success

# Tear down http listened - In After All hook - ditto



