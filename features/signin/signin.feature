Feature: Signin
  Use and abuse the signin page

  Scenario: Basic Signin
    Given run setup over REST "DEFAULT"
    When open the signin page
    Then the heading contains "InfluxData"
    Then the version shown contains "DEFAULT"
    Then the credits are valid
    When enter the username "DEFAULT"
    When enter the password "DEFAULT"
    When click the signin button
    Then the home page is loaded

   Scenario Outline: Signin Bad Credentials
     Given run setup over REST "DEFAULT"
     When open the signin page
     When enter the username "<USERNAME>"
     When enter the password "<PASSWORD>"
     When click the signin button
     Then the error notification contains "<MESSAGE>"

     Examples:
     | USERNAME | PASSWORD | MESSAGE |
     | wumpus   | DEFAULT  |  Login failed: username or password is invalid |
     | DEFAULT  | wuumpuus |  Login failed: username or password is invalid |


     # N.B. TODO - consider Security scenarios - Brute force password, injection attack
