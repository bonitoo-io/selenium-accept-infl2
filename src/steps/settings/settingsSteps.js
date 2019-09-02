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
        //        this.assertVisible(await this.setPage.getTabByName('Buckets')); moved to new load data page
        //        this.assertVisible(await this.setPage.getTabByName('Telegraf')); ditto
        //        this.assertVisible(await this.setPage.getTabByName('Scrapers')); ditto
        this.assertVisible(await this.setPage.getTabByName('Variables'));
        this.assertVisible(await this.setPage.getTabByName('Templates'));
        this.assertVisible(await this.setPage.getTabByName('Labels'));
        this.assertVisible(await this.setPage.getTabByName('Tokens'));
        this.assertVisible(await this.setPage.getTabByName('Profile'));
    }

    async clickTab(name){
        await (await this.setPage.getTabByName(name)).click();
    }

}

module.exports = settingsSteps;
