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
#  | Trvala | Never | N.B. triggers issue 14903 - skip for now
  | Mesicni | 28 Days  |
  | Tydenni |  7 Days  |
  # fudging with hours and days due to issue 14905
  | Denni | 1 Days  |
  | Puldenni | 12 Hours |
  | Hodinova  | 1 Hours |
  | Oprava    | 1 Days  |

#Scenario: Modifify Retention Policy
#  Given pending

#Scenario: Filter Buckets
#  Given pending

#Scenario: Clear Filter
#  Given pending

#Scenario: Sort Buckets by Name
#  Given pending

#Scenario: Sort Buckets by Retention Policy
#  Given pending

#Scenario Outline: Delete Buckets
#  Given pending

#Examples:
#  | Name |
#  | Trvala |
#  | Mesicni |
#  | Tydenni |
#  | Denni |
#  | Puldenni |
#  | Hodinova  |
#  | Oprava    |

#Scenario: Add Line Protocol Data to Default
#  Given pending

#Scenario: Add Scraper to Default
#  Given pending

#Scenario: Add Telegraf to Default
#  Given pending


