const basePage = require(__srcdir + '/pages/basePage.js')
const { By, Key, promise, until} = require('selenium-webdriver');

const navMenu = "[data-testid=nav-menu]"

class homePage extends basePage {

    constructor(driver){
        super(driver)
    }

}

module.exports = homePage
