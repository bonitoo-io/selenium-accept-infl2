const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');
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

const urlCtx = 'buckets';

class bucketsTab extends settingsPage {

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

    async getPopupDismissButton(){
        //return await this.driver.findElement(By.css(popupDismissButton));
        return await this.smartGetElement({type: 'css', selector: popupDismissButton});
    }

    async getPopupDismissButtonSelector(){
        return popupDismissButton;
    }

    async getPopupCreateButton(){
        return await this.driver.findElement(By.css(popupCreateButton));
    }

}

module.exports = bucketsTab;
