const basePage = require(__srcdir + '/pages/basePage.js')
const { By, Key, promise, until} = require('selenium-webdriver');

const headerMain = '[data-testid=admin-step--head-main]'
const navCrumbToken = 'data-testid=nav-step--'
const inputFieldToken = 'data-testid=input-field--'
const nextButton = `[data-testid=next]`


class initialSetupPage extends basePage {

    constructor(driver){
        super(driver)
    }

    async getHeaderMain(){
        return await this.driver.findElement(By.css(headerMain));
    }


    async getCrumbStep(step){
        return await this.driver.findElement(By.css(`[${navCrumbToken}${step}]`));
    }

    async getInputField(name){
        return await this.driver.findElement(By.css(`[${inputFieldToken}${name}]`))
    }

    async getNextButton(){
        return this.driver.wait(until.elementLocated(By.css(nextButton)))
        //return await this.driver.findElement(By.css(nextButton))
    }

}

module.exports = initialSetupPage;
