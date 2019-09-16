Feature: Scrapers
  As a user I want to Read Create Update and Delete Scrapers
  So that I can manage the stores used with Influxdbv2
# Move exercise create scraper popup here
# N.B. can verify scrapers at endpoint http://localhost:9999/api/v2/scrapers


Scenario: Load Initial Scrapers tab
  Given I reset the environment
  Given run setup over REST "DEFAULT"
  When API sign in user "DEFAULT"
  When API create a bucket named "Duchamp" for user "DEFAULT"
  When open the signin page
  When UI sign in user "DEFAULT"
  When hover over the "loadData" menu item
  When click nav sub menu "Scrapers"
  Then the scrapers tab is loaded

Scenario: Exercise create Scraper popup
  When click the create scraper button empty
  Then the Create Scraper popup is loaded
  When dismiss the Create Scraper popup
  Then the Create Scraper popup is no longer present
  When click the create scraper button from the header
  Then the Create Scraper popup is loaded
  When cancel the Create Scraper popup
  Then the Create Scraper popup is no longer present
  When click the create scraper button empty
  Then the Create Scraper popup is loaded
  When clear the Scraper Popup name input
  Then the form element error message is "Name cannot be empty"
  Then a form input error icon is shown
  Then the Create Scrapper popup create button is disabled
  When enter the name "Mumford" into the Create Scraper popup name input
  Then the form element error message is not shown
  Then no form input error icon is shown
  Then the Create Scrapper popup create button is enabled
  When click the Create Scrapper buckets dropdown
  Then an item for the bucket "DEFAULT" is an item in the buckets dropdown
  Then an item for the bucket "Duchamp" is an item in the buckets dropdown
  When click the Create Scrapper buckets dropdown
  Then NO items in the buckets dropdown are shown
  When clear Scraper Popup the Target Url input
  Then the form element error message is "Target URL cannot be empty"
  Then a form input error icon is shown
  Then the Create Scrapper popup create button is disabled
  When enter the value "http://localhost:9999/metrics" into the Create Scraper popup url input
  Then the form element error message is not shown
  Then no form input error icon is shown
  Then the Create Scrapper popup create button is enabled
  When dismiss the Create Scraper popup
  Then the Create Scraper popup is no longer present

Scenario Outline: Create Scrapers
  When click the create scraper button from the header
  When clear the Scraper Popup name input
  When enter the name "<NAME>" into the Create Scraper popup name input
  When click the Create Scrapper buckets dropdown
  When select the Scrapper buckets dropdown item "<BUCKET>"
  When enter the value "<ENDPOINT>" into the Create Scraper popup url input
  When click the create scraper create button
  Then the success notification contains "Scraper was created successfully"
  When close all notifications
  Then the create scraper button empty is no longer present
  Then there is a scraper card for "<NAME>"

  Examples:
  | NAME | ENDPOINT | BUCKET |
  | Melnik | http://localhost:9999/metrics | DEFAULT |
  | Morlaix | http://localhost:9999/metrics | Duchamp |
  | Brno | http://localhost:10018/bogus | DEFAULT |
  | Brest | http://localhost:10018/bogus | Duchamp |

#Scenario: Filter Scrapers

#Scenario: Sort Scrapers by Name

#Scenario: Sort Scrapers by URL

#Scenario: Sort Scrapers by Bucket



