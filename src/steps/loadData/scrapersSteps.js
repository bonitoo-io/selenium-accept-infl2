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

}

module.exports = scrapersSteps;
