const { By, Key, promise, until} = require('selenium-webdriver');

const notificationSuccessMsg = '[data-testid=notification-success] div.notification-message'

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
        })
    }

    async getNoficicationSuccessMsg(){
        return await this.driver.findElement(By.css(notificationSuccessMsg))
    }

}

module.exports = basePage
