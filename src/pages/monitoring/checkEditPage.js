const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const overlay = '[data-testid=overlay]';
const dismissButton = '[data-testid=page-control-bar] [data-testid=square-button]';
const pageCheckEditTitle = '[data-testid=overlay] [data-testid=page-header] [data-testid=page-title]';
const pageCheckEditTitleInput = '[data-testid=\'page-header\'] [data-testid=\'input-field\']';
const queriesToggle = '[data-testid=overlay] [data-testid=select-group--option][title=queries]';
const configureCheckToggle = '[data-testid=overlay] [data-testid=\'checkeo--header alerting-tab\']';


// TODO timemachine controls -- see dashboards - try and reuse

// Configure Check Controls

//    Properties
const confChkIntervalInput = '//*[./label/span[text() = \'Schedule Every\']]//*[@data-testid=\'duration-input\']';
const confChkOffset = '//*[./label/span[text() = \'Offset\']]//*[@data-testid=\'duration-input\']';
const confChkAddTagButton = '//*[./label/span[text() = \'Tags\']]//*[@data-testid=\'dashed-button\']';
//    Status Message Template
const confChkMessageTextArea = '[data-testid=status-message-textarea]';
// Thresholds
const confChkAddThresholdButton = '[data-testid=add-threshold-condition-%STATUS%]';


const urlCtx = 'checks';

class checkEditPage extends influxPage {

    constructor(driver) {
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([
            {type: 'css', selector: dismissButton},
            {type: 'css', selector: pageCheckEditTitle},
            {type: 'css', selector: queriesToggle},
            {type: 'css', selector: configureCheckToggle}
        ], urlCtx);
    }

    static getOverlaySelector(){
        return { type: 'css', selector: overlay};
    }

    async getDismissButton(){
        return await this.driver.findElement(By.css(dismissButton));
    }

    async getPageCheckEditTitle(){
        return await this.driver.findElement(By.css(pageCheckEditTitle));
    }

    async getQueriesToggle(){
        return await this.driver.findElement(By.css(queriesToggle));
    }

    async getConfigureCheckToggle(){
        return await this.driver.findElement(By.css(configureCheckToggle))
    }

    async getPageCheckEditTitleInput(){
        return await this.driver.findElement(By.css(pageCheckEditTitleInput));
    }

    async getConfChkIntervalInput(){
        return await this.driver.findElement(By.xpath(confChkIntervalInput));
    }

    async getConfChkOffset(){
        return await this.driver.findElement(By.xpath(confChkOffset));
    }

    async getConfChkAddTagButton(){
        return await this.driver.findElement(By.xpath(confChkAddTagButton));
    }

    async getConfChkMessageTextArea(){
        return await this.driver.findElement(By.css(confChkMessageTextArea));
    }

    async getConfChkAddThresholdButton(status){
        return await this.driver.findElement(By.css(confChkAddThresholdButton.replace('%STATUS%', status)));
    }

}

module.exports = checkEditPage;
