const { expect } = require('chai');
const { By, Key } = require('selenium-webdriver');

const loadDataSteps = require(__srcdir + '/steps/loadData/loadDataSteps.js');
const telegrafsTab = require(__srcdir + '/pages/loadData/telegrafsTab.js');
const basePage = require(__srcdir + '/pages/basePage.js');

class telegrafsSteps extends loadDataSteps{

    constructor(driver){
        super(driver);
        this.teleTab = new telegrafsTab(driver);
    }

    async isLoaded(){
        await this.teleTab.isTabLoaded();
    }

    async verifyTelegrafCardByName(name){
        await this.assertVisible(await this.teleTab.getTelegraphCardByName(name));
    }

    async verifyTelegrafTabLoaded(){
            await this.teleTab.isTabLoaded();
    }

    async clickCreateTelegrafButtonEmpty(){
        await this.teleTab.getCreateConfigInBody().then(async button => {
            await button.click().then(async () => {
                await this.driver.sleep(100); // todo better wait
            })
        })
    }

    async clickCreateTelegrafButtonInHeader(){
        await this.clickAndWait(await this.teleTab.getCreateConfigInHeader()) // todo pass in better wait
    }

    async verifyWizardLoadedP1(){
        await this.assertVisible(await this.teleTab.getPopupDismiss());
        await this.assertVisible(await this.teleTab.getPopupWizardTitle());
        await this.assertVisible(await this.teleTab.getPopupWizardSubTitle());
        await this.assertVisible(await this.teleTab.getPopupWizardContinue());
        await this.assertVisible(await this.teleTab.getBucketDropdownBtn());
        await this.assertVisible(await this.teleTab.getPluginFilter());
        await this.assertVisible(await this.teleTab.getPluginTileByName('System'));
    }

    async verifyCreateTelegrafWizardNotPresent(){
        await this.assertNotPresent(basePage.getPopupWizardTitleSelector());
        await this.assertNotPresent(basePage.getPopupWizardSubTitleSelector());
        await this.assertNotPresent(telegrafsTab.getPluginTitleSelectorByName('System'));
    }

    async clickCreateConfigBucketDropdown(){
        await this.clickAndWait(await this.teleTab.getBucketDropdownBtn()); // todo pass in better wait method
    }

    async clickCreateConfigBucketDropdownItem(item){
        await this.clickAndWait(await this.teleTab.getBucketDropdownItem(item));
    }

    async clickCreateConfigPluginTile(plugin){
        await this.clickAndWait(await this.teleTab.getPluginTileByName(plugin));
    }

    async verifyCreateWizardPluginTileSelected(plugin){
        await this.teleTab.getPluginTileByName(plugin).then(async elem => {
           await elem.getAttribute('class').then(async elClass => {
               await expect(elClass).to.include('selected');
           })
        });
    }

    async verifyCreateWizardPluginTileNotSelected(plugin){
        await this.teleTab.getPluginTileByName(plugin).then(async elem => {
            await elem.getAttribute('class').then(async elClass => {
                await expect(elClass).to.not.include('selected');
            })
        })
    }

    async verifyCreateWizardStep2Loaded(){
        await this.verifyElementText(await this.teleTab.getPopupWizardTitle(), 'Configure Plugins');
        await this.verifyElementContainsText(await this.teleTab.getPopupWizardSubTitle(), 'Configure each plugin');
        await this.assertVisible(await this.teleTab.getPopupWizardBack());
        await this.assertVisible(await this.teleTab.getConfigurationPluginsSideBar());
        await this.assertVisible(await this.teleTab.getPopupWizardBack());
    }

    async verifyCreateWizardStep3Loaded(){
        await this.verifyElementText(await this.teleTab.getPopupWizardTitle(), 'Test your Configuration');
        await this.verifyElementContainsText(await this.teleTab.getPopupWizardSubTitle(), 'Start Telegraf and ensure data is being written to InfluxDB');
        await this.assertVisible(await this.teleTab.getPopupWizardBack());
        await this.assertVisible(await this.teleTab.getPopupWizardBack());
        await this.assertVisible(await this.teleTab.getCodeToken());
        await this.assertVisible(await this.teleTab.getCodeCliTelegraf());
    }

    async verifyCreateWizardStep2PluginsList(plugins){
        let pList = plugins.split(',');
        for(let i = 0; i < pList.length; i++){
            await expect(await this.teleTab.getPluginItemByName(pList[i])).to.not.be.undefined;
        }
    }

    async verifyCreateWizardPluginState(plugin, state){
        await this.teleTab.getPluginItemByName(plugin).then(async elem => {
            switch(state.toLowerCase()){
                case 'success':
                    expect(await elem.getAttribute('class')).to.include('success');
                    break;
                case 'failure':
                case 'fail':
                case 'error':
                    expect(await elem.getAttribute('class')).to.include('error');
                    break;
                default:
                    expect(await elem.getAttribute('class')).to.equal('side-bar--tab');
                    break;
            }
        });
    }

    async clickCreateWizardPluginItem(plugin){
        await this.clickAndWait(await this.teleTab.getPluginItemByName(plugin)); // todo better wait
    }

    async verifyEditPluginStepLoaded(plugin){

        await this.assertVisible(await this.teleTab.getPopupDismiss());
        await this.assertVisible(await this.teleTab.getPopupWizardContinue());

        switch(plugin.toLowerCase()){
            case 'docker':
                await this.assertVisible(await this.teleTab.getPluginDockerEditEndpoint());
                await this.verifyElementText(await this.teleTab.getPopupWizardTitle(), 'Docker');
                await this.verifyWizardDocsLinkURL('https://github.com/influxdata/telegraf/tree/master/plugins/inputs/docker');
                // todo verify subtitle link to documentation
                break;
            case 'kubernetes':
                await this.assertVisible(await this.teleTab.getPluginK8SEditEndpoint());
                await this.verifyElementText(await this.teleTab.getPopupWizardTitle(), 'Kubernetes');
                await this.verifyWizardDocsLinkURL('https://github.com/influxdata/telegraf/tree/master/plugins/inputs/kubernetes');
                break;
            case 'nginx':
                await this.assertVisible(await this.teleTab.getPluginNGINXEditEndpoint());
                await this.verifyElementText(await this.teleTab.getPopupWizardTitle(), 'Nginx');
                await this.verifyWizardDocsLinkURL('https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nginx');
                break;
            case 'redis':
                await this.assertVisible(await this.teleTab.getPluginRedisServersEditEndpoint());
                await this.assertVisible(await this.teleTab.getPluginRedisPasswordEditEndpoint());
                await this.verifyElementText(await this.teleTab.getPopupWizardTitle(), 'Redis');
                await this.verifyWizardDocsLinkURL('https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis');
                break;
            default:
                throw `unsupported plugin ${plugin}`;
        }
    }

    async enterValuesIntoFields(values, fields){
        let fieldsArr = fields.split(',');
        let valuesArr = values.split(',');
        for(let i = 0; i < fieldsArr.length && i < valuesArr.length; i++){
            if(valuesArr[i].toLowerCase() === 'skip'){
                continue;
            }
            switch(fieldsArr[i].toLowerCase()){
                case 'endpoint':
                    await this.teleTab.getPluginDockerEditEndpoint().then(async elem => {
                        await elem.sendKeys(valuesArr[i])
                    });
                    break;
                case 'url':
                    await this.teleTab.getPluginK8SEditEndpoint().then(async elem => {
                        await elem.sendKeys(valuesArr[i])
                    });
                    break;
                case 'urls':
                    await this.teleTab.getPluginNGINXEditEndpoint().then(async elem => {
                        await elem.sendKeys(valuesArr[i] + Key.ENTER);
                    });
                    break;
                case 'servers':
                    await this.teleTab.getPluginRedisServersEditEndpoint().then(async elem => {
                        await elem.sendKeys(valuesArr[i] + Key.ENTER)
                    });
                    break;
                case 'password':
                    await this.teleTab.getPluginRedisPasswordEditEndpoint().then(async elem => {
                        await elem.sendKeys(valuesArr[i])
                    });
                    break;
                default:
                    throw `unhandled field ${fields[i]}`;
            }
            await this.driver.sleep(100);
        }
    }

    async verifyEditPluginErrorMessage(msgs)    {
        let msgArr = msgs.split(',');
        for(let i = 0; i < msgArr.length; i++){
            switch(msgArr[i].toLowerCase()){
                case 'skip':
                    break;
                case 'none':
                    await this.verifyInputErrorIcon();
                    break;
                default:
                    await this.verifyInputErrorIcon();
                    await this.verifyElementErrorMessage(msgArr[i], false);
                    break;
            }
        }
    }

    async clearCreateTelegrafPluginFields(fields){
        let fieldsArr = fields.split(',');
        for(let i = 0; i < fieldsArr.length; i++){
            switch(fieldsArr[i].toLowerCase()){
                case 'endpoint':
                    await this.clearInputText(await this.teleTab.getPluginDockerEditEndpoint());
                    break;
                case 'url':
                    await this.clearInputText(await this.teleTab.getPluginK8SEditEndpoint());
                    break;
                case 'urls':
                    await this.clearInputText(await this.teleTab.getPluginNGINXEditEndpoint());
                    //NGINX remove invalid URL from list
                    await this.clickAndWait(await this.driver.findElement(By.css('[data-testid=confirmation-button--button]')));
                    await this.clickAndWait(await this.driver.findElement(By.css('[title=Confirm]')));
                    break;
                case 'servers':
                    await this.clearInputText(await this.teleTab.getPluginRedisServersEditEndpoint());
                    break;
                case 'password':
                    await this.clearInputText(await this.teleTab.getPluginRedisPasswordEditEndpoint());
                    break;
                default:
                    throw `unhandled field ${fields[i]}`;

            }
        }
    }

    async verifyBucketForTelegrafCard(name, bucket){
        await this.teleTab.getTelegrafCardByName(name).then(async card => {
            await card.findElement(By.xpath('.//div[contains(text(), \'Bucket\')]')).then(async elem => {
                await elem.getText().then(async elText => {
                    expect(elText).to.include(bucket);
                })
            })
        })
    }

}

module.exports = telegrafsSteps;
