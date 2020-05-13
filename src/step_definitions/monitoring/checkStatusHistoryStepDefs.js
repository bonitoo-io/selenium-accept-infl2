import { Then, When } from 'cucumber';
const checkStatusHistorySteps = require(__srcdir + '/steps/monitoring/checkStatusHistorySteps.js');

let ckStatHistSteps = new checkStatusHistorySteps(__wdriver);

Then(/^the Check statusses page is loaded$/, async() => {
    await ckStatHistSteps.isLoaded();
    await ckStatHistSteps.verifyIsLoaded();
});

Then(/^there are at least "(.*)" events in the history$/, async count => {
   await ckStatHistSteps.verifyMinimumEvents(count);
});

Then(/^event no "(.*)" contains the check name "(.*)"$/, async (index, name) => {
   await ckStatHistSteps.verifyEventName(index, name);
});

When(/^click the check name of event no "(.*)"$/, async index => {
   await ckStatHistSteps.clickEventName(index);
});

Then(/^there is at least "(.*)" events at level "(.*)"$/, async (count, level) => {
   await ckStatHistSteps.verifyMinimumCountEventsAtLevel(count, level);
});

When(/^click event history filter input$/, async () => {
   await ckStatHistSteps.clickEventFilterInput();
});

Then(/^the event history examples dropdown is visible$/, async () => {
   await ckStatHistSteps.verifyFilterExamplesDropdownVisible();
});

Then(/^the event history examples dropdown is not visible$/, async () => {
   await ckStatHistSteps.verifyFilterExamplesDropdownNotVisible();
});

When(/^click the alert history title$/, async () => {
   await ckStatHistSteps.clickAlertHistoryTitle();
});

When(/^zoom into event markers$/, async () => {
   await ckStatHistSteps.zoomInOnEventMarkers();
});
