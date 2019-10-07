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
