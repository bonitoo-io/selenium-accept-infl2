const { By, Condition, until, StaleElementReferenceError} = require('selenium-webdriver');

const notificationSuccessMsg = '[data-testid=notification-success] div.notification-message';
const notificationErrorMsg = '[data-testid=notification-error] div.notification-message';
const notificationCloseButton = '[data-testid=notification-success] button.notification-close';
const popupOverlayContainer = '[data-testid=overlay--container]';
const popupFormElementError  = '[data-testid=form--element-error]';
const formInputError = '[data-testid=input-error]';
const popupDismiss = '[data-testid=overlay--header] button[class*=dismiss]';
const popupWizardContinue = '[data-testid=overlay--body] [data-testid=next]';
const popupWizardTitle = '[data-testid=overlay--body] .wizard-step--title';
const popupWizardSubTitle = '[data-testid=overlay--body] .wizard-step--sub-title';

class basePage{

    constructor(driver){
        this.driver = driver;
    }

    delay(timeout){
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

    async waitUntilElementCss(selector){
        await this.driver.wait(until.elementLocated(By.css(selector)));
    }

    async waitUntilElementVisibleCss(selector){
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.css(selector))));
    }


    // selectors should be array of {type, selector}
    async isLoaded(selectors, url = undefined){
        if(url){
            await this.driver.wait(until.urlContains(url));
        }

        //selectors.forEach(async (selector) => { //N.B. for each seems to be swallowing thrown errors
        for(let i = 0; i < selectors.length; i++) {
            switch (selectors[i].type) {
            case 'css':
                await this.driver.wait(until.elementLocated(By.css(selectors[i].selector)), 5000);
                break;
            case 'xpath':
                await this.driver.wait(until.elementLocated(By.xpath(selectors[i].selector)), 5000);
                break;
            default:
                throw `Unkown selector type ${JSON.stringify(selectors[i])}`;
            }

            // TODO - implement other selector types
        }
        //});
    }

    async getNoficicationSuccessMsgs(){
        await this.waitUntilElementVisibleCss(notificationSuccessMsg);
        return await this.driver.findElements(By.css(notificationSuccessMsg));
    }

    async getNotificationErrorMsgs(){
        await this.waitUntilElementVisibleCss(notificationErrorMsg);
        return await this.driver.findElements(By.css(notificationErrorMsg));
    }

    async getNotificationCloseButtons(){
        return await this.driver.findElements(By.css(notificationCloseButton));
    }

    // selector shold be of {type, selector}
    // helper to avoid stale element exceptions etc.
    async smartGetElement(selector, timeout = this.driver.manage().getTimeouts().implicit) {
        let resultElem; // check staleness with resultElem.enabled() or similar
        for (let i = 0; i < 3; i++) {
            try {
                switch (selector.type) {
                    case 'css':
                        await this.driver.wait(until.elementLocated(By.css(selector.selector)), timeout);
                        resultElem = await this.driver.findElement(By.css(selector.selector)).catch(async err => {
                            console.log('DEBUG CAUGHT ERROR ' + JSON.stringify(err));
                            console.log('AT ' + selector.selector);
                            throw err;
                        });
                        break;
                    case 'xpath':
                        await this.driver.wait(until.elementLocated(By.xpath(selector.selector)), timeout);
                        resultElem = await this.driver.findElement(By.xpath(selector.selector)).catch(async err => {
                            console.log('DEBUG CAUGHT ERROR ' + JSON.stringify(err));
                            console.log('AT ' + selector.selector);
                            throw err;
                        });
                        break;
                    default:
                        throw `Unkown selector type ${JSON.stringify(selector)}`;
                }
                await resultElem.isEnabled();
            } catch (e) {
                if (e instanceof StaleElementReferenceError && i !== 2) {
                    console.log("DEBUG caught " + e)
                    //continue - try to get elem again
                } else {
                    throw e;
                }
            }
        }
        return resultElem;
    }

    // selector should be of {type, selector}
    async getUntilElementNotPresent(selector){
        return new Condition('for no element to be located ' + selector, async () => {
            switch(selector.type) {
            case 'css':
                return await this.driver.findElements(By.css(selector.selector)).then(function (elements) {
                    return elements.length === 0;
                });
            case 'xpath:':
                return await this.driver.findElements(selector).then(function (elements) {
                    return elements.length === 0;
                });
            default:
                throw `Unkown selector type ${JSON.stringify(selector)}`;
            }
        });
    }

    async getPopupOverlayContainer(){
        return await this.driver.findElement(By.css(popupOverlayContainer));
    }

    static getPopupOverlayContainerSelector(){
        return { type: 'css', selector: popupOverlayContainer};
    }

    async getPopupFormElementError(){
        return await this.driver.findElement(By.css(popupFormElementError));
    }

    static getPopupFormElementErrorSelector(){
        return { type: 'css', selector: popupFormElementError};
    }

    async getFormInputErrors(){
        return await this.driver.findElements(By.css(formInputError));
    }

    static getFormInputErrorSelector(){
        return { type: 'css', selector: formInputError};
    }

    async getPopupDismiss(){
        return await this.driver.findElement(By.css(popupDismiss));
    }

    async getPopupWizardContinue(){
        return await this.driver.findElement(By.css(popupWizardContinue));
    }

    static getPopupWizardContinueSlector(){
        return {type: 'css', selector: popupWizardContinue};
    }

    async getPopupWizardTitle(){
        return await this.driver.findElement(By.css(popupWizardTitle));
    }

    async getPopupWizardSubTitle(){
        return await this.driver.findElement(By.css(popupWizardSubTitle));
    }


}

module.exports = basePage;
