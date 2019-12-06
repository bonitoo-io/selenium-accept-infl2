import { Then, When } from 'cucumber';
const cellOverlaySteps = require(__srcdir + '/steps/dashboards/cellOverlaySteps.js');

let celOvSteps = new cellOverlaySteps(__wdriver);

Then(/^the cell edit overlay is loaded as "(.*)"$/, async name => {
   await celOvSteps.verifyCellOverlayIsLoaded(name);
});

When(/^get the current cell edit preview graph$/, async () => {
   await celOvSteps.getCurrentCellEditPreviewGraph();
});

When(/^name dashboard cell "(.*)"$/, async name => {
   await celOvSteps.nameDashboardCell(name);
});

When(/^click dashboard cell edit cancel button$/, async () => {
   await celOvSteps.clickDashboardCellEditCancel();
});

When(/^click dashboard cell save button$/, async () => {
   await celOvSteps.clickDashboardCellSave();
});

When(/^click the cell edit Time Range Dropdown$/, async () => {
   await celOvSteps.clickCellEditTimeRangeDropdown();
});

When(/^select the cell edit Time Range "(.*)"$/, async item => {
   await celOvSteps.selectCellEditTimeRangeItem(item);
});

When(/^click the cell edit Script Editor button$/, async () => {
   await celOvSteps.clickCellEditScriptEditorButton();
});

When(/^paste into cell edit Script Editor$/, async text => {
   await celOvSteps.pasteIntoCellEditScriptEditor(text);
});

When(/^click the cell edit submit button$/, async () => {
   await celOvSteps.clickCellEditSubmitButton();
});

Then(/^the cell edit preview graph is shown$/, async() => {
   await celOvSteps.verifyCellEditPreviewGraphVisible();
});

Then(/^the cell edit preview graph is changed$/, async() => {
   await celOvSteps.verifyCellEditPreviewGraphChanged();
});

When(/^click the cell edit save button$/, async () => {
   await celOvSteps.clickCellEditSaveButton();
});
