//const fs = require('fs')
const expect = require('chai').expect;
const assert = require('chai').assert;
const { By, Key } = require('selenium-webdriver');
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
        await this.driver.sleep(500); //might not be loaded - todo better wait
        await this.basePage.getNotificationCloseButtons().then(btns => {
            btns.forEach(async(btn) => {
                await btn.click();
            });
        });
        await this.driver.sleep(500); //make sure are closed - todo better wait

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

    async verifyElementErrorMessage(msg, equal = true){
        await this.basePage.getPopupFormElementError().then(async elem => {
            await elem.getText().then(async elText => {
                if(equal) {
                    expect(elText).to.equal(msg);
                }else{
                    expect(elText).to.include(msg);
                }
            })
        })
    }

    async verifyNoElementErrorMessage(){
        await this.assertNotPresent(basePage.getPopupFormElementErrorSelector());
    }

    async verifyInputErrorIcon(){
        await this.basePage.getFormInputErrors(async elems => {
            expect(elems.length).to.be.above(0);
        })
    }

    async verifyNoFormInputErrorIcon(){
        await this.assertNotPresent(basePage.getFormInputErrorSelector())
    }

    async assertVisible(element){
        try {
            await expect(await element.isDisplayed()).to.equal(true)
        }catch(err){
            console.log("Assert Visible failed: " + err + "/n waiting for " + JSON.stringify(element));
            throw err;
        }
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
        let query = `from(bucket: "${bucket}")
    |> range(start: ${start})
    |> filter(fn: (r) => r._measurement == "${mode}")
    |> filter(fn: (r) => r._field == "${value}")`;

        let results = await influxUtils.query(user.orgid, query);
        let resTable = await (await results.split('\r\n')).filter((row) => {
            return row.split(',').length > 9;
        });

        let firstRow = resTable[1].split(',');
        let lastRow = resTable[resTable.length - 1].split(',');

        firstRow.shift();
        lastRow.shift();

        expect(parseInt(firstRow[5])).to.equal(1);
        expect(firstRow[6]).to.equal(value);
        expect(firstRow[7]).to.equal(mode);
        expect(parseInt(lastRow[5])).to.equal(233);
        expect(lastRow[6]).to.equal(value);
        expect(lastRow[7]).to.equal(mode);

    }

    async clickPopupWizardContinue(){
        await this.basePage.getPopupWizardContinue().then(async button => {
            await button.click().then(async () => {
               // await this.driver.wait( // this wait is not consistent
                    // await this.basePage.getUntilElementNotPresent(
                        //basePage.getPopupWizardContinueSlector())) //
                await this.driver.sleep(500); // todo better wait
            })
        })
    }

    async clickPopupWizardPrevious(){
        await this.clickAndWait(await this.basePage.getPopupWizardBack()); // todo better wait
    }

    async clickPopupWizardFinish(){
        await this.clickAndWait(await this.basePage.getPopupWizardContinue()); //todo better wait
    }

    async dismissPopup(){
        await this.basePage.getPopupDismiss().then(async button => {
            await button.click().then(async () => {
                await this.driver.sleep(200); // todo better wait
            })
        })
    }

    async verifyPopupNotPresent(){
        await this.assertNotPresent(await basePage.getPopupOverlayContainerSelector());
    }


    /*
      Since not currently refining waits - and focusing on velocity of adding new tests - use this
      for simple situations
     */
    async clickAndWait(element,
                       wait = async () => { await this.driver.sleep((await this.driver.manage().getTimeouts()).implicit/20) }){ //wait 1/10th implicit timeout
        //console.log("DEBUG timeout " + ((await this.driver.manage().getTimeouts()).implicit/20));
        await element.click().then(async () => {
            await wait();
        })
    }

    async verifyElementText(element, text){
        await element.getText().then(async elText => {
            await expect(elText).to.equal(text);
        });
    }

    async verifyElementContainsText(element, text){
        await element.getText().then(async elText => {
            await expect(elText).to.include(text);
        })
    }

    async verifyElementDisabled(element){
        await element.getAttribute('disabled').then(async elAttr => {
            await expect(elAttr).to.not.be.null;
        })
    }

    async verifyWizardContinueButtonDisabled(){
        await this.verifyElementDisabled(await this.basePage.getPopupWizardContinue());
    }

    async verifyWizardDocsLinkURL(url){
        await this.basePage.getPopupWizardDocsLink().then(async elem => {
            await elem.getAttribute('href').then(async href => {
                await expect(href).to.equal(url);
            })
        })
    }

    async clearInputText(input){
        await input.sendKeys(Key.END);
        while((await input.getAttribute('value')).length > 0){
            await input.sendKeys(Key.BACK_SPACE)
        }
        await this.driver.sleep(200)
    }

}

module.exports = baseSteps;
