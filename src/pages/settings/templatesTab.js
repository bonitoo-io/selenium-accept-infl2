const { By } = require('selenium-webdriver');

const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const templatesFilter = '[data-testid=search-widget]';
const importTemplateHeaderButton = '[data-testid=flex-box] [data-testid=flex-box] [data-testid=button]';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const templatesTypeFilterButton = '[data-testid=select-group--option][title=\'Static Templates\']';
const userTemplatesRadioButton = '[data-testid=select-group--option][title=\'User Templates\']';
const resourceList = '[data-testid=resource-list]';
const templateCardNames = '[data-testid=template-card--name] span span';
const importTemplateEmptyButton = '[data-testid=empty-state] [data-testid=button]';
const templateCardByName = '//*[@data-testid=\'template-card\'][.//*[text() = \'%NAME%\']]';
const templateCardCtxDelete = '//*[@data-testid=\'template-card\'][.//*[text() = \'%NAME%\']]//*[@data-testid=\'context-delete-menu\']';
const templateCardDeleteConfirm = '//*[@data-testid=\'template-card\'][.//*[text() = \'%NAME%\']]//*[@data-testid=\'context-delete-task\']';

const urlCtx = 'templates';

//import template popup
const importTemplateUploadButton = '[data-testid=overlay--body] [data-testid=select-group--option][title=Upload]';
const importTemplatePasteButton = '[data-testid=overlay--body] [data-testid=select-group--option][title=Paste]';
const importTemplateJSONTextArea = '[data-testid=overlay--body] [data-testid=textarea]';
const importTemplateDragNDrop = '[data-testid=overlay--body] input[type=file]';

class templatesTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: templatesFilter},
                {type: 'css', selector: importTemplateHeaderButton},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: templatesTypeFilterButton},
                {type: 'css', selector: resourceList},
            ]
        );
    }

    async getTemplateCardNames(){
        return await this.driver.findElements(By.css(templateCardNames));
    }

    async getUserTemplatesRadioButton(){
        return await this.driver.findElement(By.css(userTemplatesRadioButton));
    }

    async getImportTemplateEmptyButton(){
        return await this.driver.findElement(By.css(importTemplateEmptyButton));
    }

    async getImportTemplateUploadButton(){
        return await this.driver.findElement(By.css(importTemplateUploadButton));
    }

    async getImportTemplatePasteButton(){
        return await this.driver.findElement(By.css(importTemplatePasteButton));
    }

    async getImportTemplateHeaderButton(){
        return await this.driver.findElement(By.css(importTemplateHeaderButton));
    }

    async getImportTemplateJSONTextArea(){
        return await this.driver.findElement(By.css(importTemplateJSONTextArea));
    }

    static getImportTemplateJSONTextAreaSelector(){
        return { type: 'css', selector: importTemplateJSONTextArea};
    }

    async getImportTemplateDragNDrop(){
        return await this.driver.findElement(By.css(importTemplateDragNDrop));
    }

    async getTemplateCardByName(name){
        return await this.driver.findElement(By.xpath(templateCardByName.replace('%NAME%', name)));
    }

    static getTemplateCardSelectorByName(name){
        return { type: 'xpath', selector: templateCardByName.replace('%NAME%', name) };
    }

    async getTemplatesFilter(){
        return await this.driver.findElement(By.css(templatesFilter));
    }

    async getNameSort(){
        return await this.driver.findElement(By.css(nameSort));
    }

    async getTemplateCardCtxDelete(name){
        return await this.driver.findElement(By.xpath(templateCardCtxDelete.replace('%NAME%', name)));
    }

    async getTemplateCardDeleteConfirm(name){
        return await this.driver.findElement(By.xpath(templateCardDeleteConfirm.replace('%NAME%', name)));
    }

}

module.exports = templatesTab;
