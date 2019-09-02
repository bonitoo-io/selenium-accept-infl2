const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const pageTitle = '[data-testid=page-title]';
const nameInput = '[data-testid=page-header] [data-testid=input-field]';

class dashboardPage extends influxPage {

    constructor(driver) {
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: pageTitle}]);
    }


    async getPageTitle(){
        return await this.driver.findElement(By.css(pageTitle));
    }

    async getNameInput(){
        return await this.driver.findElement(By.css(nameInput));
    }

}

module.exports = dashboardPage;
