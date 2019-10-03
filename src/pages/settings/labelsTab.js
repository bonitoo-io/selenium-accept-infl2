const { By } = require('selenium-webdriver');

const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const labelsFilter = '[data-testid=search-widget]';
const createLabelHeader = '[data-testid=button-create]';
const nameSort = '[data-testid=sorter--name]';
const descSort = '[data-testid=sorter--desc]';
const createLabelEmpty = '[data-testid=button-create-initial]';
const labelCard = '//*[@data-testid=\'label-card\'][.//span[text()=\'%NAME%\']]';
const labelCardPill = '//*[@data-testid=\'label-card\']//div[./span[@data-testid=\'label--pill %NAME%\']]';
const labelCardDescr = '//*[@data-testid=\'label-card\'][.//span[text()=\'%NAME%\']]//*[@data-testid=\'cf-resource-card--meta-item\'][contains(text(), \'Description\')]';

const urlCtx = 'labels';

//Create Label Popup
const labelPopupNameInput = '[data-testid=create-label-form--name]';
const labelPopupDescrInput = '[data-testid=create-label-form--description]';
const labelPopupColorPicker = '[data-testid=color-picker]';
const labelPopupColorInput = '[data-testid=color-picker--input]';
const labelPopupCreateBtn = '[data-testid=create-label-form--submit]';
const labelPopupCancelBtn = '[data-testid=create-label-form--cancel]';
const labelPopupPreview = '[data-testid=overlay--body] [data-testid=form--box] div';
const labelPopupPreviewPill = '[data-testid=overlay--body] [data-testid^=label--pill]';
const labelPopupRandomColor = '[data-testid=color-picker--randomize]';
const labelPopupColorSwatch = '[data-testid=color-picker--swatch][title=\'%NAME%\']';

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

    async getNameSort(){
        return await this.driver.findElement(By.css(nameSort));
    }

    async getDescSort(){
        return await this.driver.findElement(By.css(descSort));
    }

    async getLabelsFilter(){
        return await this.driver.findElement(By.css(labelsFilter));
    }

    async getCreateLabelHeader(){
        return await this.driver.findElement(By.css(createLabelHeader));
    }

    async getCreateLabelEmpty(){
        return await this.driver.findElement(By.css(createLabelEmpty));
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

    async getLabelPopupPreview(){
        return await this.driver.findElement(By.css(labelPopupPreview));
    }

    async getLabelPopupPreviewPill(){
        return await this.driver.findElement(By.css(labelPopupPreviewPill));
    }

    async getLabelPopupRandomColor(){
        return await this.driver.findElement(By.css(labelPopupRandomColor));
    }

    async getLabelPopupColorSwatch(name){
        return await this.driver.findElement(By.css(labelPopupColorSwatch.replace('%NAME%', name)));
    }

    async getLabelCard(name){
        return await this.driver.findElement(By.xpath(labelCard.replace('%NAME%', name)));
    }

    static getLabelCardSelector(name){
        return { type: 'xpath', selector: labelCard.replace('%NAME%', name)};
    }

    async getLabelCardPill(name){
        return await this.driver.findElement(By.xpath(labelCardPill.replace('%NAME%', name)));
    }

    async getLabelCardDescr(name){
        return await this.driver.findElement(By.xpath(labelCardDescr.replace('%NAME%', name)));
    }

}

module.exports = labelsTab;
