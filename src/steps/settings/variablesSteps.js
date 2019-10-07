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

    async clickCreateVariableDropdown(){
        await this.clickAndWait(await this.varTab.getCreateVariableHeader());
    }

    async clickCreateVariableDropdownEmpty(){
        await this.clickAndWait(await this.varTab.getCreateVariableEmpty());
    }

    async clickCreateVariableDropdownItem(item){
        await this.clickAndWait(await this.varTab.getCreateVariableItem(item));
    }

    async verifyImportVariablePopupLoaded(){
        await this.assertVisible(await this.varTab.getPopupDismiss());
        await this.assertVisible(await this.varTab.getUploadRadioButton());
        await this.assertVisible(await this.varTab.getPasteRadioButton());
        await this.assertPresent(await variablesTab.getDragNDropFileSelector()); //N.B. display: none
        await this.assertVisible(await this.varTab.getImportButton());
        await this.verifyElementContainsText(await this.varTab.getPopupTitle(), 'Import Variable')
    }

    async verifyCreateVariablePopupLoaded(){
        await this.assertVisible(await this.varTab.getPopupDismiss());
        await this.assertVisible(await this.varTab.getPopupCancelSimple());
        await this.assertVisible(await this.varTab.getPopupCreate());
        await this.assertVisible(await this.varTab.getCreateVariableNameInput());
        await this.assertVisible(await this.varTab.getCreateVariableTypeDropdown());
        await this.verifyElementContainsText(await this.varTab.getPopupTitle(), 'Create Variable');
    }

}

module.exports = variablesSteps;
