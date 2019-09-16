import { Then, When } from 'cucumber';

const scrapersSteps = require(__srcdir + '/steps/loadData/scrapersSteps.js');
let scrTabSteps = new scrapersSteps(__wdriver);


Then(/^there is a scraper card for "(.*)"$/, {timeout: 10000}, async card => {
    await scrTabSteps.verifyExistsCardByName(card);
});

Then(/^the scrapers tab is loaded$/, {timeout: 10000}, async () => {
    await scrTabSteps.verifyScrapersTabIsLoaded();
});

When(/^click the create scraper button empty$/, async () => {
    await scrTabSteps.clickCreateScraperButtonEmpty();
});

When(/^click the create scraper button from the header$/, async () => {
    await scrTabSteps.clickCreateScraperButtonInHeader();
});

Then(/^the create scraper button empty is no longer present$/, async() => {
   await scrTabSteps.verifyCreateScraperEmptyNotPresent();
});
