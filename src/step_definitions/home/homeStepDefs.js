import { Then, When } from 'cucumber';
const homeSteps = require(__srcdir + '/steps/home/homeSteps.js');

let hSteps = new homeSteps(__wdriver);

Then(/^the home page is loaded$/, {timeout: 2 * 5000}, async () => {
    await hSteps.isLoaded();
    await hSteps.verifyIsLoaded();
});

When(/^click logout from the home page$/, async() => {
    await hSteps.clickLogout();
});

When(/^I click the panel "(.*)"$/, async title => {
    await hSteps.clickQuickStartPanel(title);
});

