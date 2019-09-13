import { Then, When } from 'cucumber';

const scrapersSteps = require(__srcdir + '/steps/loadData/scrapersSteps.js');
let scrTabSteps = new scrapersSteps(__wdriver);


Then(/^there is a scraper card for "(.*)"$/, {timeout: 10000}, async card => {
    await scrTabSteps.verifyExistsCardByName(card);
});
