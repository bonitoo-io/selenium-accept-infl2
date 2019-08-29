const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const bucketsTab = require(__srcdir + '/pages/loadData/bucketsTab.js');

class bucketsSteps extends baseSteps {

    constructor(driver){
        super(driver);
        this.bucketsTab = new bucketsTab(driver);
    }

    async isLoaded(){
        await this.bucketsTab.isTabLoaded();
    }

}

module.exports = bucketsSteps;

