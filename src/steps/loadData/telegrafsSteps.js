const { expect } = require('chai');

const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const telegrafsTab = require(__srcdir + '/pages/loadData/telegrafsTab.js');
const basePage = require(__srcdir + '/pages/basePage.js');

class telegrafsSteps extends baseSteps{

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
                // todo verify subtitle link to documentation
                break;
        }
    }

}

module.exports = telegrafsSteps;
