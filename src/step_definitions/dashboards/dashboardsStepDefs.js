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

When(/^click the empty Create dashboard dropdown button$/, async () => {
   await dbdsSteps.clickCreateDashboardEmpty();
});

Then(/^the empty create dashboard dropdown list contains$/, async (items) => {
  await dbdsSteps.verifyEmptyCreateDashboardItems(items);
});

When(/^click the create dashboard item "(.*)"$/, async (item) => {
   await dbdsSteps.clickCreateDashboardItem(item);
});

Then(/^the empty Create dashboard dropdown button is not present$/, async () => {
   await dbdsSteps.verifyEmptyCreateDashboardNotPresent();
});

Then(/^there is a dashboard card named "(.*)"$/, async name =>{
   await dbdsSteps.verifyDashboardCardVisible(name);
});

When(/^hover over dashboard card named "(.*)"$/, async name => {
   await dbdsSteps.hoverOVerDashboardCard(name);
});

Then(/^the export button for the dashboard card "(.*)" is visible$/, async name => {
    await dbdsSteps.verifyExportButtonOfCardVisible(name);
});

Then(/^the clone button for the dashboard card "(.*)" is visible$/, async name => {
    await dbdsSteps.verifyCloneButtonOfCardVisible(name);
});

Then(/^the delete button for the dashboard card "(.*)" is visible$/, async name => {
    await dbdsSteps.verifyDeleteButtonOfCardVisible(name);
});

When(/^hover over dashboard card name "(.*)"$/, async name => {
    await dbdsSteps.hoverOverDashboardCardName(name);
});

When(/^click the edit dashboard card name button for "(.*)"$/, async name => {
    await dbdsSteps.clickDashboardCardName(name);
});

