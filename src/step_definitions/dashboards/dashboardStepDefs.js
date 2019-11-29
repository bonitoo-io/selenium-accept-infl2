import { Then, When } from 'cucumber';
const dashboardSteps = require(__srcdir + '/steps/dashboards/dashboardSteps.js');

let dbdSteps = new dashboardSteps(__wdriver);

When(/^name dashboard "(.*)"$/, async name => {
    await dbdSteps.nameDashboard(name);
});

Then(/^the dashboard named "(.*)" is loaded$/, async name => {
    await dbdSteps.verifyDashboardLoaded(name);
});

Then(/^the new dashboard page is loaded$/, async () => {
    await dbdSteps.verifyDashboardLoaded('Name this Dashboard');
});

Then(/^the dashboard contains a cell named "(.*)"$/, async name => {
    await dbdSteps.verifyDashboardCellVisible(name);
});

Then(/^the empty dashboard contains a documentation link$/, async () => {
    await dbdSteps.verifyDashboardEmptyDocLinkVisible();
    await dbdSteps.verifyDashboardEmptyDocLink('https://v2.docs.influxdata.com/v2.0/visualize-data/variables/');
});

Then(/^the empty dashboard contains Add a Cell button$/, async () => {
   await dbdSteps.verifyDashboardEmptyAddCell();
});

When(/^click dashboard time locale dropdown$/, async () => {
   await dbdSteps.clickDashboardTimeLocaleDropdown();
});

Then(/^the active dashboard dropdown contains items:$/, async items => {
    await dbdSteps.verifyDashboardDropdownContains(items);
});

When(/^click dashboard refresh dropdown$/, async () => {
   await dbdSteps.clickDashboardRefreshDropdown();
});

Then(/^the active dashboard dropdown contains dividers:$/, async labels => {
   await dbdSteps.verifyDashboardDropdownContainsDividers(labels);
});

When(/^click dashboard time range dropdown$/, async () => {
   await dbdSteps.clickDashboardTimeRangeDropdown();
});

When(/^click the empty create cell button$/, async () => {
  await dbdSteps.clickCreateCellEmpty();
});

Then(/^there is no dashboard cell named "(.*)"$/, async name => {
  await dbdSteps.verifyCellNotPresent(name);
});

When(/^get metrics of cell named "(.*)"$/, async name => {
  await dbdSteps.getCellMetrics(name);
});

When(/^toggle context menu of dashboard cell named "(.*)"$/, async name => {
  await dbdSteps.toggleDashboardCellContextMenu(name);
});

When(/^click cell content popover add note$/, async () => {
  await dbdSteps.clickDashboardPopOverlayAddNote();
});

Then(/^the edit note popup is loaded$/, async () => {
  await dbdSteps.verifyEditNotePopupLoaded();
});

When(/^enter the cell note popup CodeMirror text:$/, async text =>{
  await dbdSteps.setCellNotePopupCodeMirrorText(text);
});
