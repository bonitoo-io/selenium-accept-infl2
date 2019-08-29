const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');

class loadDataSteps extends influxSteps{

    constructor(driver){
        super(driver);
        this.ldPage = new loadDataPage(__wdriver);
    }

    async isLoaded(){
        await this.ldPage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.ldPage.getTabByName('Buckets'));
        this.assertVisible(await this.ldPage.getTabByName('Telegraf'));
        this.assertVisible(await this.ldPage.getTabByName('Scrapers'));
    }

    async clickTab(name){
        await (await this.ldPage.getTabByName(name)).click();
    }

}

module.exports = loadDataSteps;
