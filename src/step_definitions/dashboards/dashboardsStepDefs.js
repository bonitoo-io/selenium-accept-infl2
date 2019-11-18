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

Then(/^there is no dashboard card named "(.*)"$/, async name => {
   await dbdsSteps.verifyDashboardCardNotPresent(name);
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

When(/^clear the name input of the dashboard card "(.*)"$/, async name => {
   await dbdsSteps.clearDashboardCardName(name);
});

When(/^enter the new name "(.*)" in the name input of the dashboard card "(.*)"$/, async (newName, oldName) => {
   await dbdsSteps.renameDashboardCard(newName, oldName);
});

Then(/^the description for card "(.*)" contains "(.*)"$/, async (name, descr) => {
   await dbdsSteps.verifyDashboardCardContainsDescription(name,descr);
});

When(/^hover over description of the dashboard card "(.*)"$/, async name => {
   await dbdsSteps.hoverOverDashboardCardDescription(name);
});

When(/^click the edit description button for the dashboard card "(.*)"$/, async name => {
    await dbdsSteps.clickDashboardCardEditDescriptionButton(name);
});

When(/^enter into the dashboard card "(.*)" the description:$/, async (name, descr) => {
   await dbdsSteps.enterDashboardCardDescription(name,descr);
});

When(/^click empty label for the dashboard card "(.*)"$/, async name => {
    await dbdsSteps.clickEmptyLabelOfDashboardCard(name);
});

When(/^click add label for the dashboard card "(.*)"$/, async name => {
   await dbdsSteps.clickAddLabelOfDashboardCard(name);
});

Then(/^the label "(.*)" in the popover selector is visible$/, async label => {
    await dbdsSteps.verifyLabelInDashboardsPopoverIsVisible(label);
});

When(/^enter "(.*)" in the popover label selector filter$/, async text => {
   await dbdsSteps.enterDashboardLabelsFilter(text);
});

Then(/^there are "(.*)" label pills in the select label popover$/, async count => {
   await dbdsSteps.verifyDasboardAddLabelsPillCount(count);
});

When(/^clear the popover label selector filter$/, async () => {
   await dbdsSteps.clearDashboardLabelsFilter();
});


