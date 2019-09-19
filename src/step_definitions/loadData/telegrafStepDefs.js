import { Then, When } from 'cucumber';

const telegrafsSteps = require(__srcdir + '/steps/loadData/telegrafsSteps.js');

let teleTabSteps = new telegrafsSteps(__wdriver);

Then(/^there is a telegraf card for "(.*)"$/, async name => {

    await teleTabSteps.verifyTelegrafCardByName(name);

});

Then(/^the telegrafs tab is loaded$/, async () => {
   await teleTabSteps.verifyTelegrafTabLoaded(true);
});

When(/^click the create Telegraf button empty$/, async () => {
   await teleTabSteps.clickCreateTelegrafButtonEmpty();
});

When(/^click the create Telegraf button in header$/, async () => {
   await teleTabSteps.clickCreateTelegrafButtonInHeader();
});

Then(/^the Create Telegraf Wizard is loaded$/, { timeout: 10000 }, async () => {
   await teleTabSteps.verifyWizardLoadedP1();
});

When(/^dismiss the Create Telegraf Wizard$/, async () => {
   await teleTabSteps.dismissPopup();
});

Then(/^the Create Telegraf Wizard is no longer present$/, { timeout: 10000 },  async () => {
   await teleTabSteps.verifyCreateTelegrafWizardNotPresent();
});
