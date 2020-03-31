import { Then } from 'cucumber';
const alertingSteps = require(__srcdir + '/steps/monitoring/alertingSteps.js');

let alertSteps = new alertingSteps(__wdriver);

Then(/^the Alerting page is loaded$/, async() => {
    await alertSteps.isLoaded();
    await alertSteps.verifyIsLoaded();
});
