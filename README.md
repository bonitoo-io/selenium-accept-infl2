## Selenium-Accept

Selenium Acceptance tests for the Influxdbv2 UI.  

**Run cycle**

```bash
npm install
npm run influx:setup
npm test
node src/utils/htmlReport.js
node src/utils/junitReport.js
```

Note that the final two reporting steps can be bundled into `package.json` scripts, or can be called as a part of the `package.json` *test* script.  They are shown here to show how third party components are used to generate reports.


### Tips

Run only the feature under development

```bash
npm test -- features/onboarding/onboarding.feature:4
```

Number is line number where the target scenario starts.
