const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

class settingsSteps extends influxSteps{

    constructor(driver){
        super(driver);
        this.setPage = new settingsPage(__wdriver);
    }

    async isLoaded(){
        await this.setPage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.setPage.getTabByName('Members'));
        this.assertVisible(await this.setPage.getTabByName('Buckets'));
        this.assertVisible(await this.setPage.getTabByName('Telegraf'));
        this.assertVisible(await this.setPage.getTabByName('Scrapers'));
        this.assertVisible(await this.setPage.getTabByName('Variables'));
        this.assertVisible(await this.setPage.getTabByName('Templates'));
        this.assertVisible(await this.setPage.getTabByName('Labels'));
        this.assertVisible(await this.setPage.getTabByName('Tokens'));
        this.assertVisible(await this.setPage.getTabByName('Org Profile'));
    }

}

module.exports = settingsSteps;
