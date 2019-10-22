Feature: Settings - Templates
  As a user I want to Read Create Update and Delete Templatess
  So that I can eventually use them to create dashboards in Influxdbv2

  Scenario: Open Templates Tab
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When hover over the "Settings" menu item
    When click nav sub menu "Templates"
    Then the templates Tab is loaded
    Then the templates are sorted as:
    """
    Apache Data,Docker,Getting Started with Flux,GitHub Data,InfluxDB 2.0 OSS Metrics,JMeter,Kubernetes,Nginx,Redis,System
    """
    When API sign in user "DEFAULT"
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"level", "start": "-30d", "algo": "hydro", "prec": "sec"}
    """
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"beat", "start": "-30d", "algo": "sine", "prec": "sec"}
    """


  Scenario: Exercise Import Template Popup
    When click user templates
    When click empty state import template button
    Then the import template popup is loaded
    Then the Import JSON as template button is disabled
    When dismiss the popup
    Then popup is not loaded
    When click header import template button
    Then click the import template paste button
    Then the Import Template file upload area is not present
    Then the Import Template paste JSON text area is present
    When enter into the Impprt Template paste JSON text area:
    """
    {}
    """
    Then the Import JSON as template button is enabled
    When click the import template upload button
    Then the Import JSON as template button is disabled
    Then the Import Template file upload area is present
    Then the Import Template paste JSON text area is not present
    When dismiss the popup
    Then popup is not loaded

# TODO add variables to templates

  Scenario Outline: Import User Template File Upload
    When click user templates
    When click header import template button
    When upload the template file "<FILEPATH>"
    When click popup submit button
    Then popup is not loaded
    Then the success notification contains "Successfully imported template."
    When close all notifications
    # sometimes page is stuck in cache
    When force page refresh
    When wait "10" seconds
    Then a REST template document for user "DEFAULT" titled "<TITLE>" exists
    # Following step is work around for issue 15514
    When click user templates
    Then there is a template card named "<TITLE>"

    Examples:
    |TITLE|FILEPATH|
    |Hydro test dashboard-Template|etc/test-data/hydro-test-template.json|
    |Note Dashboard-Template|etc/test-data/note-dboard-template.json|

  Scenario Outline: Import User Template as JSON
    When click header import template button
    Then click the import template paste button
    When paste contents of "<FILEPATH>" to template textarea
    When click popup submit button
    Then popup is not loaded
    Then the success notification contains "Successfully imported template."
    When close all notifications
    # sometimes page is stuck in cache
    When force page refresh
    When wait "10" seconds
    Then a REST template document for user "DEFAULT" titled "<TITLE>" exists
    # Following step is work around for issue 15514
    When click user templates
    Then there is a template card named "<TITLE>"

    Examples:
    |TITLE|FILEPATH|
    |Sinusoid test data-Template|etc/test-data/sine-test-template.json|
    |Notepad-Template|etc/test-data/notepad-test-template.json|

  Scenario: Import Bad Template File
    When click user templates
    When click header import template button
    When upload the template file "etc/test-data/bad-template.json"
    When click popup submit button
    Then popup is not loaded
    Then the error notification contains "Failed to import template: Error: Request failed with status code 400"
    When close all notifications
