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

