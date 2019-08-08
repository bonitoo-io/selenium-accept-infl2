const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const tokensTab = require(__srcdir + '/pages/settings/tokensTab.js');

class tokensSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.tknTab = new tokensTab(driver);
    }

    async isLoaded(){
        await this.tknTab.isTabLoaded();
    }

}

module.exports = tokensSteps;
