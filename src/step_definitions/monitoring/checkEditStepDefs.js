import { Then, When } from 'cucumber';
const checkEditSteps = require(__srcdir + '/steps/monitoring/checkEditSteps.js');

let ckEdSteps = new checkEditSteps(__wdriver);

Then(/^the edit check overlay is loaded$/, async() => {
    await ckEdSteps.isLoaded();
    await ckEdSteps.verifyIsLoaded();
});

Then(/^the edit check overlay is not loaded$/, async () => {
   await ckEdSteps.verifyIsNotLoaded();
});

When(/^dismiss edit chck overlay$/, async () => {
   await ckEdSteps.dismissOverlay();
});

When(/^enter the alert check name "(.*)"$/, async name => {
    await ckEdSteps.enterAlertCheckName(name);
});


