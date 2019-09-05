const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const tabsCss = '[data-testid=tabs]';
const tabsXpath = '//*[@data-testid=\'tabs\']';
const pageTitle = '[data-testid=\'page-title\']';

const urlCtx = 'settings';

class loadDataPage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: tabsCss}], urlCtx);
    }

    async isTabLoaded(tabUrlPart, selectors = undefined){
        if(selectors) {
            await super.isLoaded(selectors.concat([{type: 'css', selector: tabsCss}]), tabUrlPart);
        }else{
            await super.isLoaded([{type: 'css', selector: tabsCss}], tabUrlPart);
        }
    }

    async getTabByName(name){
        return await this.driver.findElement(By.xpath(`${tabsXpath}//div[@data-testid='tabs--tab' and @id='${name.toLowerCase()}']`));
    }

    async getPageTitle(){
        return await this.driver.findElement(By.css(pageTitle));
    }

}

module.exports = loadDataPage;
