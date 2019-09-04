const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');
const { By } = require('selenium-webdriver');

const bucketCards = '[data-testid=bucket--card]';
const createBucketBtn = 'button[data-testid=\'Create Bucket\']';

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

    async getBucketCardByName(name){
        return await this.driver.findElement(By.css(`[data-testid='bucket--card ${name}']`));
    }

    static async getBucketCardSelectorByName(name){
        return {type: 'css', selector: `[data-testid='bucket--card ${name.toLowerCase()}']`}
    }

    async getPopupSaveChanges(){
        return await this.driver.findElement(By.css(popupSaveChanges));
    }


}

module.exports = bucketsTab;
