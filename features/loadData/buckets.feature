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

Scenario: Open and Close Create Bucket Dialog
  When click the Create Bucket button
  Then the Create Bucket Popup is loaded
  Then the Create button of Create Bucket Popup is disabled
  When dismiss the Create Bucket Popup
  Then the Create Bucket Popup is not present
  When click the Create Bucket button
  Then the Create Bucket Popup is loaded
  Then the Create button of Create Bucket Popup is disabled
  When cancel the Create Bucket Popup
  Then the Create Bucket Popup is not present

#Scenario Outline: Create Buckets with Retention Policies
#  Given pending

#Examples:
#  |NAME| RETENTION |
#  | Trvala | Never |
#  | Mesicni | 28 Days  |
#  | Tydenni |  7 Days  |
#  | Denni | 1 Day  |
#  | Puldenni | 12 Hours |
#  | Hodinova  | 1 Hour |
#  | Oprava    | 1 Day  |

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


