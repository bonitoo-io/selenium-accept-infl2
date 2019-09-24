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

When(/^click the select bucket dropdown in the Create Telegraf Wizard$/, async () => {
   await teleTabSteps.clickCreateConfigBucketDropdown();
});

When(/^click the bucket item "(.*)" in the Create Telegraf Wizard$/, async item => {
   await teleTabSteps.clickCreateConfigBucketDropdownItem((item === 'DEFAULT') ? __defaultUser.bucket : item);
});

When(/^click the plugin tile "(.*)" in the Create Telegraf Wizard$/, async plugin => {
   await teleTabSteps.clickCreateConfigPluginTile(plugin);
});

When(/^clear the create Telegraf Wizard plugin filter$/, async () => {
   await teleTabSteps.clearWizardPluginFilter();
});

When(/^enter the value "(.*)" in create Telegraf Wizard filter plugins$/, async value => {
   await teleTabSteps.enterValueIntoPluginsFilter(value);
});

Then(/^the Create Telegraf wizard plugin tile "(.*)" is visible$/, async plugin => {
   await teleTabSteps.verifyCreateWizardPluginTileVisible(plugin);
});

Then(/^the Create Telegraf wizard plugin tile "(.*)" is not present$/, async plugin => {
   await teleTabSteps.verifyCreateWizardPluginTileNotPresent(plugin);
});

Then(/^the create Telegraf Wizard second step is loaded$/, {timeout: 10000},  async () => {
   await teleTabSteps.verifyCreateWizardStep2Loaded();
});

Then(/^the create Telegraf plugins sidebar contains "(.*)"$/,
    async plugins => {
   await teleTabSteps.verifyCreateWizardStep2PluginsList(plugins.toLowerCase());
});

Then(/^the create Telegraf plugin sidebar "(.*)" item is in state "(.*)"$/, async (plugin, state) => {
   await teleTabSteps.verifyCreateWizardPluginState(plugin, state);
});

When(/^click the create Telegraf plugin sidebar "(.*)" item$/, async plugin => {
   await teleTabSteps.clickCreateWizardPluginItem(plugin);
});

Then(/^the create Telegraf edit plugin "(.*)" step is loaded$/, {timeout: 10000}, async plugin => {
   await teleTabSteps.verifyEditPluginStepLoaded(plugin);
});

Then(/^the Create Telegraf wizard plugin tile "(.*)" is selected$/, async plugin => {
   await teleTabSteps.verifyCreateWizardPluginTileSelected(plugin);
});

Then(/^the Create Telegraf wizard plugin tile "(.*)" is not selected$/, async plugin => {
   await teleTabSteps.verifyCreateWizardPluginTileNotSelected(plugin);
});

When(/^enter the values (.*) into the fields (.*)$/, async (values, fields) => {
   await teleTabSteps.enterValuesIntoFields(values, fields);
});

Then(/^verify the edit plugin error notification with message "(.*)"$/, async msg => {
   await teleTabSteps.verifyEditPluginErrorMessage(msg);
});

When(/^clear the create Telegraf edit plugin fields (.*)$/, async fields => {
   await teleTabSteps.clearCreateTelegrafPluginFields(fields);
});

When(/^enter the name "(.*)" in the Create Telegraf Wizard$/, async name => {
   await teleTabSteps.enterTelegrafWizardName(name);
});

When(/^enter the description "(.*)" in the Create Telegraf Wizard$/, async descr => {
   await teleTabSteps.enterTelegrafWizardDescr(descr);
});

When(/^click the Create Telegraf Wizard finish button$/, async () => {
   await teleTabSteps.clickPopupWizardFinish();
});

Then(/^the create Telegraf Wizard final step is loaded$/, async () => {
   await teleTabSteps.verifyCreateWizardStep3Loaded();
});

Then(/^the bucket of the telegraf card "(.*)" is "(.*)"$/, async (name, bucket) => {
   await teleTabSteps.verifyBucketForTelegrafCard(name, (bucket === 'DEFAULT') ? __defaultUser.bucket : bucket);
});

Then(/^the telegraf sort order is "(.*)"$/, async order => {
   await teleTabSteps.verifyTelegrafCardSortOrder(order);
});

When(/^click the telegraf sort by name button$/, async () => {
   await teleTabSteps.clickTelegrafSortByName();
});

