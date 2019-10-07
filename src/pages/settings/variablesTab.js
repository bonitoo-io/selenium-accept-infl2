const { By } = require('selenium-webdriver');
const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const variablesFilter = '[data-testid=search-widget]';
const createVariableHeader = '.tabbed-page-section--header [data-testid=add-resource-dropdown--button]';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const typeSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const createVariableEmpty = '[data-testid=resource-list--body] [data-testid=add-resource-dropdown--button]';
const createVariableItem = '[data-testid=add-resource-dropdown--%ITEM%]';

const urlCtx = 'variables';

// import variable popup
const uploadRadioButton = '[data-testid=radio--button][title=Upload]';
const pasteRadioButton = '[data-testid=radio--button][title=Paste]';
const dragNDropFile = 'input[type=file]'; //N.B. has display:none
const importButton = '[data-testid=overlay--footer] [data-testid=button]';

// create variable popup
const createVariableNameInput = '[data-testid=overlay--body] [data-testid=input-field]';
const createVariableTypeDropdown = '[data-testid=overlay--body] [data-testid=dropdown--button]';
const createVariableQueryCodeMirror = '.CodeMirror';
const createVariableTextArea = '[data-testid=overlay--body] [data-testid=textarea]';

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

    async getCreateVariableTextArea(){
        return await this.driver.findElement(By.css(createVariableTextArea));
    }




}

module.exports = variablesTab;
