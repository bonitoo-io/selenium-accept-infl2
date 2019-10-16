const { expect } = require('chai');
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

    async verifyTemplateCardsSort(templates){
        let tempArray = templates.split(',');
        await this.tmTab.getTemplateCards().then(async cards => {
            for(let i = 0; i < tempArray.length; i++){
                expect(await cards[i].getText()).to.equal(tempArray[i]);
            }
        })
    }

}

module.exports = templatesSteps;
