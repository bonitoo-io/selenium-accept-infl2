import { Then, When } from 'cucumber';
const monitoringSteps = require(__srcdir + '/steps/monitoring/monitoringSteps.js');

let monSteps = new monitoringSteps(__wdriver);

Then(/^the Alerting page is loaded$/, async() => {
    await monSteps.isLoaded();
    await monSteps.verifyIsLoaded();
});


Then(/^the notification rules create dropdown is disabled$/, async () => {
    await monSteps.verifyNotifyRulesCreateDropdownDiabled();
});

When(/^click alerting tab "(.*)"$/, async tabName => {
   await monSteps.clickAlertingTab(tabName);
});

When(/^click the create check button$/, async () => {
   await monSteps.clickCreateCheckButton();
});

When(/^click the create check dropdown item "(.*)"$/, async item => {
   await monSteps.clickCreateCheckDropdownItem(item);
});

Then(/^the create check dropodown list contains the items$/, async items => {
   await monSteps.verifyCreateCheckDropdownItems(items);
});

Then(/^the create check dropdown list is not visible$/, async () => {
   await monSteps.verifyCreateCheckDropdownNotVisible();
});

When(/^hover the create check question mark$/, async () => {
   await monSteps.hoverCreateCheckQMark();
});

Then(/^the create check tooltip is visible$/, async () => {
   await monSteps.verifyCreateCheckTooltipVisible();
});

Then(/^the create check tooltip is not visible$/, async () => {
   await monSteps.verifyCreateCheckTooltipNotVisible();
});

When(/^hover the alerts page title$/, async () => {
   await monSteps.hoverPageTitle();
});

When(/^hover the create endpoint question mark$/, async () => {
   await monSteps.hoverCreateEndpointQMark();
});

Then(/^the create endpoint tooltip is visible$/, async () => {
   await monSteps.verifyCreateEndpointTooltipVisible();
});

Then(/^the create endpoint tooltip is not visible$/, async () => {
   await monSteps.verifyCreateEndpointTooltipNotVisible();
});

When(/^hover the create rule question mark$/, async () => {
   await monSteps.hoverCreateRuleQMark();
});

Then(/^the create rules tooltip is visible$/, async () => {
   await monSteps.verifyCreateRuleTooltipVisible();
});

Then(/^the create rules tooltip is not visible$/, async () => {
   await monSteps.verifyCreateRuleTooltipNotVisible();
});

When(/^click create endpoint button$/, async () => {
   await monSteps.clickCreateEndpointButton();
});

Then(/^the create endpoint popup is loaded$/, async () => {
   await monSteps.verifyCreateEndpointPopupLoaded();
});

When(/^click the first time create threshold check$/, async() => {
   await monSteps.clickFirstTimeCreateThresholdCheck();
});

When(/^click the first time create deadman check$/, async () => {
   await monSteps.clickFirstTimeCreateDeadmanCheck();
});

