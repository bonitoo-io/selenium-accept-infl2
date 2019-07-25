const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const logoutButton = '[data-testid=button]';

// TODO - add selectors - especially for isLoaded below

class homePage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async getLogoutButton(){
        return await this.driver.findElement(By.css(logoutButton));
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: logoutButton}]);
    }

}

module.exports = homePage;
