import { Then } from 'cucumber';
const bucketsSteps = require(__srcdir + '/steps/settings/bucketsSteps.js');
const settingsSteps = require(__srcdir + '/steps/settings/settingsSteps.js');

let bktTabSteps = new bucketsSteps(__wdriver);
let setSteps = new settingsSteps(__wdriver);

Then(/^the Settings page is loaded$/, {timeout: 2 * 5000}, async() => {
    await setSteps.isLoaded();
    await setSteps.verifyIsLoaded();
    await setSteps.verifyHeaderContains('Settings');
});

Then(/^the buckets tab is loaded$/, async() => {
    await bktTabSteps.isLoaded();
});
