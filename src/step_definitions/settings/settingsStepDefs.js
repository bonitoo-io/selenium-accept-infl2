import { Then } from 'cucumber';
const bucketsSteps = require(__srcdir + '/steps/settings/bucketsSteps.js');

let bktTabSteps = new bucketsSteps(__wdriver);

Then(/^the buckets tab is loaded$/, async() => {
    await bktTabSteps.isLoaded();
});
