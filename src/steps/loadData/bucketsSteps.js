const expect = require('chai').expect;
const { By, Key } = require('selenium-webdriver');

const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const bucketsTab = require(__srcdir + '/pages/loadData/bucketsTab.js');


class bucketsSteps extends baseSteps {

    constructor(driver){
        super(driver);
        this.bucketsTab = new bucketsTab(driver);
    }

    async isLoaded(){
        await this.bucketsTab.isTabLoaded();
    }

    async verifyOrderByName(bucketNames){
        let namesArray = bucketNames.split(',');
        await this.bucketsTab.getBucketCards().then(async cards => {
            for( let i = 0; i < cards.length; i++){
                let cardName = await cards[i].findElement(By.xpath('.//span[contains(@class,\'cf-resource-name--text\')]/span'));
                let cardText = await cardName.getText();
                if(namesArray[i].toUpperCase() === 'DEFAULT'){
                    expect(cardText).to.equal(__defaultUser.bucket);
                }else {
                    expect(cardText).to.equal(namesArray[i]);
                }
            }
        });
    }

    async clickCreateBucket(){
        await this.bucketsTab.getCreateBucketBtn().then(async button => {
            await button.click();
        });
    }

    async verifyCreateBucketPopup(){
        await this.assertVisible(await this.bucketsTab.getPopupContainer());
        await this.assertVisible(await this.bucketsTab.getPopupTitle());
        await this.assertVisible(await this.bucketsTab.getPopupInputName());
        await this.assertVisible(await this.bucketsTab.getPopupRetentionNever());
        await this.assertVisible(await this.bucketsTab.getPopupRetentionIntervals());
        await this.assertVisible(await this.bucketsTab.getPopupCancelButton());
        await this.assertVisible(await this.bucketsTab.getPopupDismissButton());
        await this.assertVisible(await this.bucketsTab.getPopupCreateButton());
    }

    async verifyCreateBucketPopupNotPresent(){
        await this.assertNotPresent(await bucketsTab.getPopupContainerSelector());
        await this.assertNotPresent(await bucketsTab.getPopupTitleSelector());
    }

    async verifyRPIntervalControlsNotPresent(){
        await this.assertNotPresent(await bucketsTab.getPopupRPIntervalControlsSelector());
    }

    async verifyRPIntervalControlsPresent(){
        await this.assertVisible(await this.bucketsTab.getPopupRPIntevalControls());
    }

    async verifyCreateBucketCreateButtonEnabled(enabled){
        await expect(await (await this.bucketsTab.getPopupCreateButton()).isEnabled()).to.equal(enabled);
    }

    async verifyActiveRetentionPolicyButton(rp){
        await this.driver.findElement(By.css(`[data-testid=retention-${rp}--button]`))
            .then(async elem => {
                await elem.getAttribute('class').then( async elemClass => {
                    await expect(elemClass).to.include('active');
                })
            })
    }

    async verifyInactiveRetentionPolicyButton(rp){
        await this.driver.findElement(By.css(`[data-testid=retention-${rp}--button]`))
            .then(async elem => {
                await elem.getAttribute('class').then( async elemClass => {
                    await expect(elemClass).to.not.include('active');
                })
            })
    }

    async clickRetentionPolicyButton(rp){
        await this.driver.findElement(By.css(`[data-testid=retention-${rp}--button]`))
            .then(async elem => {
                await elem.click();
            })
    }

    async dismissBucketPopup(){

        await this.bucketsTab.getPopupDismissButton().then(async btn => {
            await btn.click().then( async () => {
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupContainerSelector()));
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupTitleSelector()));
            });
        });
    }

    async cancelBucketPopup(){
        await this.bucketsTab.getPopupCancelButton().then(async btn => {
            await btn.click().then(async() => {
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupContainerSelector()));
                await this.driver.wait(await this.bucketsTab
                    .getUntilElementNotPresent(bucketsTab.getPopupTitleSelector()));
            });
        });
    }

    async setBucketName(name){
        await this.bucketsTab.getPopupInputName().then(async elem => {
            await elem.clear();
            await elem.sendKeys(name);
        })
    }

    async enterIntervalValue(amount, unit){
        switch(unit.toLowerCase()){
            case 'seconds':
            case 'second':
                await this.bucketsTab.getPopupRPSecondsInput().then(async elem => {
                    await elem.sendKeys(amount);
                });
                break;
            case 'minutes':
            case 'minute':
                await this.bucketsTab.getPopupRPMinutesInput().then(async elem => {
                    await elem.sendKeys(amount);
                });
                break;
            case 'hours':
            case 'hour':
                await this.bucketsTab.getPopupRPHoursInput().then(async elem => {
                    await elem.sendKeys(amount);
                });
                break;
            case 'days':
            case 'day':
                await this.bucketsTab.getPopupRPDaysInput().then(async elem => {
                    await elem.sendKeys(amount);
                });
                break;
            default:
                throw `unknown interval unit ${unit}`;
        }
    }

    async clearAllRetentionPolicyIntervals(){
        await this.bucketsTab.getPopupRPSecondsInput().then(async elem => {
            await elem.clear();
            await elem.sendKeys('0')
        });

        await this.bucketsTab.getPopupRPMinutesInput().then(async elem => {
            await elem.clear();
            await elem.sendKeys('0')
        });

        await this.bucketsTab.getPopupRPHoursInput().then(async elem => {
            await elem.clear();
            await elem.sendKeys('0')
        });

        await this.bucketsTab.getPopupRPDaysInput().then(async elem => {
            await elem.clear();
            await elem.sendKeys('0')
        });
    }

    async verifyIntervalValue(value, unit){
        switch(unit.toLowerCase()){
            case 'seconds':
            case 'second':
                await this.bucketsTab.getPopupRPSecondsInput().then(async elem => {
                    await elem.getAttribute('value').then(async elVal => {
                        expect(parseInt(elVal)).to.equal(parseInt(value));
                    })
                });
                break;
            case 'minutes':
            case 'minute':
                await this.bucketsTab.getPopupRPMinutesInput().then(async elem => {
                    await elem.getAttribute('value').then(async elVal => {
                        expect(parseInt(elVal)).to.equal(parseInt(value));
                    })
                });
                break;
            case 'hours':
            case 'hour':
                await this.bucketsTab.getPopupRPHoursInput().then(async elem => {
                    await elem.getAttribute('value').then(async elVal => {
                        expect(parseInt(elVal)).to.equal(parseInt(value));
                    })
                });
                break;
            case 'days':
            case 'day':
                await this.bucketsTab.getPopupRPDaysInput().then(async elem => {
                    await elem.getAttribute('value').then(async elVal => {
                        expect(parseInt(elVal)).to.equal(parseInt(value));
                    })
                });
                break;
            default:
                throw `unknown interval unit ${unit}`;
        }
    }

    async  clickRPNever(){
        await this.bucketsTab.getPopupRetentionNever().then(async btn => {
            await btn.click();
        })
    }

    async clickCreatePopupCreate(){
        await this.bucketsTab.getPopupCreateButton().then( async btn => {
            await btn.click();
            await this.driver.sleep(3000)
        })
    }

    async verifyFormErrorMessageContains(msg){
        await this.bucketsTab.getPopupFormError().then(async elem => {
            await elem.getText().then(async text => {
                expect(text).to.include(msg);
            })
        })
    }

    async verifyFormErrorMessageNotPresent(){
        await this.assertNotPresent(await bucketsTab.getPopupFormErrorSelector());
    }
}

module.exports = bucketsSteps;

