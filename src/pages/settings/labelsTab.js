const { By } = require('selenium-webdriver');

const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const labelsFilter = '[data-testid=search-widget]';
const createLabelHeader = '[data-testid=button-create]';
const nameSort = '[data-testid=sorter--name]';
const descSort = '[data-testid=sorter--desc]';
//const createVariableBody = '[data-testid=button-create-initial]';

const urlCtx = 'labels';

//Create Label Popup
const labelPopupNameInput = '[data-testid=create-label-form--name]';
const labelPopupDescrInput = '[data-testid=create-label-form--description]';
const labelPopupColorPicker = '[data-testid=color-picker]';
const labelPopupColorInput = '[data-testid=color-picker--input]';
const labelPopupCreateBtn = '[data-testid=create-label-form--submit]';
const labelPopupCancelBtn = '[data-testid=create-label-form--cancel]';

class labelsTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: labelsFilter},
                {type: 'css', selector: createLabelHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: descSort},
            ]
        );
    }

    async getLabelPopupNameInput(){
        return await this.driver.findElement(By.css(labelPopupNameInput));
    }

    async getLabelPopupDescrInput(){
        return await this.driver.findElement(By.css(labelPopupDescrInput));
    }

    async getLabelPopupColorPicker(){
        return await this.driver.findElement(By.css(labelPopupColorPicker));
    }

    async getLabelPopupColorInput(){
        return await this.driver.findElement(By.css(labelPopupColorInput));
    }

    async getLabelPopupCreateBtn(){
        return await this.driver.findElement(By.css(labelPopupCreateBtn));
    }

    async getLabelPopupCancelBtn(){
        return await this.driver.findElement(By.css(labelPopupCancelBtn));
    }

}

module.exports = labelsTab;
