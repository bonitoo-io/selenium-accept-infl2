import { Then, When } from 'cucumber';
const bucketsSteps = require(__srcdir + '/steps/loadData/bucketsSteps.js');
const telegrafsSteps = require(__srcdir + '/steps/loadData/telegrafsSteps.js');
const scrapersSteps = require(__srcdir + '/steps/loadData/scrapersSteps.js');

let bktTabSteps = new bucketsSteps(__wdriver);
let teleTabSteps = new telegrafsSteps(__wdriver);
let scrTabSteps = new scrapersSteps(__wdriver);

Then(/^the buckets tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await bktTabSteps.isLoaded();
});

Then(/^the Telegraf Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await teleTabSteps.isLoaded();
});

Then(/^the Scrapers Tab is loaded$/, {timeout: 2 * 5000}, async() => {
    await scrTabSteps.isLoaded();
});
