const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const telegrafsTab = require(__srcdir + '/pages/settings/telegrafsTab.js');

class telegrafsSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.teleTab = new telegrafsTab(driver);
    }

    async isLoaded(){
        await this.teleTab.isTabLoaded();
    }

}

module.exports = telegrafsSteps;
