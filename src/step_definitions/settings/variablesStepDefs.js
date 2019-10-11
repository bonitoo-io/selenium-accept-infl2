import { Then, When } from 'cucumber';

const variablesSteps = require(__srcdir + '/steps/settings/variablesSteps.js');

let vblSteps = new variablesSteps(__wdriver);

When(/^click create variable dropdown in header$/, async () => {
    await vblSteps.clickCreateVariableDropdown();
});

When(/^click create variable dropdown empty$/, async () => {
   await vblSteps.clickCreateVariableDropdownEmpty();
});

Then(/^the import variable popup is loaded$/, async () => {
    await vblSteps.verifyImportVariablePopupLoaded();
});

When(/^click "(.*)" variable dropdown item$/, async item => {
   await vblSteps.clickCreateVariableDropdownItem(item);
});

Then(/^the create variable popup is loaded$/, async () => {
   await vblSteps.verifyCreateVariablePopupLoaded();
});

Then(/^the Import Variable JSON textarea is visible$/, async () => {
   await vblSteps.verifyImportPopupJSONTextareaVisible(true);
});

When(/^click the Import Variable popup paste JSON button$/, async () => {
   await vblSteps.clickImportPopupPasteJSON();
});

Then(/^the Import JSON as variable button is enabled$/, async () => {
   await vblSteps.verifyImportPopupImportJSONButtonEnabled(true);
});

When(/^click the Import Variable popup Upload File button$/, async() => {
   await vblSteps.clickImportPopupUploadFile();
});

Then(/^the Import Variable JSON textarea is not visible$/, async() => {
   await vblSteps.verifyImportPopupJSONTextareaVisible(false)
});

Then(/^the Import JSON as variable button is not enabled$/, async() => {
    await vblSteps.verifyImportPopupImportJSONButtonEnabled(false);
});

Then(/^the Import JSON file upload area is present$/, async () => {
    await vblSteps.verifyImportPopupFileUploadPresent();
});

Then(/^the create variable popup selected type is "(.*)"$/, async type => {
   await vblSteps.verifyCreateVarPopupSelectedType(type);
});

Then(/^the create variable popup create button is disabled$/, async () => {
   await vblSteps.verifyCreatePopupCreateEnabled(false);
});

Then(/^the create variable popup script editor is visible$/, async () => {
   await vblSteps.verifyCreateVarPopupQueryEditorVisible(true);
});

Then(/^the create variable popup script editor is not visible$/, async () => {
    await vblSteps.verifyCreateVarPopupQueryEditorVisible(false);
});

When(/^click the create variable popup type dropdown$/, async () => {
   await vblSteps.clickCreateVariableTypeDropdown();
});

Then(/^the create variable popup textarea is visible$/, async () => {
   await vblSteps.verifyCreateVarPopupTextareaVisible(true);
});

Then(/^the create variable popup default value dropdown is visible$/, async () => {
   await vblSteps.verifyCreateVarPopupDefaultValDropdownVisible(true);
});

Then(/^the create variable popup info line contains "(.*)" items$/, async count => {
    await vblSteps.verifyCreateVarPopupInfoCount(count);
});

Then(/^the create variable popup textarea is not visible$/, async () => {
    await vblSteps.verifyCreateVarPopupTextareaVisible(false);
});

Then(/^the create variable popup default value dropdown is not visible$/, async () => {
    await vblSteps.verifyCreateVarPopupDefaultValDropdownVisible(false);
});

When(/^click the create variable popup type dropdown item "(.*)"$/, async item => {
    await vblSteps.clickCreateVarPopupTypeDropdownItem(item);
});

Then(/^the create variable popup info line is not visible$/, async () => {
    await vblSteps.verifyCreateVarPopupInfoVisible(false);
});

When(/^upload the import variable file "(.*)"$/, async path2file  => {
   await vblSteps.uploadImportVarPopupFile(path2file);
});

Then(/^the import variable drag and drop header contains success "(.*)"$/, async path2file => {
    await vblSteps.verifyImportPopupUploadSuccess();
    await vblSteps.verifyImportPopupUploadFilename(path2file);
});

When(/^click the import variable import button$/, async () => {
    await vblSteps.clickImportPopupImportButton();
});

Then(/^there is a variable card for "(.*)"$/, async name => {
   await vblSteps.verifyVariableCardVisible(name);
});

When(/^enter the create variable popup name "(.*)"$/, async name => {
   await vblSteps.enterCreateVarPopupName(name);
});

When(/^clear the create variable popup name input$/, async () => {
    await vblSteps.clearCreateVarPopupName();
});

When(/^enter the create variable popup values:$/, async values => {
    await vblSteps.enterCreateVarPopupTextarea(values);
});

When(/^enter the create variable popup CodeMirror text:$/, async text => {
    await vblSteps.setVariablePopupCodeMirrorText(text);
});

When(/^click the create variable popup title$/, async () => {
   await vblSteps.clickPopupTitle();
});

Then(/^the selected default variable dropdown item is "(.*)"$/, async item => {
   await vblSteps.verifyCreatePopupDefaultValDropdownSelected(item);
});

When(/^click the create variable popup default dropdown$/, async () => {
   await vblSteps.clickCreateVarPopupDefaultDropdown();
});

When(/^click the create variable popup default dropdown item "(.*)"$/, async item => {
  await vblSteps.clickCreateVarPopupDefaultDropdownItem(item);
});

When(/^enter the value "(.*)" into the variables filter$/, async value => {
   await vblSteps.enterValueIntoVariablesFilter(value);
});

Then(/^the variable cards "(.*)" are visible$/, async cards => {
    await vblSteps.verifyVariableCardsVisible(cards);
});

When(/^click the create variable popup default csv dropdown item "(.*)"$/, async item => {
    await vblSteps.clickCreatVarPopupDefaultCSVDropdownItem(item);
});

When(/^click the create variable popup create button$/, async () => {
   await vblSteps.clickCreateVarPopupCreateButton();
});

Then(/^the variable cards "(.*)" are not present$/, {timeout: 20000}, async cards => {
    await vblSteps.verifyVariablsCardsNotPresent(cards);
});

Then(/^the variable cards are sorted as "(.*)"$/, async cards => {
    await vblSteps.verifyVariableCardsSort(cards);
});

When(/^click the variable sort by name button$/, async () => {
    await vblSteps.clickVariableSortByName();
});

When(/^clear the variables filter$/, async () => {
   await vblSteps.clearVariablesFilter();
});

