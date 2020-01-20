import { Then, When } from 'cucumber';
const cellOverlaySteps = require(__srcdir + '/steps/dashboards/cellOverlaySteps.js');

let celOvSteps = new cellOverlaySteps(__wdriver);

Then(/^the cell edit overlay is loaded as "(.*)"$/, {timeout: 10000}, async name => {
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

When(/^paste into cell edit Script Editor$/, { timeout: 10000 }, async text => {
   await celOvSteps.pasteIntoCellEditScriptEditor(text);
});

When(/^clear the cell edit Script Editor$/, { timeout: 20000 }, async () => {
   await celOvSteps.clearCellEditScriptEditor();
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

When(/^click on the cell edit name$/, async () => {
   await celOvSteps.clickCellEditName();
});

When(/^change the cell edit name to "(.*)"$/, async name => {
   await celOvSteps.updateCellName(name);
});

When(/^click the dashboard cell view type dropdown$/, async () => {
   await celOvSteps.clickViewTypeDropdown();
});

Then(/^the dashboard cell view type dropdown list contains:$/, async itemList => {
   await celOvSteps.verifyViewTypeListContents(itemList);
});

Then(/^the cell view type dropdown list is not present$/, async () => {
   await celOvSteps.verifyViewTypeListNotPresent();
});

When(/^click cell view customize button$/, async () => {
   await celOvSteps.clickCellViewCustomize();
});

Then(/^the view options container is present$/, async () => {
   await celOvSteps.verifyViewOptionsContainerVisible();
});

Then(/^the view options container is not present$/, async () => {
   await celOvSteps.verifyViewOptionsContainerNotPresent();
});

Then(/^the cell view customize button is highlighted$/, async () => {
   await celOvSteps.verifyCellCustomizeButtonHighlight();
});

Then(/^the cell view customize button is not highlighted$/, async () => {
   await celOvSteps.verifyCustomizeButtonNoHighlightd();
});

Then(/^the time machine view empty graph is visible$/, async () => {
   await celOvSteps.verifyTMViewEmptyGraphVisible();
});
