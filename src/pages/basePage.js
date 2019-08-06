const { By, until} = require('selenium-webdriver');

const notificationSuccessMsg = '[data-testid=notification-success] div.notification-message';
const notificationErrorMsg = '[data-testid=notification-error] div.notification-message';
const notificationCloseButton = '[data-testid=notification-success] button.notification-close';

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

        selectors.forEach(async (selector) => {
            switch(selector.type){
            case 'css':
                await this.driver.wait(until.elementLocated(By.css(selector.selector)));
                break;
            case 'xpath':
                await this.driver.wait(until.elementLocated(By.xpath(selector.selector)));
                break;
            default:
                throw `Unkown selector ${selector.type}`;
            }

            // TODO - implement other selector types
        });
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

}

module.exports = basePage;
