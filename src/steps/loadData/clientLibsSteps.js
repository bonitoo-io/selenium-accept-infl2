const { By, Key } = require('selenium-webdriver');
const { expect } = require('chai');

const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const clientLibsTab = require(__srcdir + '/pages/loadData/clientLibsTab.js');

class clientLibsSteps extends baseSteps {

    constructor(driver) {
        super(driver);
        this.clibTab = new clientLibsTab(driver);
    }

    async isLoaded() {
        await this.clibTab.isTabLoaded();
    }

    async verifyClientLibsTabIsLoaded(){
        await this.clibTab.isTabLoaded();
        await this.assertVisible(await this.clibTab.getClientURL());
        await this.assertVisible(await this.clibTab.getLibTileByName('csharp'));
        await this.assertVisible(await this.clibTab.getLibTileByName('java'));
        await this.assertVisible(await this.clibTab.getLibTileByName('python'));
    }

    async clickLibTileByName(name){
        await this.clickAndWait(await this.clibTab.getLibTileByName(name));
    }

    async verifyCSharpPopupLoaded(){
        //await this.clickAndWait(await this.clibTab.getCopy2ClipByLabel('Package Manager'));
        await this.assertVisible(await this.clibTab.getPopupDismiss());
        await this.assertVisible(await this.clibTab.getPopupBody());
        await this.verifyElementContainsText(await this.clibTab.getPopupTitle(), 'C# Client Library');
    }

}

module.exports = clientLibsSteps;
