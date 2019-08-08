const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const labelsTab = require(__srcdir + '/pages/settings/labelsTab.js');

class labelsSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.labTab = new labelsTab(driver);
    }

    async isLoaded(){
        await this.labTab.isTabLoaded();
    }

}

module.exports = labelsSteps;
