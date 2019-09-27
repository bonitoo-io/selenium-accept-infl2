Feature: Load Data - Tokens

  Scenario: Load Initial Tokens tab
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When API sign in user "DEFAULT"
    When API create a bucket named "Duchamp" for user "DEFAULT"
    When API create a bucket named "Courbet" for user "DEFAULT"
    When API create a bucket named "Corot" for user "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When hover over the "loadData" menu item
    When click nav sub menu "Tokens"
    Then the tokens tab is loaded
    Then the tokens list contains the token described as "admin's Token"

  Scenario: Exercise Create Read/Write token popup
    When click the generate token dropdown
    When click the generate token item "read-write"
    Then the generate read-write token popup is loaded
    When click the "Read" radio button "All Buckets"
    Then the "Read" panel shows the empty state text
    Then the bucket selector for the "Read" panel is not present
    When click the "Write" radio button "All Buckets"
    Then the "Write" panel shows the empty state text
    Then the bucket selector for the "Write" panel is not present
    When click the "Read" radio button "Scoped"
    Then the "Read" panel empty state text is not present
    Then the "Read" panel bucket selector is present
    When click the "Write" radio button "Scoped"
    Then the "Write" panel empty state text is not present
    Then the "Write" panel bucket selector is present
    Then the "Read" panel bucket list contains "DEFAULT,Corot,Courbet,Duchamp"
    Then the "Write" panel bucket list contains "DEFAULT,Corot,Courbet,Duchamp"
    When filter the "Read" panel bucket selector with "Co"
    Then the "Read" panel bucket list contains "Corot,Courbet"
    Then the "Read" panel bucket list does not contain "DEFAULT,Duchamp"
    When clear the "Read" panel bucket selector
    Then the "Read" panel bucket list contains "DEFAULT,Corot,Courbet,Duchamp"
    When filter the "Write" panel bucket selector with "Co"
    Then the "Write" panel bucket list contains "Corot,Courbet"
    Then the "Write" panel bucket list does not contain "DEFAULT,Duchamp"
    When clear the "Write" panel bucket selector
    Then the "Write" panel bucket list contains "DEFAULT,Corot,Courbet,Duchamp"
    When click "Read" panel select all buckets
    Then the "Read" panel bucket(s) "DEFAULT,Corot,Courbet,Duchamp" are(is) selected
    When click "Read" panel deselect all buckets
    Then the "Read" panel bucket(s) "DEFAULT,Corot,Courbet,Duchamp" are(is) not selected
    When click the "Read" panel bucket "Courbet"
    Then the "Read" panel bucket(s) "Courbet" are(is) selected
    Then the "Read" panel bucket(s) "DEFAULT,Corot,Duchamp" are(is) not selected

