import { Then, When } from 'cucumber';
const dashboardsSteps = require(__srcdir + '/steps/dashboards/dashboardsSteps.js');

let dbdsSteps = new dashboardsSteps(__wdriver);

Then(/^the Dashboards page is loaded$/, {timeout: 2 * 5000}, async() => {
    await dbdsSteps.isLoaded();
    await dbdsSteps.verifyIsLoaded();
    await dbdsSteps.verifyHeaderContains('Dashboards');
});

When(/^click create dashboard control$/, async() => {
    await dbdsSteps.clickCreateDashboard();
});

When(/^click "(.*)" in create dashboard dropdown$/, async item => {
    await dbdsSteps.clickCreateDashboardItem(item);
});

