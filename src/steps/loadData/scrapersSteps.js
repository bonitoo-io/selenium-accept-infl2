const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const scrapersTab = require(__srcdir + '/pages/settings/scrapersTab.js');

class scrapersSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.scrapeTab = new scrapersTab(driver);
    }

    async isLoaded(){
        await this.scrapeTab.isTabLoaded();
    }

}

module.exports = scrapersSteps;
