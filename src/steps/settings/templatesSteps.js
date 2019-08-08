const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const templatesTab = require(__srcdir + '/pages/settings/templatesTab.js');

class templatesSteps extends baseSteps{

    constructor(driver){
        super(driver);
        this.tmTab = new templatesTab(driver);
    }

    async isLoaded(){
        await this.tmTab.isTabLoaded();
    }

}

module.exports = templatesSteps;
