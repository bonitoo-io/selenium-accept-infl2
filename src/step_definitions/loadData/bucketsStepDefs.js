import { Then, When } from 'cucumber';
const bucketsSteps = require(__srcdir + '/steps/loadData/bucketsSteps.js');

let bktTabSteps = new bucketsSteps(__wdriver);

Then(/^the buckets are sorted as "(.*)"$/, async (bucketNames) => {
    await bktTabSteps.verifyOrderByName(bucketNames);
});

When(/^click the Create Bucket button$/, async () => {
    await bktTabSteps.clickCreateBucket();
});

Then(/^the Create Bucket Popup is loaded$/, async () => {
    await bktTabSteps.verifyCreateBucketPopup();
});

Then(/^the Create button of Create Bucket Popup is disabled$/, async () => {
    await bktTabSteps.verifyCreateBucketCreateButtonEnabled(false);
});

//Waiting for dismissal can take a few secs
When(/^dismiss the Create Bucket Popup$/, {timeout: 2 * 5000}, async () => {
    await bktTabSteps.dismissBucketPopup();
});

// Should be not present - removed from DOM
Then(/^the Create Bucket Popup is not present$/, {timeout: 2 * 5000}, async () => {
    await bktTabSteps.verifyCreateBucketPopupNotPresent();
});

//Waiting for dismissal can take a few secs
When(/^cancel the Create Bucket Popup$/, {timeout: 2 * 5000}, async () => {
    await bktTabSteps.cancelBucketPopup();
});
