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

}

module.exports = clientLibsSteps;
