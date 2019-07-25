const influxPage = require(__srcdir + '/pages/influxPage.js')
const { By, Key, promise, until} = require('selenium-webdriver');

const pageHeader = '[data-testid=page-header]'

class settingsPage extends influxPage {

    constructor(driver){
        super(driver)
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: pageHeader}])
    }

    async isTabLoaded(tabUrlPart, selectors = undefined){
        if(selectors) {
            await super.isLoaded(selectors.concat([{type: 'css', selector: pageHeader}]), tabUrlPart)
        }else{
            await super.isLoaded([{type: 'css', selector: pageHeader}], tabUrlPart)
        }
    }

}

module.exports = settingsPage
