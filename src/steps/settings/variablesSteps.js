const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const variablesTab = require(__srcdir + '/pages/settings/variablesTab.js');

class variablesSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.varTab = new variablesTab(driver);
    }

    async isLoaded(){
        await this.varTab.isTabLoaded();
    }

}

module.exports = variablesSteps;
