const fs = require('fs')
const expect = require('chai').expect;


const basePage = require (__srcdir + '/pages/basePage.js')

class baseSteps{
    constructor(driver){
        this.driver = driver
        this.basePage = new basePage(driver)
    }

    async delay(timeout){
        await this.driver.sleep(timeout)
    }

    async open(url){
        await this.driver.get(url)
    }

    async openBase(){
        await this.driver.get( `${__config.protocol}://${__config.host}:${__config.port}/`)
        await this.driver.wait(function(driver = this.driver) {
            return driver.executeScript('return document.readyState').then(function(readyState) {
                return readyState === 'complete';
            });
        });

    }

    async waitForPageLoad(){
        await this.driver.wait(function(driver = this.driver) {
            return driver.executeScript('return document.readyState').then(function(readyState) {
                return readyState === 'complete';
            });
        });
    }

    async isNotificationMessage(message){
        await this.basePage.getNoficicationSuccessMsg().then(async elem => {
            await elem.getText().then(async eltxt => {
                await expect(eltxt).to.equal(message)
            }).catch(async err => {
                console.error(err)
            })
        })
    }

    async containsNotificationText(text){
        await this.basePage.getNoficicationSuccessMsg().then(async elem => {
            await elem.getText().then(async eltxt => {
                await expect(eltxt).to.include(text)
            }).catch(async err => {
                console.error(err)
            })
        })
    }

    async closeAllNotifications(){
        await this.basePage.getNotificationCloseButtons().then(btns => {
            btns.forEach(async(btn) => {
                await btn.click()
            })
        })

    }
}

module.exports = baseSteps
