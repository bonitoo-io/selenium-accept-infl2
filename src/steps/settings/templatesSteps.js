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

    async verifyImportTemplatePopupLoaded(){
        await this.assertVisible(await this.tmTab.getImportTemplateUploadButton());
        await this.assertVisible(await this.tmTab.getImportTemplatePasteButton());
        await this.assertVisible(await this.tmTab.getPopupSubmit());
        await this.assertVisible(await this.tmTab.getPopupDismiss());
        await this.assertVisible(await this.tmTab.getPopupFileUploadHeader());
        await this.verifyElementContainsText(await this.tmTab.getPopupTitle(), 'Import Template');
    }

    async verifyImportTemplateFileUpload(present){
        if(present){
            await this.assertPresent(await this.tmTab.getPopupFileUploadSelector());
        }else{
            await this.assertNotPresent(await this.tmTab.getPopupFileUploadSelector());
        }
    }

    async verifyImportTemplatePasteJSON(present){
        if(present){
            await this.assertPresent(await templatesTab.getImportTemplateJSONTextAreaSelector());
        }else{
            await this.assertNotPresent(await templatesTab.getImportTemplateJSONTextAreaSelector())
        }
    }

    async clickUserTemplatesButton(){
        await this.clickAndWait(await this.tmTab.getUserTemplatesRadioButton());
    }

    async clickImportTemplateEmptyButton(){
        await this.clickAndWait(await this.tmTab.getImportTemplateEmptyButton());
    }

    async verifyImportTemplatePopupSubmitEnabled(enabled){
        if(enabled){
            await this.verifyElementEnabled(await this.tmTab.getPopupSubmit());
        }else{
            await this.verifyElementDisabled(await this.tmTab.getPopupSubmit());
        }
    }

    async clickImportTemplateHeaderButton(){
        await this.clickAndWait(await this.tmTab.getImportTemplateHeaderButton(),
            //seems to be overrunning ui response
            async () => { this.driver.sleep(1000)}); //todo better wait
    }

    async clickImportTemplatePasteButton(){
        await this.clickAndWait(await this.tmTab.getImportTemplatePasteButton(),
            async () => {  this.driver.sleep(1000)}); //todo better wait
    }

    async clickImportTemplateUploadButton(){
        await this.clickAndWait(await this.tmTab.getImportTemplateUploadButton());
    }

    async enterTextImportTemplateJSON(text){
        await this.typeTextAndWait(await this.tmTab.getImportTemplateJSONTextArea(), text);
    }

}

module.exports = templatesSteps;
