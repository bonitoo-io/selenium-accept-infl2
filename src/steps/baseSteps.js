//const fs = require('fs')
const expect = require('chai').expect;
const assert = require('chai').assert;
const { By } = require('selenium-webdriver');
const influxUtils = require(__srcdir + '/utils/influxUtils.js');


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

    async hoverOver(element){
        let actions = await this.driver.actions({bridge: true});
        await actions.move({origin: element}).perform().then(async () => {
            //            console.log("DEBUG hover success ");
            //            await this.driver.sleep(1000)
            //console.log("SUCCESS " + resp)
        }).catch( err => {
            console.log('ERR ' + err);
            throw(err); // rethrow to cucumber - else error not flagged and step is success
        });
    }

    async assertVisible(element){
        await expect(await element.isDisplayed()).to.equal(true);
    }

    async assertNotVisible(element){
        await expect(await element.isDisplayed()).to.equal(false);
        /*await expect(await element.isDisplayed().catch(async err => { console.log("DEBUG err " + err); throw err;})).to.equal(false).catch( async err => {
            console.log("assertNotVisible Error: " + await element.getCssValue())
            throw(err);
        });*/
    }

    //selector type should be {type, selector}
    async assertNotPresent(selector){
        switch(selector.type){
        case 'css':
            await this.driver.findElements(By.css(selector.selector)).then(async elems => {
                await expect(elems.length).to.equal(0);
            }).catch(async err => {
                err += ' expected ' + JSON.stringify(selector) + ' to not be present';
                throw err;
            });
            break;
        case 'xpath':
            await this.driver.findElements(By.xpath(selector.selector)).then(async elems => {
                await expect(elems.length).to.equal(0);
            }).catch(async err => {
                err.message += ' expected ' + selector + ' to not be present';
                throw err;
            });
            break;
        default:
            throw `Unknown selector type ${selector}`;
        }
    }

    static async genFibonacciValues(count){
        let result = [];
        for(let i = 0; i < count; i++){
            if(i === 0){
                result.push(1);
            }else if(i === 1){
                result.push(2)
            }else{
                result.push(result[i-1] + result[i-2]);
            }
        }
        console.log("DEBUG result " + result.length + " count " + count);
        return result;
    }

    // 'start' should have time format e.g. -2h, 30m, 1d
    static async getIntervalMillis(count, start){
        let time = start.slice(0, -1);
        let fullInterval  = 0;
        let pointInterval = 0;
        switch(start[start.length - 1]){
            case 'd': //days
                fullInterval = Math.abs(parseInt(time)) * 24 * 60000 * 60;
                break;
            case 'h': //hours
                fullInterval = Math.abs(parseInt(time)) * 60000 * 60;
                break;
            case 'm': //minutes
                fullInterval = Math.abs(parseInt(time)) * 60000;
                break;
            case 's': //seconds
                fullInterval = Math.abs(parseInt(time)) * 1000;
                break;
            default:
                throw new `unhandle time unit ${start}`;
        }

        pointInterval = fullInterval / count;
        return {full: fullInterval, step: pointInterval}
    }


    // 'start' should be in flux time format e.g. -2h, -1d, -30m
    async verifyBucketContains(bucket, user, count, mode, value, start){
        // NEED TO LOGIN FIRST OTHERWISE 401 - not using same cookies as browser
//        console.log("verifyBucketContains() TO BE IMPLEMENTED");
        let query = `from(bucket: "${bucket}")
    |> range(start: ${start})
    |> filter(fn: (r) => r._measurement == "${mode}")
    |> filter(fn: (r) => r._field == "${value}")`;

        let results = await influxUtils.query(user.orgId, query);
        console.log("DEBUG results: " + results);
    }
}

module.exports = baseSteps;
