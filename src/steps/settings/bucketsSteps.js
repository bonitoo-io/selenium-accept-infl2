const {Builder, By, Key, promise, until} = require('selenium-webdriver');
const expect = require('chai').expect;
const baseSteps = require(__srcdir + '/steps/baseSteps.js')
const bucketsTab = require(__srcdir + '/pages/settings/bucketsTab.js')

class bucketsSteps extends baseSteps {

    constructor(driver){
        super(driver)
        this.bucketsTab = new bucketsTab(driver)
    }

    async isLoaded(){
        await this.bucketsTab.isTabLoaded()
    }

}

module.exports = bucketsSteps

