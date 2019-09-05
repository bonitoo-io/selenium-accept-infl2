Feature: Buckets
  As a user I want to Read Create Update and Delete Buckets
  So that I can manage the stores used with Influxdbv2


Scenario: List Initial Buckets
  Given I reset the environment
  Given run setup over REST "DEFAULT"
  When open the signin page
  When UI sign in user "DEFAULT"
  When hover over the "loadData" menu item
  When click nav sub menu "Buckets"
  Then the buckets tab is loaded
  Then the buckets are sorted as "_monitoring,_tasks,DEFAULT"

Scenario: Exercise Create Bucket Dialog
  When click the Create Bucket button
  Then the Create Bucket Popup is loaded
  Then the Create button of Create Bucket Popup is disabled
  Then the Retention Policy radio button "never" is active
  Then the Retention Policy intervals controls are not present
  When click the Retention Policy "intervals" button
  Then the Retention Policy radio button "intervals" is active
  Then the Retention Policy radio button "never" is inactive
  Then the Retention Policy intervals controls are present
  Then the Retention Policy warning message contains "Retention period must be at least an hour"
  When enter "61" into the Retention Policy "Seconds" control
  Then the Retention Policy "Seconds" control contains the value "1"
  Then the Retention Policy "Minutes" control contains the value "1"
  Then the Retention Policy warning message contains "Retention period must be at least an hour"
  When clear all Retention Policy interval controls
  When enter "123" into the Retention Policy "Minutes" control
  Then the Retention Policy "Minutes" control contains the value "3"
  Then the Retention Policy "Hours" control contains the value "2"
  Then the Retention Policy warning message has disappeared
  When clear all Retention Policy interval controls
  When enter "80" into the Retention Policy "Hours" control
  Then the Retention Policy "Hours" control contains the value "8"
  Then the Retention Policy "Days" control contains the value "3"
  When clear all Retention Policy interval controls
  When enter "7" into the Retention Policy "Days" control
  Then the Retention Policy "Days" control contains the value "7"
  When clear all Retention Policy interval controls
  When enter "ABCD" into the Retention Policy "Seconds" control
  Then the Retention Policy "Seconds" control contains the value "0"
  When enter "ABCD" into the Retention Policy "Minutes" control
  Then the Retention Policy "Minutes" control contains the value "0"
  When enter "ABCD" into the Retention Policy "Hours" control
  Then the Retention Policy "Hours" control contains the value "0"
  When enter "ABCD" into the Retention Policy "Days" control
  Then the Retention Policy "Days" control contains the value "0"
  When input the name of the bucket as "ABCD"
  Then the Retention Policy warning message contains "Retention period must be at least an hour"
  When click the Retention Policy "never" button
  Then the Retention Policy warning message has disappeared
  Then the Create button of Create Bucket Popup is enabled
  When dismiss the Create Bucket Popup
  Then the Create Bucket Popup is not present
  When click the Create Bucket button
  Then the Create Bucket Popup is loaded
  Then the Create button of Create Bucket Popup is disabled
  When cancel the Create Bucket Popup
  Then the Create Bucket Popup is not present

Scenario Outline: Create Buckets with Retention Policies
  When click the Create Bucket button
  When input the name of the bucket as "<NAME>"
  When set the retention policy of the bucket as "<RETENTION>"
  When click the Create Bucket popup Create button
  Then the bucket named "<NAME>" is in the list
  Then the bucket named "<NAME>" has a Retention Policy of "<RETENTION>"

Examples:
  |NAME| RETENTION |
#  | Trvalá | Never | N.B. triggers issue 14903 - skip for now
  | Měsíční | 28 Days  |
  | Týdenní |  7 Days  |
  # fudging with hours and days due to issue 14905
  | Denní | 1 Days  |
  | Půldenní | 12 Hours |
  | Hodinová  | 1 Hours |
  | Oprava    | 1 Days  |

Scenario: Modify Retention Policy
  When click on the bucket named "Oprava"
  Then the Edit Bucket popup is loaded
  Then the name edit textbox of the Edit Bucket popup is disabled
  Then the form help text contains "To rename the bucket use the rename button. Bucket renaming is not allowed here."
  When dismiss the Edit Bucket Popup
  Then the Edit Bucket Popup is not present
  When click on the bucket named "Oprava"
  Then the Edit Bucket popup is loaded
  When cancel the Edit Bucket Popup
  Then the Edit Bucket Popup is not present
  When click on the bucket named "Oprava"
  When set the retention policy of the bucket as "36 Hours"
  When click Edit Bucket Popup Save Changes
  # N.B. fix following once issue 14905 is resolved
  Then the bucket named "Oprava" has a Retention Policy of "1 Days 12 Hours"

Scenario: Filter Buckets
  When enter "denn" in the Buckets filter field
  Then the buckets are sorted as "Denní,Půldenní,Týdenní"
  Then the bucket "Oprava" is not in the list

Scenario: Clear Filter
  When clear the Buckets filter field
  Then the bucket named "Oprava" is in the list
  Then the bucket named "_monitoring" is in the list
  Then the bucket named "_tasks" is in the list
  Then the bucket named "Týdenní" is in the list

Scenario: Sort Buckets by Name
  Given ensure buckets name sort order "desc"
  Then the buckets are sorted as "_monitoring,_tasks,Denní,Hodinová,Měsíční,Oprava,Půldenní,DEFAULT,Týdenní"
  Given ensure buckets name sort order "asc"
  Then the buckets are sorted as "Týdenní,DEFAULT,Půldenní,Oprava,Měsíční,Hodinová,Denní,_tasks,_monitoring"
  Given ensure buckets name sort order "desc"
#  Given pending

#Scenario: Sort Buckets by Retention Policy
# implementation on hold for issue 14923
#  Given pending


Scenario Outline: Delete Buckets
  Then the delete button of the card named "<Name>" is not present
  When hover over bucket card named "<Name>"
  When click the delete button of the card named "<Name>"
  When click the confirm delete button of the card named "<Name>"
  Then the bucket card named "<Name>" is not in the list
#  Given pending

Examples:
  | Name |
#  | Trvalá | due to issue 14903 - skip for now
  | Měsíční |
  | Týdenní |
  | Denní |
  | Půldenní |
  | Hodinová  |
  | Oprava    |

#Scenario: Add Line Protocol Data to Default
#  Given pending

#Scenario: Add Scraper to Default
#  Given pending

#Scenario: Add Telegraf to Default
#  Given pending


