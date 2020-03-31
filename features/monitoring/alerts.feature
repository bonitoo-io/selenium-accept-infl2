Feature: Monitoring - Alerts - Base
  As a user I want to setup alerts
  So that I can be notified of important changes in the data

Scenario: Load Initial Alerts view
  Given I reset the environment
  Given run setup over REST "DEFAULT"
  When open the signin page
  When UI sign in user "DEFAULT"
  When hover over the "alerting" menu item
  When click nav sub menu "Monitoring & Alerting"
  Then the Alerting page is loaded

Scenario: Exercise Initial Alerts view Controls
  Then the notification rules create dropdown is disabled
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
  When hover the create endpoint question mark
  Then the create endpoint tooltip is visible
  When hover the alerts page title
  Then the create endpoint tooltip is not visible
  When hover the create rule question mark
  Then the create rules tooltip is visible
  When hover the alerts page title
  Then the create rules tooltip is not visible


# Create and start generating data --  keep it simple

# Create and start endpoint listener for notification checks

# Create Threshold Alerts

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

# Tear down data generator - In After hook - needs to be torn down after failure as well as success

# Tear down http listened - In After hook - ditto



