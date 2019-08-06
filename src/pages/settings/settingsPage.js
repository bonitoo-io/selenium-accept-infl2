const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const tabsXpath = '//div[@class = \'tabs\']';

const urlCtx = 'settings';

class settingsPage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'xpath', selector: tabsXpath}], urlCtx);
    }

    async isTabLoaded(tabUrlPart, selectors = undefined){
        if(selectors) {
            await super.isLoaded(selectors.concat([{type: 'xpath', selector: tabsXpath}]), tabUrlPart);
        }else{
            await super.isLoaded([{type: 'xpath', selector: tabsXpath}], tabUrlPart);
        }
    }

    async getTabByName(name){
        return await this.driver.findElement(By.xpath(`${tabsXpath}//a[text()='${name}']`));
    }

}

module.exports = settingsPage;
