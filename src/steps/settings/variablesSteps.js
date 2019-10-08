const { By } = require('selenium-webdriver');
const { expect } = require('chai');
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

    async clickImportPopupPasteJSON(){
        await this.clickAndWait(await this.varTab.getPasteRadioButton());
    }

    async verifyImportPopupJSONTextareaVisible(visible){
        if(visible){
            await this.assertVisible(await this.varTab.getPasteJSONTextarea());
        }else{
            await this.assertNotPresent(variablesTab.getPasteJSONTextareaSelector());
        }
    }

    async verifyImportPopupImportJSONButtonEnabled(enabled) {
        if (enabled) {
            await this.verifyElementEnabled(await this.varTab.getImportButton());
        }else{
            await this.verifyElementDisabled(await this.varTab.getImportButton());
        }
    }

    async clickImportPopupUploadFile(){
        await this.clickAndWait(await this.varTab.getUploadRadioButton());
    }

    async verifyImportPopupFileUploadPresent(){
        await this.assertPresent(await variablesTab.getDragNDropFileSelector());
    }

    async verifyCreateVarPopupSelectedType(type){
        await this.varTab.getCreateVariableTypeDropdown().then(async elem => {
            await this.verifyElementText(await elem.findElement(By.css('[class*=selected]')), type);
        })
    }

    async verifyCreatePopupCreateEnabled(enabled){
        if(enabled) {
            await this.verifyElementEnabled(await this.varTab.getPopupCreate());
        }else{
            await this.verifyElementDisabled(await this.varTab.getPopupCreate());
        }
    }

    async verifyCreateVarPopupQueryEditorVisible(visible){
        if(visible){
            await this.assertVisible(await this.varTab.getCreateVariableQueryCodeMirror());
        }else{
            await this.assertNotPresent(await variablesTab.getCreateVariableQueryCodeMirrorSelector());
        }
    }

    async clickCreateVariableTypeDropdown(){
        await this.clickAndWait(await this.varTab.getCreateVariableTypeDropdown())
    }

    async clickCreateVarPopupTypeDropdownItem(item){
        await this.clickAndWait(await this.varTab.getCreateVariableTypeDropdownItem(item));
    }

    async verifyCreateVarPopupTextareaVisible(visible){
        if(visible){
            await this.assertVisible(await this.varTab.getCreateVariableTextArea());
        }else{
            await this.assertNotPresent(variablesTab.getCreateVariableTextAreaSelector());
        }
    }

    async verifyCreateVarPopupDefaultValDropdownVisible(visible){
        if(visible){
            await this.assertVisible(await this.varTab.getCreateVariableDefaultValDropdown());
        }else{
            await this.assertNotPresent(variablesTab.getCreateVariableDefaultValDropdownSelector());
        }
    }

    async verifyCreateVarPopupInfoCount(count){
        await this.varTab.getCreateVariableInfoPara().then(async elem => {
            await elem.getText().then(async elText=> {
                // e.g. "Mapping Contains 0 key-value pairs"
                let tokens = elText.split(' ');
                expect(parseInt(tokens[2])).to.equal(parseInt(count));
            })
        });
    }

    async verifyCreateVarPopupInfoVisible(visible){
        if(visible){
            await this.assertVisible(await this.varTab.getCreateVariableInfoPara());
        }else{
            await this.assertNotPresent(variablesTab.getCreateVariableInfoParaSelector());
        }
    }
}



module.exports = variablesSteps;
