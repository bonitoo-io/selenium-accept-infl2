const { expect, assert } = require('chai');
const { By, Key, until } = require('selenium-webdriver');

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

    async verifyBucketNotListedByName(name){
        await this.assertNotPresent(await bucketsTab.getBucketCardSelectorByName(name));
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

    async verifyEditBucketPopup(){
        await this.assertVisible(await this.bucketsTab.getPopupContainer());
        await this.assertVisible(await this.bucketsTab.getPopupTitle());
        await this.assertVisible(await this.bucketsTab.getPopupInputName());
        await this.assertVisible(await this.bucketsTab.getPopupRetentionNever());
        await this.assertVisible(await this.bucketsTab.getPopupRetentionIntervals());
        await this.assertVisible(await this.bucketsTab.getPopupCancelButton());
        await this.assertVisible(await this.bucketsTab.getPopupDismissButton());
        await this.assertVisible(await this.bucketsTab.getPopupSaveChanges());
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

    async verifyNameInputEnabled(enabled){
        await expect(await (await this.bucketsTab.getPopupInputName()).isEnabled()).to.equal(enabled);
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

    async verifyPopupHelpText(text){
        await this.bucketsTab.getPopupHelpText().then(async elem => {
            await elem.getText().then(async elText => {
                expect(elText).to.include(text);
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

    async verifyBucketInListByName(name){
        await this.bucketsTab.getBucketCards().then(async cards => {
            for(let i = 0; i < cards.length; i++){
                let crd_nm = await cards[i].findElement(By.xpath('.//span[contains(@class,\'cf-resource-name--text\')]/span'));
                if((await crd_nm.getText()) === name){
                    assert(true, `matched card with name ${name}`);
                    return;
                }
            }
            assert.fail(`Failed to locate card named ${name} in current list`);
        });
    }

    async verifyBucktNotInListByName(name){
        await this.assertNotPresent(await bucketsTab.getBucketCardSelectorByName(name));
    }

    async verifyBucketHasRetentionPolicy(name, rp){
        await this.bucketsTab.getBucketCards().then(async cards => {
            for(let i = 0; i < cards.length; i++){
                let crd_nm = await cards[i].findElement(By.xpath('.//span[contains(@class,\'cf-resource-name--text\')]/span'));
                if((await crd_nm.getText()) === name){
                    await cards[i].findElement(By.xpath('.//*[@data-testid=\'cf-resource-card--meta-item\']')).then(async elem => {
                       //await console.log("DEBUG cards[i] " + await elem.getText());
                        // rpText should be of form e.g. 'Retention: 28 days'
                       await elem.getText().then(async rpText => {
                           let policy = rp.trim().toLowerCase().split(' ');
                           let rpPolicy = rpText.trim().toLowerCase().split(' ');
                           rpPolicy.shift(); //remover first 'Retenition: string'
                           for( let i = 0; i < policy.length; i += 2) {
                               await expect(parseInt(policy[i])).to.equal(parseInt(rpPolicy[i]));
                               await expect(policy[i+1]).to.equal(rpPolicy[i+1]);
                           }
                       })
                    });
                    return;
                }
            }
            assert.fail(`Failed to locate card named ${name} in current list`);

        })
    }

    async clickOnBucketNamed(name){
        await this.bucketsTab.getBucketCardName(name).then(async card => {
            await card.click();
        })
    }

    async clickSaveChanges(){
        await this.bucketsTab.getPopupSaveChanges().then(async btn => {
            await btn.click();
        })
    }

    async setFilterValue(text){
        let cardCt = (await this.bucketsTab.getBucketCards()).length;
        await this.bucketsTab.getFilterInput().then( async input => {
            await input.clear().then(async () => {
                await input.sendKeys(text).then( async () => {
                    await this.driver.wait(async () => {
                        return (await this.bucketsTab.getBucketCards()).length < cardCt;
                    })
                });
            })
        })
    }

    async clearFilterValue(){
        let cardCt = (await this.bucketsTab.getBucketCards()).length;
        await this.bucketsTab.getFilterInput().then(async input => {
            await input.clear().then(async() => {
                await this.driver.wait(async () => {
                    return (await this.bucketsTab.getBucketCards()).length > cardCt;
                });
            });
        })
    }

    async ensureNameSortOrder(order){
        await this.bucketsTab.getNameSorter().then(async elem => {
            if(!(await elem.getAttribute('title')).toLowerCase().includes(order.toLowerCase())){
                await elem.click().then(async () => {
                    await this.driver.wait(until.elementLocated(By.css((await bucketsTab.getNameSorterSelector()).selector)))
                });
            }
        })
    }

    async hoverOverCardNamed(name){
        await this.hoverOver(await this.bucketsTab.getBucketCardByName(name));
    }

    async verifyBucketCardDeleteNotPresent(name){
        //await this.driver.executeScript('arguments[0].blur()', await this.bucketsTab.getBucketCardDeleteByName(name));
        await this.bucketsTab.getBucketCardByName('_tasks').then(async elem => {
            await elem.click().then(async () => {  //remove focus from list
                await this.driver.sleep(500); //fix later - losing patience
                await this.assertNotVisible(await this.bucketsTab.getBucketCardDeleteByName(name));
            });
        })
    }

    async clickBucketCardDelete(name){
        await this.bucketsTab.getBucketCardDeleteByName(name).then(async elem => {
            await elem.click().then(async () => {
                await this.driver.wait(until.elementIsVisible(
                    await this.bucketsTab.getBucketCardDeleteConfirmByName(name)))
            });
        })
    }

    async clickBucketCardDeleteConfirm(name){
        await this.bucketsTab.getBucketCardDeleteConfirmByName(name).then(async elem => {
            await elem.click().then(async () => {

                await this.driver.sleep(500); // todo - find better wait - however below is flakey

                // await this.driver.wait(until.stalenessOf(await this.bucketsTab.getBucketCardDeleteByName(name)));
            })
        })
    }

    async clickAddDataButtonOfCard(name){
        await this.bucketsTab.getBucketCardAddDataByName(name).then(async elem => {
            await elem.click().then(async () => {
                await this.driver.sleep(3000); // todo - wait for popup items
            })
        })
    }
}

module.exports = bucketsSteps;

