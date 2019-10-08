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
