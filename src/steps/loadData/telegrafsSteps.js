const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const telegrafsTab = require(__srcdir + '/pages/loadData/telegrafsTab.js');

class telegrafsSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.teleTab = new telegrafsTab(driver);
    }

    async isLoaded(){
        await this.teleTab.isTabLoaded();
    }

    async verifyTelegrafCardByName(name){
        await this.assertVisible(await this.teleTab.getTelegraphCardByName(name));
    }

}

module.exports = telegrafsSteps;
