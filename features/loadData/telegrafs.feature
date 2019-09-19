Feature: Load Data - Telegrafs

Scenario: Load Initial Telegraf tab
  Given I reset the environment
  Given run setup over REST "DEFAULT"
  When API sign in user "DEFAULT"
  When API create a bucket named "Duchamp" for user "DEFAULT"
  When open the signin page
  When UI sign in user "DEFAULT"
  When hover over the "loadData" menu item
  When click nav sub menu "Telegraf"
  Then the telegrafs tab is loaded

Scenario: Exercise create Telegraf wizard
  When click the create Telegraf button empty
  Then the Create Telegraf Wizard is loaded
  When dismiss the Create Telegraf Wizard
  Then the Create Telegraf Wizard is no longer present
  When click the create Telegraf button in header
  # Select bucket
  # Select System tile
  # Continue
  # Verify next panel -- including plugins list
  # Dismiss from second panel
  # cycle through each plugin and verify plugins list and previous button




# todo - exercise telegraf wizard here
# N.B. can verify telegrafs at endpoint http://localhost:9999/api/v2/telegrafs
