const fs = require('fs')
const chai = require('chai');
chai.use(require('chai-match'));

const expect = require('chai').expect;
const assert = require('chai').assert;

const { By, Key, NoSuchElementError, until } = require('selenium-webdriver');
const influxUtils = require(__srcdir + '/utils/influxUtils.js');

const basePage = require (__srcdir + '/pages/basePage.js');

const keyMap = {'enter': Key.ENTER,
    'tab': Key.TAB,
    'backspace': Key.BACK_SPACE,
    'space': Key.SPACE,
    'escape': Key.ESCAPE
    };


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

    async containsPrimaryNotificationText(text){
        await this.basePage.getNotificationPrimaryMsgs().then(async elems => {
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
            });
        });
    }

    async verifyNoElementErrorMessage(){
        await this.assertNotPresent(basePage.getPopupFormElementErrorSelector());
    }

    async verifyInputErrorIcon(){
        await this.basePage.getFormInputErrors(async elems => {
            expect(elems.length).to.be.above(0);
        });
    }

    async verifyNoFormInputErrorIcon(){
        await this.assertNotPresent(basePage.getFormInputErrorSelector());
    }

    async assertVisible(element){
        try {
            await expect(await element.isDisplayed()).to.equal(true);
        }catch(err){
            console.log('Assert Visible failed: ' + err + '/n waiting for ' + JSON.stringify(element));
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

    async assertPresent(selector){
        switch(selector.type){
        case 'css':
            await this.driver.findElements(By.css(selector.selector)).then(async elems => {
                await expect(elems.length).to.be.above(0);
            }).catch(async err => {
                err += ' expected ' + JSON.stringify(selector) + ' to not be present';
                throw err;
            });
            break;
        case 'xpath':
            await this.driver.findElements(By.xpath(selector.selector)).then(async elems => {
                await expect(elems.length).to.be.above(0);
            }).catch(async err => {
                err.message += ' expected ' + selector + ' to not be present';
                throw err;
            });
            break;
        default:
            throw `Unknown selector type ${selector}`;
        }
    }

    async isPresent(selector){
        switch(selector.type){
            case 'css':
                return await this.driver.findElements(By.css(selector.selector)).then(async elems => {
                    return elems.length > 0;
                }).catch(async err => {
                    err += ' expected ' + JSON.stringify(selector) + ' to not be present';
                    throw err;
                });
            case 'xpath':
                return await this.driver.findElements(By.xpath(selector.selector)).then(async elems => {
                    return elems.length > 0;
                }).catch(async err => {
                    err.message += ' expected ' + selector + ' to not be present';
                    throw err;
                });
            default:
                throw `Unknown selector type ${selector}`;
        }
    }

    //Example def { "points": 20, "field": "level", "measurement": "hydro", "start": "-60h", "vals": "skip", "rows": ["1","-1"] }
    async verifyBucketContainsByDef(bucket, user, def){

        let define = JSON.parse(def);


        let query = `from(bucket: "${bucket}")
    |> range(start: ${define.start})
    |> filter(fn: (r) => r._measurement == "${define.measurement}")
    |> filter(fn: (r) => r._field == "${define.field}")`;

        let results = await influxUtils.query(user.orgid, query);


        let resTable = await (await results.split('\r\n')).filter((row) => {
            return row.split(',').length > 9;
        });

        let headers = resTable[0].split(',');
        headers.shift();
        let mesIn = headers.indexOf('_measurement');
        let fieldIn = headers.indexOf('_field');
        let valIn = headers.indexOf('_value');

        for(let i = 0; i < define.rows.length; i++){
            let recs;
            if(parseInt(define.rows[i]) === -1){  // last record
                recs = resTable[resTable.length - 1].split(',');
            }else{ //by normal index {0,1,2...N}
                recs = resTable[parseInt(define.rows[i])].split(',');
            }

            recs.shift();

            expect(recs[fieldIn]).to.equal(define.field);
            expect(recs[mesIn]).to.equal(define.measurement);

            if(typeof(define.vals) !== 'string'){
                expect(recs[valIn]).to.equal(define.vals[i]);
            }

        }
    }

    async clickPopupWizardContinue(){
        await this.basePage.getPopupWizardContinue().then(async button => {
            await button.click().then(async () => {
                // await this.driver.wait( // this wait is not consistent
                // await this.basePage.getUntilElementNotPresent(
                //basePage.getPopupWizardContinueSlector())) //
                await this.driver.sleep(500); // todo better wait
            });
        });
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
                await this.driver.sleep(1000); // todo better wait - sometimes can be slow to unload
            });
        });
    }

    async clickPopupCancelBtn(){
        await this.clickAndWait(await this.basePage.getPopupCancel()); // todo better wait
    }

    async clickPopupCancelBtnSimple(){
        await this.clickAndWait(await this.basePage.getPopupCancelSimple(), async () => {
            try {
                await this.driver.wait(until.stalenessOf(await this.basePage.getPopupOverlay()));
            }catch(err){
                console.log("DEBUG err " + JSON.stringify(err));
                if(err.name !== 'NoSuchElementError'){ // O.K. if not found - DOM already updated
                    throw err;
                }
            }
        }); //todo better wait - try until overlay disappear
    }

    //sometimes need to lose focus from a popup element to trigger change
    async clickPopupTitle(){
        await this.clickAndWait(await this.basePage.getPopupTitle());
    }

    async verifyPopupNotPresent(){
        await this.assertNotPresent(await basePage.getPopupOverlayContainerSelector());
    }


    /*
      Since not currently refining waits - and focusing on velocity of adding new tests - use this
      for simple situations
     */
    async clickAndWait(element,
        wait = async () => { await this.driver.sleep((await this.driver.manage().getTimeouts()).implicit/20); }){ //wait 1/10th implicit timeout
        //console.log("DEBUG timeout " + ((await this.driver.manage().getTimeouts()).implicit/20));
        await element.click().then(async () => {
            await wait();
        });
    }

    async typeTextAndWait(input, text,
        wait = async () => { await this.driver.sleep((await this.driver.manage().getTimeouts()).implicit/20); }) { //wait 1/10th implicit timeout)
        await input.sendKeys(text).then(async() => {
            await wait();
        });
    }

    async verifyElementText(element, text){
        await element.getText().then(async elText => {
            await expect(elText).to.equal(text);
        });
    }

    async verifyElementContainsText(element, text){
        await element.getText().then(async elText => {
            await expect(elText).to.include(text);
        });
    }

    async verifyElementContainsClass(element, clazz){
        await element.getAttribute('class').then(async elClass => {
            await expect(elClass).to.include(clazz);
        });
    }

    async verifyElementDoesNotContainClass(element, clazz){
        await element.getAttribute('class').then(async elClass => {
            await expect(elClass).to.not.include(clazz);
        });
    }

    async verifyElementDisabled(element){
        await element.getAttribute('disabled').then(async elAttr => {
            await expect(elAttr).to.not.be.null;
        });
    }

    async verifyElementEnabled(element){
        await element.getAttribute('disabled').then(async elAttr => {
            await expect(elAttr).to.be.null;
        });
    }

    async verifyWizardContinueButtonDisabled(){
        await this.verifyElementDisabled(await this.basePage.getPopupWizardContinue());
    }

    async verifyWizardDocsLinkURL(url){
        await this.basePage.getPopupWizardDocsLink().then(async elem => {
            await elem.getAttribute('href').then(async href => {
                await expect(href).to.equal(url);
            });
        });
    }

    async clearInputText(input){
        await input.sendKeys(Key.END);
        while((await input.getAttribute('value')).length > 0){
            await input.sendKeys(Key.BACK_SPACE);
        }
        await this.driver.sleep(200);
    }

    async verifyPopupAlertContainsText(text){
        await this.basePage.getPopupAlert().then(async elem => {
            await elem.findElement(By.css( '[class*=contents]')).then(async contentEl => {
                await contentEl.getText().then(async elText => {
                    await expect(elText).to.include(text);
                });
            });
        });
    }

    async verifyPopupAlertMatchesRegex(regex){
        await this.basePage.getPopupAlert().then(async elem => {
            await elem.findElement(By.css( '[class*=contents]')).then(async contentEl => {
                await contentEl.getText().then(async elText => {
                    await expect(elText).to.match(regex);
                });
            });
        });
    }

    async verifyInputEqualsValue(input, value){
        await input.getAttribute('value').then( async elVal => {
            await expect(elVal).to.equal(value);
        });
    }

    async verifyInputContainsValue(input, value){
        await input.getAttribute('value').then( async elVal => {
            await expect(elVal).to.include(value);
        });
    }

    async verifyInputDoesNotContainValue(input, value){
        await input.getAttribute('value').then( async elVal => {
            await expect(elVal).to.not.equal(value);
        });
    }

    //cmElem will be element containing class .CodeMirror
    async setCodeMirrorText(cmElem, text){
        //need to escape new lines which break the js code
        text = text.replace(/\n/g, '\\n');
        await this.driver.executeScript(`arguments[0].CodeMirror.setValue("${text}");`, cmElem);
        await this.driver.sleep(1000); //todo better wait - troubleshoot flakey consequences of this step
    }

    async getCodeMirrorText(cmElem, text){
        return await this.driver.executeScript('return arguments[0].CodeMirror.getValue()', cmElem);
    }

    async verifyFormErrorMessageContains(msg){
        await this.verifyElementContainsText(await this.basePage.getPopupFormElementMessage(), msg);
    }

    async verifySubmitDisabled(){
        await this.verifyElementDisabled(await this.basePage.getPopupSubmit());
    }

    async clickPopupSubmitButton(){
        await this.clickAndWait(await this.basePage.getPopupSubmit());
    }

    async verifyElementContainsAttribute(elem, attrib){
        await elem.getAttribute(attrib).then(async val => {
            await expect(val).to.exist;
        });
    }

    async verifyElementAttributeContainsText(elem,attrib,text){
        await elem.getAttribute(attrib).then(async at => {
                await expect(at).to.include(text);
        })
    }

    async verifyElementContainsNoText(elem){
        await elem.getText().then(async text => {
            await expect(text.length).to.equal(0);
        });
    }

    async setFileUpload(filePath){
        await this.basePage.getPopupFileUpload().then(async elem => {
            await elem.sendKeys(process.cwd() + '/' + filePath).then(async () => {
                await this.delay(200); //debug wait - todo better wait
            });
        });
    }

    async verifyPopupWizardStepStateText(text){
        await this.verifyElementContainsText(await this.basePage.getPopupWizardStepStateText(), text);
    }

    async verifyPopupWizardStepState(state){
        await this.verifyElementContainsClass(await this.basePage.getPopupWizardStepStateText(), state);
    }

    async verifyPopupFileUploadHeaderText(text){
        await this.verifyElementContainsText(await this.basePage.getPopupFileUploadHeader(), text);
    }

    async clickPageTitle(){
        await this.clickAndWait(await this.basePage.getPageTitle());
    }

    async copyFileContentsToTextarea(filepath, textarea){
        let buffer = await influxUtils.readFileToBuffer(process.cwd() + '/' + filepath);
        await textarea.sendKeys(buffer);
    }

    async pressKeyAndWait(key, wait = async () => { await this.driver.sleep((await this.driver.manage().getTimeouts()).implicit/20); }){
        await this.driver.switchTo().activeElement().then(async elem => {
                await elem.sendKeys(keyMap[key.toLowerCase()]).then(async () => {
                    await wait()
                });
        })
    }

    async verifyFileExists(filePath){
        await expect(await influxUtils.fileExists(filePath)).to.be.true;
    }

    async scrollElementIntoView(elem){
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", elem).then(async () => {
            await this.driver.sleep(150);
        });
    }

    async writeBase64ToPNG(filePath, base64String){
        let base64Data = base64String.replace(/^data:image\/png;base64,/,"")
        fs.writeFile(filePath,
            base64Data,
            'base64',
            async err => {
            if(err) {
                console.log(err)
            }
        })
    }


}

module.exports = baseSteps;
