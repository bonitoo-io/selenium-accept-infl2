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
  Then the create Telegraf plugin sidebar "cpu" item is in state "success"
  Then the create Telegraf plugin sidebar "mem" item is in state "success"
  When dismiss the Create Telegraf Wizard
  Then the Create Telegraf Wizard is no longer present
  When click the create Telegraf button empty

Scenario Outline: Edit Plugin Values
  When click the plugin tile "<PLUGIN>" in the Create Telegraf Wizard
  When click the Popup Wizard continue button
  Then the create Telegraf Wizard second step is loaded
  Then the create Telegraf plugins sidebar contains "<PLUGIN>"
  Then the create Telegraf plugin sidebar "<PLUGIN>" item is in state "neutral"
  When click the create Telegraf plugin sidebar "<PLUGIN>" item
  Then the create Telegraf edit plugin "<PLUGIN>" step is loaded
  When click the Popup Wizard done button
  Then the create Telegraf plugin sidebar "<PLUGIN>" item is in state "error"
  When click the create Telegraf plugin sidebar "<PLUGIN>" item
  When enter the values <FAKE_VALUES> into the fields <FIELDS>
  Then verify the edit plugin error notification with message "<ERRMSGS>"
  When clear the create Telegraf edit plugin fields <FIELDS>
  When enter the values <TRUE_VALUES> into the fields <FIELDS>
  When click the Popup Wizard done button
  Then the create Telegraf plugin sidebar "<PLUGIN>" item is in state "success"
  When click the wizard previous button
  Then the Create Telegraf Wizard is loaded
  Then the Create Telegraf wizard plugin tile "<PLUGIN>" is selected
  When click the plugin tile "<PLUGIN>" in the Create Telegraf Wizard
  Then the Create Telegraf wizard plugin tile "<PLUGIN>" is not selected
  Then the popup wizard continue button is disabled

  Examples:
  | PLUGIN     | FAKE_VALUES | FIELDS           | ERRMSGS               | TRUE_VALUES |
  | Docker     | SKIP        | endpoint         | SKIP                 | http://localhost:10080 |
  | Kubernetes | ASDF        | url              | Must be a valid URI. | http://localhost:10080 |
  | NGINX      | ASDF        | urls             | NONE                 | http://localhost:10080 |
  | Redis      | SKIP,SKIP   | servers,password | SKIP                 | tcp://localhost:6379,wumpus |

Scenario: Cleanup from Edit Plugin Values
  When dismiss the Create Telegraf Wizard

#N.B. just add UI artifacts - no need to check backend at this point
Scenario Outline: Create Telegraf
  When click the create Telegraf button in header
  When click the select bucket dropdown in the Create Telegraf Wizard
  When click the bucket item "<BUCKET>" in the Create Telegraf Wizard
  When click the plugin tile "<PLUGIN>" in the Create Telegraf Wizard
  When click the Popup Wizard continue button
  When enter the name "<NAME>" in the Create Telegraf Wizard
  When enter the description "<DESCR>" in the Create Telegraf Wizard
  When click the Popup Wizard continue button
  Then the success notification contains "<SUCCESS_MSG>"
  Then the success notification contains "Your configurations have been saved"
  When close all notifications
  Then the create Telegraf Wizard final step is loaded
  When click the Create Telegraf Wizard finish button
  # Verify listing
  Then there is a telegraf card for "<NAME>"
  Then the bucket of the telegraf card "<NAME>" is "<BUCKET>"

  Examples:
    | PLUGIN     | BUCKET  | NAME      | DESCR        | SUCCESS_MSG |
    | System     | DEFAULT |Strakonice | Lorem ipsum  | Successfully created dashboards for telegraf plugin: system. |
    | Docker     | Duchamp |Decin      | Lorem ipsum  | SKIP |
    | Kubernetes | DEFAULT |Kladno     | Lorem ipsum  | SKIP |
    | NGINX      | Duchamp |Nyburk     | Lorem ipsum  | SKIP |
    | Redis      | DEFAULT |Rakovnik   | Lorem ipsum  | SKIP |



  # cycle through each plugin and verify plugins list and previous button
  # Check plugin configuration page
  # e.g. Then the create Telegraf edit plugin "Docker" step is loaded




# todo - exercise telegraf wizard here
# N.B. can verify telegrafs at endpoint http://localhost:9999/api/v2/telegrafs
