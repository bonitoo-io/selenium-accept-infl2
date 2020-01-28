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

Then(/^the cell edit submit button is disabled$/, async () => {
   await celOvSteps.verifyCellEditSubmitDisabled();
});

Then(/^the cell edit submit button is enabled$/, async () => {
   await celOvSteps.verifyCellEditSubmitEnabled()
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

When(/^click time machine autorefresh dropdown$/, async () => {
   await celOvSteps.clickTMAutorefreshDropdown();
});

Then(/^the time machine autorefresh dropdown list contains:$/, async itemList => {
   await celOvSteps.verifyAutorefreshListContents(itemList);
});

When(/^select the time machine autorefresh rate "(.*)"$/, async item => {
   await celOvSteps.clickTMAutorefreshItem(item);
});

Then(/^the time machine force refresh button is not present$/, async () => {
   await celOvSteps.verifyTMAutorefreshForceButtonNotPresent();
});

Then(/^the time machine force refresh button is present$/, async () => {
   await celOvSteps.verifyTMAutorefreshForceButtonVisible();
});

Then(/^the time machine Time Range dropdown list contains:$/, async itemList => {
   await celOvSteps.verifyTMTimeRangeDropdownList(itemList);
});

Then(/^the time machine Time Range dropdown list is not present$/, async () => {
   await celOvSteps.verifyTMTimeRangeDropdownListNotPresent();
});

Then(/^the time machine query builder is visible$/, async () => {
   await celOvSteps.verifyTMQueryBuilderVisible();
});

Then(/^the time machine switch to Query Builder warning is not present$/, async () => {
   await celOvSteps.verifyTMQueryBuilderSwitchWarnNotPresent();
});

Then(/^the time machine flux editor is visible$/, async () => {
   await celOvSteps.verifyTMFluxEditorVisible();
});

When(/^click the cell edit Query Builder button$/, async () => {
   await celOvSteps.clickTMSwitch2QBuilder();
});

When(/^click the cell edit Query Builder confirm button$/, async () => {
   await celOvSteps.clickTMSwitch2QBuilderConfirm();
});

When(/^click the time machine flux editor$/, async () => {
   await celOvSteps.clickTMFluxEditor();
});

Then(/^the time machine flux editor is not present$/, async () => {
   await celOvSteps.verifyTMFluxEditorNotPresent();
});

Then(/^the edit cell bucket selector contains buckets:$/, async bucketList => {
   await celOvSteps.verifyTMBucketListContents(bucketList);
});

Then(/^the bucket '(.*)' is not present in the time machine bucket selector$/, async bucket => {
   await celOvSteps.verifyBucketNotInTMBucketList(bucket);
});

When(/^filter the time machine bucket selector with "(.*)"$/, async value => {
   await celOvSteps.filterBucketListContents(value);
});

When(/^clear the time machine bucket selector filter$/, async () => {
   await celOvSteps.clearBucketSelectorFilter();
});

Then(/^there are '(.*)' time machine builder cards$/, async count => {
   await celOvSteps.verifyTMBuilderCardsSize(count);
});

Then(/^time machine builder card '(.*)' contains:$/, async (index,items) => {
   await celOvSteps.verifyItemsInBuilderCard(index,items);
});

Then(/^the selector count for builder card '(.*)' contains the value '(.*)'$/, async (index,value) =>{
   await celOvSteps.verifySelectorCountInBuilderCard(index,value);
});

Then(/^time machine builder card '(.*)' does not contain '(.*)'$/, async (index, item) => {
   await celOvSteps.verifyItemNotInBuilderCard(index,item);
});

When(/^click the tag selector dropdown of builder card '(.*)'$/, async index => {
   await celOvSteps.clickTagSelectorOfBuilderCard(index);
});

Then(/^the tag selector dropdown of builder card '(.*)' contains:$/, async (index,items) => {
   await celOvSteps.verifyItemsInBuilderCardTagSelector(index,items);
});

When(/^click the tag selector dropdown item '(.*)' of builder card '(.*)'$/, async (item, index) => {
  await celOvSteps.clickTagSelectorDropdownItemInBuilderCard(item,index);
});

When(/^click the tag '(.*)' in builder card '(.*)'$/, async (tag, cardIndex) => {
  await celOvSteps.clickTagInBuilderCard(tag, cardIndex);
});

When(/^filter the tags in time machine builder card '(.*)' with '(.*)'$/, {timeout: 10000}, async (index,term) => {
  await celOvSteps.filterBuilderCardListContents(index,term);
});

Then(/^time machine builder card '(.*)' is empty$/, async index => {
   await celOvSteps.verifyBuilderCardEmpty(index);
});

When(/^clear the tags filter in time machine builder card '(.*)'$/, async index => {
   await celOvSteps.clearTagsFilterInBuilderCard(index);
});

Then(/^the contents of tag selector dropodwn of build card '(.*)' are not present$/, async index => {
   await celOvSteps.verifyBuilderCardTagSelectNotPresent(index);
});

Then(/^the selector counf for builder card '(.*)' is not present$/, async index => {
   await celOvSteps.verifyBuilderCardSelectCountNotPresent(index);
});

Then(/^the delete button for builder card '(.*)' is not present$/, async index => {
   await celOvSteps.verifyBuilderCardDeleteNotPresent(index);
});

When(/^click delete for builder card '(.*)'$/, async index => {
   await celOvSteps.clickBuilderCardDelete(index);
});


