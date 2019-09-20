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
  When click the select bucket dropdown in the Create Telegraf Wizard
  When click the bucket item "DEFAULT" in the Create Telegraf Wizard
  When click the plugin tile "System" in the Create Telegraf Wizard
  When click the Popup Wizard continue button
  Then the create Telegraf Wizard second step is loaded
  Then the create Telegraf plugins sidebar contains "cpu,disk,diskio,mem,net,processes,swap,system"
  Then the create Telegraf plugin sidebar "system" item is in state "success"
  When dismiss the Create Telegraf Wizard
  Then the Create Telegraf Wizard is no longer present
  When click the create Telegraf button empty
  When click the plugin tile "Docker" in the Create Telegraf Wizard
  When click the Popup Wizard continue button
  Then the create Telegraf Wizard second step is loaded
  Then the create Telegraf plugins sidebar contains "Docker"
  Then the create Telegraf plugin sidebar "Docker" item is in state "neutral"
  When click the create Telegraf plugin sidebar "Docker" item
  Then the create Telegraf edit plugin "Docker" step is loaded
  When click the Popup Wizard done button
  Then the create Telegraf plugin sidebar "Docker" item is in state "error"
  When click the wizard previous button
  Then the Create Telegraf Wizard is loaded
  Then the Create Telegraf wizard plugin tile "Docker" is selected
  When click the plugin tile "Docker" in the Create Telegraf Wizard
  Then the Create Telegraf wizard plugin tile "Docker" is not selected
  Then the popup wizard continue button is disabled
  # cycle through each plugin and verify plugins list and previous button
  # Check plugin configuration page
  # e.g. Then the create Telegraf edit plugin "Docker" step is loaded




# todo - exercise telegraf wizard here
# N.B. can verify telegrafs at endpoint http://localhost:9999/api/v2/telegrafs
