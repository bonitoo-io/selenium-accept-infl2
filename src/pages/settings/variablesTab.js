const { By } = require('selenium-webdriver');
const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const variablesFilter = '[data-testid=search-widget]';
const createVariableHeader = '.tabbed-page-section--header [data-testid=add-resource-dropdown--button]';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const typeSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const createVariableEmpty = '[data-testid=resource-list--body] [data-testid=add-resource-dropdown--button]';
const createVariableItem = '[data-testid=add-resource-dropdown--%ITEM%]';
const variableCardNamed = '//*[@data-testid=\'resource-card\'][.//*[text()=\'%NAME%\']]';
const variableCardNames = '//*[@data-testid=\'resource-name\']/span/span';
const variableCardName = '//*[@data-testid=\'resource-name\']//span[text()=\'%NAME%\']';
const variableCardContextMenu = '//*[@data-testid=\'resource-card\'][.//span[text()=\'%NAME%\']]//*[@data-testid=\'context-menu\']';
const variableCardContextMenuItem = '//*[@data-testid=\'resource-card\'][.//span[text()=\'%NAME%\']]//*[button[@data-testid=\'context-menu\']]//button[text()=\'%ITEM%\']';

const urlCtx = 'variables';

// import variable popup
const uploadRadioButton = '[data-testid=radio--button][title=Upload]';
const pasteRadioButton = '[data-testid=radio--button][title=Paste]';
const dragNDropFile = 'input[type=file]'; //N.B. has display:none
const importButton = '[data-testid=overlay--footer] [data-testid=button]';
const pasteJSONTextarea = '[data-testid=overlay--body] [data-testid=textarea]';
const importVariableDragNDropHeader = '.drag-and-drop--header';

// create variable popup
const createVariableNameInput = '[data-testid=overlay--body] [data-testid=input-field]';
const createVariableTypeDropdown = '[data-testid=\'variable-form--dropdown-button\']';
const createVariableQueryCodeMirror = '.CodeMirror';
const createVariableTextArea = '[data-testid=overlay--body] [data-testid=textarea]';
const createVariableTypeDropdownItem = '[data-testid=\'variable-form--dropdown-%ITEM%\']';
const createVariableDefaultValDropdown = '//*[@data-testid=\'form--element\'][label/span[text() = \'Select A Default\']]//*[@data-testid=\'dropdown--button\']';
const createVariableInfoPara = '//*[@data-testid=\'grid--column\'][p[contains(text(), \'ontains\')]]';
const createVariableDefaultValDropdownItem = '[data-testid=dropdown-item][id=\'%ITEM%\']';
const createVariableDefaultValCSVDropdownItem = '//*[@data-testid=\'dropdown-item\']//*[text() = \'%ITEM%\']';

//Warning popup
const updateNameNameInput = '[data-testid=overlay--body] [data-testid=input-field]';

//edit variable popup
const editVariableTypeDropdown = '//*[@data-testid=\'form--element\'][.//span[text()=\'Type\']]//*[@data-testid=\'dropdown--button\']';

class variablesTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: variablesFilter},
                {type: 'css', selector: createVariableHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: typeSort},
            ]
        );
    }

    async getVariablesFilter(){
        return await this.driver.findElement(By.css(variablesFilter));
    }

    async getCreateVariableHeader(){
        return await this.driver.findElement(By.css(createVariableHeader));
    }

    async getCreateVariableEmpty(){
        return await this.driver.findElement(By.css(createVariableEmpty));
    }

    async getCreateVariableItem(item){
        return await this.driver.findElement(By.css(createVariableItem.replace('%ITEM%', item)))
    }

    async getPasteRadioButton(){
        return await this.driver.findElement(By.css(pasteRadioButton));
    }

    async getUploadRadioButton(){
        return await this.driver.findElement(By.css(uploadRadioButton));
    }

    async getDragNDropFile(){
        return await this.driver.findElement(By.css(dragNDropFile));
    }

    static getDragNDropFileSelector(){
        return { type: 'css', selector: dragNDropFile};
    }

    async getImportButton(){
        return await this.driver.findElement(By.css(importButton));
    }

    async getCreateVariableNameInput(){
        return await this.driver.findElement(By.css(createVariableNameInput));
    }

    async getCreateVariableTypeDropdown(){
        return await this.driver.findElement(By.css(createVariableTypeDropdown));
    }

    async getCreateVariableQueryCodeMirror(){
        return await this.driver.findElement(By.css(createVariableQueryCodeMirror));
    }

    static getCreateVariableQueryCodeMirrorSelector(){
        return {type: 'css', selector: createVariableQueryCodeMirror };
    }

    async getCreateVariableTextArea(){
        return await this.driver.findElement(By.css(createVariableTextArea));
    }

    static getCreateVariableTextAreaSelector(){
        return {type: 'css', selector: createVariableTextArea}
    }

    async getPasteJSONTextarea(){
        return await this.driver.findElement(By.css(pasteJSONTextarea));
    }

    static getPasteJSONTextareaSelector(){
        return { type: 'css', selector: pasteJSONTextarea};
    }

    async getCreateVariableTypeDropdownItem(item){
        return await this.driver.findElement(By.css(createVariableTypeDropdownItem
            .replace('%ITEM%', item.toLowerCase())));
    }

    async getCreateVariableDefaultValDropdown(){
        return await this.driver.findElement(By.xpath(createVariableDefaultValDropdown));
    }

    static getCreateVariableDefaultValDropdownSelector(){
        return { type: 'xpath', selector: createVariableDefaultValDropdown};
    }

    async getCreateVariableInfoPara(){
        return await this.driver.findElement(By.xpath(createVariableInfoPara));
    }

    static getCreateVariableInfoParaSelector(){
        return { type: 'xpath', selector: createVariableInfoPara};
    }

    async getImportVariableDragNDropHeader(){
        return await this.driver.findElement(By.css(importVariableDragNDropHeader));
    }

    async getVariableCardNamed(name){
        return await this.driver.findElement(By.xpath(variableCardNamed.replace('%NAME%', name)));
    }

    static getVariableCardSelectorByName(name){
        return { type: 'xpath', selector: variableCardNamed.replace('%NAME%', name)};
    }

    async getCreateVariableDefaultValDropdownItem(item){
        return await this.driver.findElement(By.css(createVariableDefaultValDropdownItem.replace('%ITEM%', item)));
    }

    async getCreateVariableDefaultValCSVDropdownItem(item){
        return await this.driver.findElement(By.xpath(createVariableDefaultValCSVDropdownItem.replace('%ITEM%', item)));
    }

    async getVariableCardNames(){
        return await this.driver.findElements(By.xpath(variableCardNames));
    }

    async getVariableCardName(name){
        return await this.driver.findElement(By.xpath(variableCardName.replace('%NAME%', name)));
    }

    async getNameSort(){
        return await this.driver.findElement(By.css(nameSort));
    }

    async getEditVariableTypeDropdown(){
        return await this.driver.findElement(By.xpath(editVariableTypeDropdown));
    }

    async getVariableCardContextMenu(name){
        return await this.driver.findElement(By.xpath(variableCardContextMenu.replace('%NAME%', name)));
    }

    async getVariableCardContextMenuItem(name, item){
        return await this.driver.findElement(By.xpath(variableCardContextMenuItem
            .replace('%NAME%', name)
            .replace('%ITEM%', item)))
    }

    async getUpdateNameNameInput(){
        return await this.driver.findElement(By.css(updateNameNameInput));
    }

}

module.exports = variablesTab;
