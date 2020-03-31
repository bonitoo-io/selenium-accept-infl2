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
        // this.assertVisible(await this.setPage.getTabByName('Tokens')); // tokens no longer part of settings
        this.assertVisible(await this.setPage.getTabByName('About'));
    }

    async clickTab(name){
        if(name.toLowerCase() === 'profile'){ //fix one non-matching case
            name = 'About';
        }
        await (await this.setPage.getTabByName(name)).click();
    }

}

module.exports = settingsSteps;
