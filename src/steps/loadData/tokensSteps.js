const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const tokensTab = require(__srcdir + '/pages/loadData/tokensTab.js');

class tokensSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.tknTab = new tokensTab(driver);
    }

    async isLoaded(){
        await this.tknTab.isTabLoaded();
    }

    async verifyTokenInListByDescr(descr){
        await this.assertVisible(await this.tknTab.getTokenCellByDescr(descr));
    }

    async clickGenerateTokenDropdown(){
        await this.clickAndWait(await this.tknTab.getGenerateTokenDropdownBtn()); // todo better wait
    }

    async clickGenerateTokenItem(item){
        await this.clickAndWait(await this.tknTab.getGenerateTokenItem(item)); //todo better wait
    }

    async verifyGenReadWriteTokenPopup(){
        await this.assertVisible(await this.tknTab.getPopupTitle());
        await this.assertVisible(await this.tknTab.getPopupDismiss());
        await this.assertVisible(await this.tknTab.getPopupCancel());
        await this.assertVisible(await this.tknTab.getPopupSave());
        await this.assertVisible(await this.tknTab.getDescrInput());
        await this.assertVisible(await this.tknTab.getTypeRadioButton('Read', 'Scoped'));
        await this.assertVisible(await this.tknTab.getTypeRadioButton('Read', 'All Buckets'));
        await this.assertVisible(await this.tknTab.getTypeRadioButton('Write', 'Scoped'));
        await this.assertVisible(await this.tknTab.getTypeRadioButton('Write', 'All Buckets'));
        await this.assertVisible(await this.tknTab.getSearchBuckets('Read'));
        await this.assertVisible(await this.tknTab.getSearchBuckets('Write'));
        await this.verifyElementContainsText(await this.tknTab.getPopupTitle(), 'Generate Read/Write Token');
    }

    async verifyAllAccessTokenPopup(){
        await this.assertVisible(await this.tknTab.getPopupTitle());
        await this.assertVisible(await this.tknTab.getPopupDismiss());
        await this.assertVisible(await this.tknTab.getAllAccessCancelButton());
        await this.assertVisible(await this.tknTab.getAllAccessSaveButton());
        await this.assertVisible(await this.tknTab.getAllAccessDescrInput());
        await this.assertVisible(await this.tknTab.getPopupAlert());
        await this.verifyElementContainsText(await this.tknTab.getPopupTitle(), 'Generate All Access Token');
        await this.verifyPopupAlertMatchesRegex(/^This token will be able to .* to anything in this organization$/);
    }

    async clickModeScopeRadioButton(mode, set){
        await this.clickAndWait(await this.tknTab.getTypeRadioButton(mode, set));
    }

    async verifyPanelEmptyState(mode){
        await this.assertVisible(await this.tknTab.getEmptyStateText(mode));
    }

    async verifyBucketSelectorVisible(mode){
        await this.assertVisible(await this.tknTab.getSearchBuckets(mode));
    }

    async verifyBucketSelectorNotPresent(mode){
        await this.assertNotPresent(await tokensTab.getSearchBucketsSelector(mode));
    }

    async verifyEmptyStateTextNotPresent(mode){
        await this.assertNotPresent(await tokensTab.getEmptyStateTextSelector(mode));
    }

    async verifyPanelBucketList(mode, buckets){
        let buckArr = buckets.split(',');
       // console.log("DEBUG buckArr " + buckArr);
        for(let i = 0; i < buckArr.length; i++){
         //   console.log("DEBUG selector " + JSON.stringify(tokensTab.getSearchBucketsListItemSelector(mode, buckArr[i])) );
            await this.assertVisible(await this.tknTab.getSearchBucketsListItem(mode, buckArr[i]));
        }
    }

    async verifyPanelBucketsNotPresent(mode, buckets){
        let buckArr = buckets.split(',');
        for(let i = 0; i < buckArr.length; i++){
            await this.assertNotPresent(await tokensTab.getSearchBucketsListItemSelector(mode, buckArr[i]));
        }
    }

    async filterPanelBucketsSelector(mode, term){
        await this.tknTab.getSearchBuckets(mode).then(async elem => {
            await this.clearInputText(elem).then(async () => {
                await elem.sendKeys(term).then(async () => {
                    this.delay(150); //todo better wait
                })
            })
        })
    }

    async clearPanelBucketsSelector(mode){
        await this.clearInputText(await this.tknTab.getSearchBuckets(mode));
    }

    async clickSelectAllBuckets(mode){
        await this.clickAndWait(await this.tknTab.getSelectAllBuckets(mode));
    }

    async clickDeselectAllBuckets(mode){
        await this.clickAndWait(await this.tknTab.getDeselectAllBuckets(mode));
    }

    async clickTokenPopupSelectBucket(mode, bucket){
        await this.clickAndWait(await this.tknTab.getSearchBucketsListItem(mode, bucket));
    }

    async verifyPanelBucketsSelected(mode, buckets){
        let buckArr = buckets.split(',');
        for(let i = 0; i < buckArr.length; i++){
            await this.verifyElementContainsClass(
                await this.tknTab.getSearchBucketsListItem(mode, buckArr[i]),
                'selected');
        }
    }

    async verifyPanelBucketsNotSelected(mode, buckets){
        let buckArr = buckets.split(',');
        for(let i = 0; i < buckArr.length; i++){
            await this.verifyElementDoesNotContainClass(
                await this.tknTab.getSearchBucketsListItem(mode, buckArr[i]),
                'selected');
        }
    }

    async clickAllAccessPopupCancel(){
        await this.clickAndWait(await this.tknTab.getAllAccessCancelButton());
    }

    async setAllAccessTokenDescription(descr){
        await this.tknTab.getAllAccessDescrInput().then(async input => {
            await input.sendKeys(descr).then(async () => {
                await this.delay(150); //todo better wait
            })
        })
    }

    async setReadWriteTokenDescription(descr){
        await this.tknTab.getDescrInput().then(async input => {
            await input.sendKeys(descr).then(async () => {
                await this.delay(150); //todo better wait
            })
        })
    }

    async clickGenerateTokenAllAccessSave(){
        await this.clickAndWait(await this.tknTab.getAllAccessSaveButton()); // todo better wait
    }

    async clickGenerateTokenReadWriteSave(){
        await this.clickAndWait(await this.tknTab.getPopupSave()); // todo better wait
    }

    async disableTokenInList(descr){
        await this.clickAndWait(await this.tknTab.getTokenCardDisableToggle(descr))
    }

    async verifyTokenIsDisabled(descr){
        await this.verifyElementDoesNotContainClass(
            await this.tknTab.getTokenCardDisableToggle(descr),
            'active')
    }




}

module.exports = tokensSteps;
