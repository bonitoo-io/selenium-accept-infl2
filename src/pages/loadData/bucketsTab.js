const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');
const { By } = require('selenium-webdriver');

const bucketCards = '[data-testid=bucket--card]';
const createBucketBtn = 'button[data-testid=\'Create Bucket\']';
const filterInput = '[data-testid=search-widget]';
const nameSorter = '[data-testid=\'resource-list--sorter\']:first-of-type';
const policySorter = '[data-testid=\'resource-list--sorter\']:last-of-type';

// Create Bucket Popup
const popupContainer = '[data-testid=overlay--container]';
const popupTitle = '[data-testid=overlay--header] div';
const popupInputName = '[data-testid=overlay--body] [data-testid=input-field]';
const popupRetentionNever = '[data-testid=retention-never--button]';
const popupRetentionIntervals = '[data-testid=retention-intervals--button]';
const popupCancelButton = '[data-testid=overlay--body] button[title=Cancel]';
const popupDismissButton = '[data-testid=overlay--header] button[class*=dismiss]';
const popupCreateButton = '[data-testid=overlay--body] button[title*=Create]';
const popupRPIntervalControls = '[data-testid=form--element] [data-testid=grid--row]';
const popupRPDaysInput = popupRPIntervalControls + ' [data-testid=grid--column]:nth-of-type(1) input';
const popupRPHoursInput = popupRPIntervalControls + ' [data-testid=grid--column]:nth-of-type(2) input';
const popupRPMinutesInput = popupRPIntervalControls + ' [data-testid=grid--column]:nth-of-type(3) input';
const popupRPSecondsInput = popupRPIntervalControls + ' [data-testid=grid--column]:nth-of-type(4) input';
const popupFormError = '[data-testid=form--element-error]';

//Edit Bucket Popup
const popupSaveChanges = '[data-testid=\'button\'][type=submit]';
const popupHelpText = '[data-testid=form--help-text]';

const urlCtx = 'buckets';

class bucketsTab extends loadDataPage {

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx);
    }

    async getBucketCards(){
        return await this.driver.findElements(By.css(bucketCards));
    }

    async getCreateBucketBtn(){
        return await this.driver.findElement(By.css(createBucketBtn));
    }

    async getFilterInput(){
        return await this.driver.findElement(By.css(filterInput));
    }

    async getNameSorter(){
        return await this.driver.findElement(By.css(nameSorter));
    }

    static async getNameSorterSelector(){
        return {type: 'css', selector: nameSorter};
    }

    async getPolicySorter(){
        return await this.driver.findElement(By.css(policySorter));
    }

    //Create Bucket Popup
    async getPopupContainer(){
        return await this.driver.findElement(By.css(popupContainer));
    }

    static getPopupContainerSelector(){
        return { type: 'css',  selector: popupContainer };
    }

    async getPopupTitle(){
        return await this.driver.findElement(By.css(popupTitle));
    }

    static getPopupTitleSelector(){
        return { type: 'css', selector: popupTitle};
    }

    async getPopupInputName(){
        return await this.driver.findElement(By.css(popupInputName));
    }

    async getPopupRetentionNever(){
        return await this.driver.findElement(By.css(popupRetentionNever));
    }

    async getPopupRetentionIntervals(){
        return await this.driver.findElement(By.css(popupRetentionIntervals));
    }

    async getPopupCancelButton(){
        return await this.driver.findElement(By.css(popupCancelButton));
    }

    async getPopupRPIntevalControls(){
        return await this.driver.findElement(By.css(popupRPIntervalControls));
    }

    static getPopupRPIntervalControlsSelector(){
        return { type: 'css',  selector: popupRPIntervalControls };
    }

    async getPopupRPDaysInput(){
        return await this.driver.findElement(By.css(popupRPDaysInput));
    }

    async getPopupRPHoursInput(){
        return await this.driver.findElement(By.css(popupRPHoursInput));
    }

    async getPopupRPMinutesInput(){
        return await this.driver.findElement(By.css(popupRPMinutesInput));
    }

    async getPopupRPSecondsInput(){
        return await this.driver.findElement(By.css(popupRPSecondsInput));
    }

    async getPopupFormError(){
        return await this.driver.findElement(By.css(popupFormError));
    }

    static getPopupFormErrorSelector(){
        return { type: 'css',  selector: popupFormError };
    }

    async getPopupDismissButton(){
        //return await this.driver.findElement(By.css(popupDismissButton));
        return await this.smartGetElement({type: 'css', selector: popupDismissButton});
    }

    static async getPopupDismissButtonSelector(){
        return popupDismissButton;
    }

    async getPopupHelpText(){
        return await this.driver.findElement(By.css(popupHelpText));
    }

    async getPopupCreateButton(){
        return await this.driver.findElement(By.css(popupCreateButton));
    }

    //get just the name link
    async getBucketCardName(name){
        return await this.driver.findElement(By.css(`[data-testid='bucket--card ${name}']`));
    }

    //get the whole card
    async getBucketCardByName(name){
        return await this.driver.findElement(By.xpath(`//div[div/div[@data-testid=\'bucket--card ${name}\']]`));
    }

    static async getBucketCardDeleteSelectorByName(name){
        return {type: 'xpath', selector: `//div[div/div/div[@data-testid=\'bucket--card ${name}\'] ]//*[@data-testid=\'context-delete-menu\']`};
    }

    async getBucketCardDeleteByName(name){
        return await this.driver.findElement(By.xpath(`//div[div/div/div[@data-testid='bucket--card ${name}'] ]//*[@data-testid='context-delete-menu']`));
    }

    static async getBucketCardSelectorByName(name){
        return {type: 'css', selector: `[data-testid='bucket--card ${name}']`}
    }

    async getBucketCardDeleteConfirmByName(name){
        return await this.smartGetElement({type: 'xpath', selector: `//div[div/div/div[@data-testid='bucket--card ${name}'] ]//*[@data-testid='context-delete-menu']/..//button[text() = 'Confirm']`})
        //return await this.driver.findElement(By.xpath(`//div[div/div/div[@data-testid='bucket--card ${name}'] ]//*[@data-testid='context-delete-menu']/..//button[text() = 'Confirm']`));
    };

    async getPopupSaveChanges(){
        return await this.driver.findElement(By.css(popupSaveChanges));
    }


}

module.exports = bucketsTab;
