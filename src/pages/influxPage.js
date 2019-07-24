const basePage = require(__srcdir + '/pages/basePage.js')
const { By, Key, promise, until} = require('selenium-webdriver');

const navMenu = "[data-testid=nav-menu]"
const urlCtx = 'orgs'

class influxPage extends basePage {

    constructor(driver){
        super(driver)
    }

    async getNavMenu(){
        return await this.driver.findElement(By.css(navMenu))
    }

    async isLoaded(){
        await super.isLoaded([{type:'css', selector:navMenu}], urlCtx)
    }


}

module.exports = influxPage
