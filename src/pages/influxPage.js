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

    /*
    async isLoaded(){
        await super.isLoaded([{type:'css', selector:navMenu}], urlCtx)
    }*/

    //N.B. Method overloading not supported in JS - however this page is extended

    async isLoaded(selectors = undefined, url = undefined){
        if(!selectors){
            await super.isLoaded([{type:'css', selector:navMenu}], urlCtx)
            return;
        }

        if(url){
            await super.isLoaded(selectors.concat([{type: 'css', selector: navMenu}]),url)
        }else{
            await super.isLoaded(selectors.concat([{type: 'css', selector: navMenu}]), urlCtx)
        }
    }

}

module.exports = influxPage
