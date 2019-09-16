const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const scrapersTab = require(__srcdir + '/pages/loadData/scrapersTab.js');

class scrapersSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.scrapeTab = new scrapersTab(driver);
    }

    async isLoaded(){
        await this.scrapeTab.isTabLoaded();
    }

    async verifyExistsCardByName(card){
        await this.assertVisible(await this.scrapeTab.getScraperCardByName(card));
    }

    async verifyScrapersTabIsLoaded(){
        await this.scrapeTab.isTabLoaded();
        await this.assertVisible(await this.scrapeTab.getCreateScraperHeader());
        await this.assertVisible(await this.scrapeTab.getScrapersFilter());
        await this.assertVisible(await this.scrapeTab.getNameSort());
        await this.assertVisible(await this.scrapeTab.getUrlSort());
        await this.assertVisible(await this.scrapeTab.getBucketSort());
    }

    async clickCreateScraperButtonEmpty(){
        await this.scrapeTab.getCreateScraperEmpty().then(async elem => {
            await elem.click().then(async () => {
                await this.driver.sleep(100); //todo implement better wait;
            })
        })
    }

    async clickCreateScraperButtonInHeader(){
        await this.scrapeTab.getCreateScraperHeader().then(async elem => {
            await elem.click().then(async () => {
                await this.driver.sleep(100); //todo implement better wait;
            })
        })
    }

    async verifyCreateScraperEmptyNotPresent(){
        await this.assertNotPresent(scrapersTab.getCreateScraperEmptySelector());
    }

}

module.exports = scrapersSteps;
