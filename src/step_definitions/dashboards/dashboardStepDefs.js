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

Then(/^the cell named "(.*)" contains the empty graph message$/, async name => {
   await dbdSteps.verifyEmptyGraphMessage(name);
});

Then(/^the cell named "(.*)" contains a graph$/, async name => {
   await dbdSteps.verifyCellContainsGraph(name);
});

When(/^get the current graph of the cell "(.*)"$/, async name => {
    await dbdSteps.getCurrentGraphOfCell(name);
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

When(/^click cell content popover configure$/, async () => {
  await dbdSteps.clickDashboardPopOverlayConfigure();
});

Then(/^the edit note popup is loaded$/, async () => {
  await dbdSteps.verifyEditNotePopupLoaded();
});

When(/^enter the cell note popup CodeMirror text:$/, async text =>{
  await dbdSteps.setCellNotePopupCodeMirrorText(text);
});

Then(/^the cell note popup Markdown preview panel contains$/, async text=> {
  await dbdSteps.verifyCellNotPopupPreviewContains(text);
});

When(/^click the cell note popup save button$/, async () => {
  await dbdSteps.clickCellNotePopupSave();
});

Then(/^the cell named "(.*)" has a note indicator$/, async name => {
  await dbdSteps.verifyCellHasNoteIndicator(name);
});

When(/^click the note indicator of the "(.*)" cell$/, async name => {
  await dbdSteps.clickCellNoteIndicator(name);
});

Then(/^the cell note popover contains:$/, async text => {
 await dbdSteps.verifyContentsOfCellNote(text);
});

When(/^click the cell title "(.*)"$/, async name => {
  await dbdSteps.clickCellTitle(name);
});

Then(/^the cell note popover is not loaded$/, async () => {
  await dbdSteps.verifyCellNotePopoverNotPresent();
});

Then(/^the cell content popover has item edit note$/, async () => {
  await dbdSteps.verifyCellContentPopoverItemEditNote();
});

Then(/^the cell content popover is not loaded$/, async () => {
  await dbdSteps.verifyCellContentPopoverNotPresent();
});

Then(/^the cell note popup Code Mirror text contains:$/, async text => {
  await dbdSteps.verifyCodeMirrorContainsText(text);
});

When(/^clear the cell note popup Code Mirror text$/, async () => {
  await dbdSteps.clearCellNotePopupCodeMirror();
});

Then(/^the cell note popup markup preview panel has no text$/, async () => {
  await dbdSteps.verifyCellNotePopupMarkupPreviewNoText();
});

When(/^move the cell named "(.*)" by "(.*)"$/, {timeout: 15000}, async (name, vector) => {
  let deltaCoords = JSON.parse(vector);
  await dbdSteps.moveDashboardCell(name, deltaCoords);
});

When(/^resize the cell name "(.*)" by "(.*)"$/, {timeout: 15000},  async (name, vector) => {
  let deltaSize = JSON.parse(vector);
  await dbdSteps.resizeDashboardCell(name, deltaSize);
});

Then(/^size of the cell named "(.*)" has changed by "(.*)"$/, async (name, change) => {
  let deltaSize = JSON.parse(change);
  await dbdSteps.verifyDashboardCellSizeChange(name, deltaSize);

});

Then(/^the size of the of the cell named "(.*)" is unchangd$/, async name => {
  await dbdSteps.verifyDashboardCellSizeChange(name, {dw: 0, dh: 0});
});

Then(/^the location of the cell named "(.*)" is changed by "(.*)"$/, async (name, vector) => {
    let deltaCoords = JSON.parse(vector);
    await dbdSteps.verifyCellPositionChange(name, deltaCoords);
});

Then(/^the location of the cell named "(.*)" is unchanged$/, async name => {
    await dbdSteps.verifyCellPositionChange(name, {dx: 0, dy: 0});
});

When(/^click the dashboard Time Range Dropdown$/, async () => {
    await dbdSteps.clickDashboardTimeRangeDropdown();
});

When(/^select dashboard Time Range "(.*)"$/, async item => {
   await dbdSteps.selectDashboardTimeRange(item);
});

Then(/^the graph of the cell "(.*)" has changed$/, async name => {
   await dbdSteps.verifyCellGraphChange(name);
});
