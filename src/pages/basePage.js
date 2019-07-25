const { By, Key, promise, until} = require('selenium-webdriver');

const notificationSuccessMsg = '[data-testid=notification-success] div.notification-message'
const notificationCloseButton = '[data-testid=notification-success] button.notification-close'

class basePage{

    constructor(driver){
        this.driver = driver;
    }

    delay(timeout){
        return new Promise((resolve) => {
            setTimeout(resolve, timeout)
        })
    }

    async waitUntilElementCss(selector){
        await this.driver.wait(until.elementLocated(By.css(selector)))
    }

    // selectors should be array of {type, selector}
    async isLoaded(selectors, url = undefined){
        if(url){
            await this.driver.wait(until.urlContains(url))
        }

        selectors.forEach(async (selector, driver = this.driver) => {
            if(selector.type === 'css'){
                await this.driver.wait(until.elementLocated(By.css(selector.selector)))
            }
            // TODO - implement other selector types
        })
    }

    async getNoficicationSuccessMsgs(){
        await this.waitUntilElementCss(notificationSuccessMsg)
        return await this.driver.findElements(By.css(notificationSuccessMsg))
    }

    async getNotificationCloseButtons(){
        return await this.driver.findElements(By.css(notificationCloseButton))
    }

}

module.exports = basePage
