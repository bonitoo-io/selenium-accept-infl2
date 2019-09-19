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

}

module.exports = telegrafsSteps;
