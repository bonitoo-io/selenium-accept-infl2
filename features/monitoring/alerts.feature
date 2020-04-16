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


# Create and start generating data --  keep it simple

# Create and start endpoint listener for notification checks

# Exercise Configure Check -- N.B. try and reuse dashboard time machine for Define Query

# Create Threshold Alerts

# Check illogical alert thresholds

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



