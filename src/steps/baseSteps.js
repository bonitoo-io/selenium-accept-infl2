//const fs = require('fs')
//const expect = require('chai').expect;
const assert = require('chai').assert;


const basePage = require (__srcdir + '/pages/basePage.js');

class baseSteps{
    constructor(driver){
        this.driver = driver;
        this.basePage = new basePage(driver);
    }

    async delay(timeout){
        await this.driver.sleep(timeout);
    }

    /* async open(url){
        await this.driver.get(url);
    } */

    async openBase(){
        await this.driver.get( `${__config.protocol}://${__config.host}:${__config.port}/`);
        await this.driver.wait(function(driver = this.driver) {
            return driver.executeScript('return document.readyState').then(function(readyState) {
                return readyState === 'complete';
            });
        });

    }

    async openContext(ctx){
        await this.driver.get( `${__config.protocol}://${__config.host}:${__config.port}/` + ctx);
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
        //wait a second for all notifications to load
        await this.driver.sleep(1000);

        await this.basePage.getNoficicationSuccessMsgs().then(async elems => {
            let match = false;

            for(var i = 0; i < elems.length; i++){
                if(await elems[i].getText() === message){
                    match = true;
                    break;
                }
            }

            assert(match, `Failed to find "${message}" in notifications`);
        });
    }

    async containsNotificationText(text){
        await this.basePage.getNoficicationSuccessMsgs().then(async elems => {
            let match = false;

            for(var i = 0; i < elems.length; i++){
                if((await elems[i].getText()).includes(text)){
                    match = true;
                    break;
                }
            }

            assert(match, `Failed to find notification containing "${text}"`);
        });
        /*
        await this.basePage.getNoficicationSuccessMsg().then(async elem => {
            await elem.getText().then(async eltxt => {
                await expect(eltxt).to.include(text)
            }).catch(async err => {
                console.error(err)
            })
        }) */
    }

    async containsErrorNotificationText(text){
        await this.basePage.getNotificationErrorMsgs().then(async elems => {
            let match = false;

            for(var i = 0; i < elems.length; i++){
                if((await elems[i].getText()).includes(text)){
                    match = true;
                    break;
                }
            }

            assert(match, `Failed to find error notification containing "${text}"`);
        });
    }

    async closeAllNotifications(){
        await this.basePage.getNotificationCloseButtons().then(btns => {
            btns.forEach(async(btn) => {
                await btn.click();
            });
        });

    }
}

module.exports = baseSteps;
