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

    async verifyCreateLabelPopupLoaded(){
        await this.verifyElementContainsText(await this.labTab.getPopupTitle(), 'Create Label');
        await this.assertVisible(await this.labTab.getPopupDismiss());
        await this.assertVisible(await this.labTab.getLabelPopupNameInput());
        await this.assertVisible(await this.labTab.getLabelPopupDescrInput());
        await this.assertVisible(await this.labTab.getLabelPopupColorPicker());
        await this.assertVisible(await this.labTab.getLabelPopupColorInput());
        await this.assertVisible(await this.labTab.getLabelPopupCreateBtn());
        await this.assertVisible(await this.labTab.getLabelPopupCancelBtn());
    }

    async dismissCreateLabelPopup(){
        await this.clickAndWait(await this.labTab.getPopupDismiss());
    }

}

module.exports = labelsSteps;
