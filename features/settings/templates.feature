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



  Scenario: Import User Template
    When API sign in user "DEFAULT"
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"level", "start": "-30d", "algo": "hydro", "prec": "sec"}
    """
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"level", "start": "-30d", "algo": "sine", "prec": "sec"}
    """
    When click user templates
    When click empty state import template button
