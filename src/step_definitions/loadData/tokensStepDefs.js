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

When(/^select token type based on (.*) type$/, async privilege => {
    if(privilege.toLowerCase() === 'all'){
        await tknSteps.clickGenerateTokenItem('all-access');
    }else{
        await tknSteps.clickGenerateTokenItem('read-write');
    }
});

Then(/^the generate read-write token popup is loaded$/, async () => {
    await tknSteps.verifyGenReadWriteTokenPopup();
});

Then(/^the generate all-access token popup is loaded$/, async () => {
   await tknSteps.verifyAllAccessTokenPopup();
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

When(/^click "(.*)" panel deselect all buckets$/, async mode => {
    await tknSteps.clickDeselectAllBuckets(mode);
});

When(/^click the "(.*)" panel bucket "(.*)"$/, async (mode, bucket) => {
    await tknSteps.clickTokenPopupSelectBucket(mode, bucket);
});

Then(/^the "(.*)" panel buckets "(.*)" are selected$/, async (mode,buckets) => {
   await tknSteps.verifyPanelBucketsSelected(mode, buckets.replace('DEFAULT', __defaultUser.bucket));
});

Then(/^the "(.*)" panel buckets "(.*)" are not selected$/, async (mode, buckets) => {
    await tknSteps.verifyPanelBucketsNotSelected(mode, buckets.replace('DEFAULT', __defaultUser.bucket));
});

When(/^click all-access token popup cancel$/, async () => {
   await tknSteps.clickAllAccessPopupCancel();
});

When(/^set token description for (.*) as (.*)$/, async (privilege, description) => {
    if(privilege.toLowerCase() === 'all'){
        await tknSteps.setAllAccessTokenDescription(description);
    }else{
        await tknSteps.setReadWriteTokenDescription(description);
    }
});

When(/^set token privileges for (.*) as (.*)$/, async (bucket, privileges) => {
    let bkt = (bucket === 'DEFAULT') ? __defaultUser.bucket : bucket;

    if(privileges.toLowerCase() === 'all'){
        // nothing to do
    }else{
        if(privileges.toLowerCase().includes('r')){ //Read Privileges
            if(bkt.toLowerCase() === 'all'){
                await tknSteps.clickModeScopeRadioButton('Read', 'All Buckets');
            }else{
                await tknSteps.clickTokenPopupSelectBucket('Read', bkt)
            }
        }

        if(privileges.toLowerCase().includes('w')){ //Write Privileges
            if(bkt.toLowerCase() === 'all'){
                await tknSteps.clickModeScopeRadioButton('Write', 'All Buckets');
            }else{
                await tknSteps.clickTokenPopupSelectBucket('Write', bkt)
            }
        }
    }

});

When(/^click popup save based on (.*)$/, async privileges => {

    if(privileges.toLowerCase() === 'all'){
        await tknSteps.clickGenerateTokenAllAccessSave();
    }else{
        await tknSteps.clickGenerateTokenReadWriteSave();
    }
});

When(/^disable the token described as (.*)$/, async descr => {
    await tknSteps.disableTokenInList(descr);
});

Then(/^the token described as (.*) is disabled$/, async descr => {
    await tknSteps.verifyTokenIsDisabled(descr);
});
