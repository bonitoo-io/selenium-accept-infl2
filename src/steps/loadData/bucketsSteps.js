const expect = require('chai').expect;
const { By } = require('selenium-webdriver');

const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const bucketsTab = require(__srcdir + '/pages/loadData/bucketsTab.js');


class bucketsSteps extends baseSteps {

    constructor(driver){
        super(driver);
        this.bucketsTab = new bucketsTab(driver);
    }

    async isLoaded(){
        await this.bucketsTab.isTabLoaded();
    }

    async verifyOrderByName(bucketNames){
        let namesArray = bucketNames.split(',');
        await this.bucketsTab.getBucketCards().then(async cards => {
            for( let i = 0; i < cards.length; i++){
                let cardName = await cards[i].findElement(By.xpath('.//span[contains(@class,\'cf-resource-name--text\')]/span'));
                let cardText = await cardName.getText();
                if(namesArray[i].toUpperCase() === 'DEFAULT'){
                    expect(cardText).to.equal(__defaultUser.bucket);
                }else {
                    expect(cardText).to.equal(namesArray[i]);
                }
            }
        });
    }

    async clickCreateBucket(){
        await this.bucketsTab.getCreateBucketBtn().then(async button => {
            await button.click();
        });
    }

    async verifyCreateBucketPopup(){
        await this.assertVisible(await this.bucketsTab.getPopupContainer());
        await this.assertVisible(await this.bucketsTab.getPopupTitle());
        await this.assertVisible(await this.bucketsTab.getPopupInputName());
        await this.assertVisible(await this.bucketsTab.getPopupRetentionNever());
        await this.assertVisible(await this.bucketsTab.getPopupRetentionIntervals());
        await this.assertVisible(await this.bucketsTab.getPopupCancelButton());
        await this.assertVisible(await this.bucketsTab.getPopupDismissButton());
        await this.assertVisible(await this.bucketsTab.getPopupCreateButton());
    }

    async verifyCreateBucketPopupNotPresent(){
        await this.assertNotPresent(await bucketsTab.getPopupContainerSelector());
        await this.assertNotPresent(await bucketsTab.getPopupTitleSelector());
    }

    async verifyCreateBucketCreateButtonEnabled(enabled){
        await expect(await (await this.bucketsTab.getPopupCreateButton()).isEnabled()).to.equal(enabled);
    }

    async dismissBucketPopup(){

        await this.bucketsTab.getPopupDismissButton().then(async btn => {
            await btn.click().then( async () => {
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupContainerSelector()));
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupTitleSelector()));
            });
        });
    }

    async cancelBucketPopup(){
        await this.bucketsTab.getPopupCancelButton().then(async btn => {
            await btn.click().then(async() => {
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupContainerSelector()));
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupTitleSelector()));
            });
        });
    }
}

module.exports = bucketsSteps;

