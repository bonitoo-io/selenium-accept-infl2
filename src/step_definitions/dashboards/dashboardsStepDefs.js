import { Then, When } from 'cucumber';
const dashboardsSteps = require(__srcdir + '/steps/dashboards/dashboardsSteps.js');

let dbdsSteps = new dashboardsSteps(__wdriver);

Then(/^the Dashboards page is loaded$/, async() => {
    await dbdsSteps.isLoaded();
    await dbdsSteps.verifyIsLoaded();
    await dbdsSteps.verifyHeaderContains('Dashboards');
});

