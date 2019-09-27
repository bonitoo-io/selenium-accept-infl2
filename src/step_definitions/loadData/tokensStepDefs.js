import { Then, When } from 'cucumber';

const tokensSteps = require(__srcdir + '/steps/loadData/tokensSteps.js');

let tknSteps = new tokensSteps(__wdriver);

Then(/^the tokens tab is loaded$/, async () => {
    await tknSteps.isLoaded();
});

Then(/^the tokens list contains the token described as "(.*)"$/, async descr => {
    await tknSteps.verifyTokenInListByDescr(descr);
});

When(/^click the generate token dropdown$/, async () => {
    await tknSteps.clickGenerateTokenDropdown();
});

When(/^click the generate token item "(.*)"$/, async item => {
   await tknSteps.clickGenerateTokenItem(item);
});

Then(/^the generate read-write token popup is loaded$/, async () => {
    await tknSteps.verifyGenReadWriteTokenPopup();
});

When(/^click the "(.*)" radio button "(.*)"$/, async (mode, set) => {
   await tknSteps.clickModeScopeRadioButton(mode, set);
});

Then(/^the "(.*)" panel shows the empty state text$/, async mode => {
   await tknSteps.verifyPanelEmptyState(mode);
});

Then(/^the "(.*)" panel bucket selector is present$/, async mode => {
    await tknSteps.verifyBucketSelectorVisible(mode);
});

Then(/^the bucket selector for the "(.*)" panel is not present$/, async mode => {
    await tknSteps.verifyBucketSelectorNotPresent(mode);
});

Then(/^the "(.*)" panel empty state text is not present$/, async mode => {
   await tknSteps.verifyEmptyStateTextNotPresent(mode);
});

Then(/^the "(.*)" panel bucket list contains "(.*)"$/, async (mode, buckets) => {
   await tknSteps.verifyPanelBucketList(mode, buckets.replace('DEFAULT', __defaultUser.bucket));
});

When(/^filter the "(.*)" panel bucket selector with "(.*)"$/, {timeout: 10000 }, async (mode, term) => {
    await tknSteps.filterPanelBucketsSelector(mode, term);
   // await tknSteps.delay(5000)
});

Then(/^the "(.*)" panel bucket list does not contain "(.*)"$/, {timeout: 10000}, async (mode, buckets) => {
    await tknSteps.verifyPanelBucketsNotPresent(mode, buckets.replace('DEFAULT', __defaultUser.bucket));
});

When(/^clear the "(.*)" panel bucket selector$/, async mode => {
    await tknSteps.clearPanelBucketsSelector(mode);
});

When(/^click "(.*)" panel select all buckets$/, async mode => {
    await tknSteps.clickSelectAllBuckets(mode);
});
