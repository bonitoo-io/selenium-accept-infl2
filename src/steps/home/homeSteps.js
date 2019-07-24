const {Builder, By, Key, promise, until} = require('selenium-webdriver');
const expect = require('chai').expect;
const baseSteps = require(__srcdir + '/steps/baseSteps.js')
const homePage = require(__srcdir + '/pages/home/homePage.js')

class homeSteps extends baseSteps {

    constructor(driver){
        super(driver)
        this.homePage = new homePage(driver)
    }

    async isLoaded(){
        await this.homePage.isLoaded()
    }


}


module.exports = homeSteps
