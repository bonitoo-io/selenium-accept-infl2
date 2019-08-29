import { Then, When } from 'cucumber';
const bucketsSteps = require(__srcdir + '/steps/settings/bucketsSteps.js');
const telegrafsSteps = require(__srcdir + '/steps/settings/telegrafsSteps.js');
const settingsSteps = require(__srcdir + '/steps/settings/settingsSteps.js');
const scrapersSteps = require(__srcdir + '/steps/settings/scrapersSteps.js');
const variablesSteps = require(__srcdir + '/steps/settings/variablesSteps.js');
const membersSteps = require(__srcdir + '/steps/settings/membersSteps.js');
const templatesSteps = require(__srcdir + '/steps/settings/templatesSteps.js');
const labelsSteps = require(__srcdir + '/steps/settings/labelsSteps.js');
const tokensSteps = require(__srcdir + '/steps/settings/tokensSteps.js');
const orgProfileSteps = require(__srcdir + '/steps/settings/orgProfileSteps.js');


let bktTabSteps = new bucketsSteps(__wdriver);
let setSteps = new settingsSteps(__wdriver);
let teleTabSteps = new telegrafsSteps(__wdriver);
let scrTabSteps = new scrapersSteps(__wdriver);
let varTabSteps = new variablesSteps(__wdriver);
let memTabSteps = new membersSteps(__wdriver);
let tlateTabSteps = new templatesSteps(__wdriver);
let labTabSteps = new labelsSteps(__wdriver);
let tknTabSteps = new tokensSteps(__wdriver);
let opTabSteps = new orgProfileSteps(__wdriver);

Then(/^the Settings page is loaded$/, {timeout: 2 * 5000}, async() => {
    await setSteps.isLoaded();
    await setSteps.verifyIsLoaded();
    await setSteps.verifyHeaderContains('Settings');
});

Then(/^the buckets tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await bktTabSteps.isLoaded();
});

Then(/^the Telegraf Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await teleTabSteps.isLoaded();
});

When(/^click the settings tab "(.*?)"$/,  async(name) => {
    await setSteps.clickTab(name);
});

Then(/^the Scrapers Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await scrTabSteps.isLoaded();
});

Then(/^the variables Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await varTabSteps.isLoaded();
});

Then(/^the templates Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await tlateTabSteps.isLoaded();
});

Then(/^the labels Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await labTabSteps.isLoaded();
});

Then(/^the tokens Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await tknTabSteps.isLoaded();
});

Then(/^the members Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await memTabSteps.isLoaded();
});

Then(/^the org profile Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await opTabSteps.isLoaded();
});
