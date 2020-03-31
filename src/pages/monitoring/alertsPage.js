const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const pageTitle = '[data-testid=\'page-title\']';
const createCheckButton = '[data-testid=create-check]';
const createEndpointButton = '[data-testid=create-endpoint]';
const createRuleButton = '[data-testid=create-rule]';

const urlCtx = 'alerting';

class alertsPage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: pageTitle},
            {type: 'css', selector: createCheckButton},
            {type: 'css', selector: createEndpointButton},
            {type: 'css', selector: createRuleButton}], urlCtx);
    }


    async getPageTitle(){
        return await this.driver.findElement(By.css(pageTitle));
    }

    async getCreateCheckButton(){
        return await this.driver.findElement(By.css(createCheckButton));
    }

    async getCreateEndpointButton(){
        return await this.driver.findElement(By.css(createEndpointButton));
    }

    async getCreateRuleButton(){
        return await this.driver.findElement(By.css(createRuleButton));
    }


}

module.exports = alertsPage;
