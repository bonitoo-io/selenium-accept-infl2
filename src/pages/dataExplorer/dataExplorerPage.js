const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const timeLocaleDropdown = '[data-testid=select-dropdown]';
const graphTimeDropdodwn = '.page-header--right [data-testid=dropdown]';
const customizeGraphButton = '.page-header--right [data-testid=square-button] .cog-thick';
const saveAsButton = '//button[./span[text() = \'Save As\']]';
const viewArea = '.time-machine--view';
const viewRawToggle = '.time-machine-queries--controls [data-testid=slide-toggle--label]';
const autorefreshDropdown = 'div.autorefresh-dropdown';
const pausedAutorefreshButton = 'button.autorefresh-dropdown--pause'; //Present only when autorefresh is paused - not good candidate for page loade check
const timeRangeDropdown = '[data-testid="flex-box"] div:nth-of-type(4) button';
const scriptEditToggle = '[data-testid=switch-to-script-editor] '; //N.B. disappears when in Script edit mode - not good candidate for page load check
const queryBuildToggle = '[data-testid=switch-to-query-builder]'; //N.B. not present when in Query builder mode - not good candidate for page load check
const submitQueryButton = '[data-testid=time-machine-submit-button]';

//TODO - more controls

const urlCtx = 'data-explorer';

class dataExplorerPage extends influxPage {

    constructor(driver){
        super(driver);
    }


    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: timeLocaleDropdown},
            {type: 'css', selector: graphTimeDropdodwn},
            {type: 'css', selector: customizeGraphButton},
            {type: 'xpath', selector: saveAsButton},
            {type: 'css', selector: viewArea},
            {type: 'css', selector: viewRawToggle},
            {type: 'css', selector: autorefreshDropdown},
            {type: 'css', selector: timeRangeDropdown},
            {type: 'css', selector: submitQueryButton}
        ], urlCtx);
    }

    async getTimeLocaleDropdown(){
        return await this.driver.findElement(By.css(timeLocaleDropdown));
    }

    async getGraphTimeDropdown(){
        return await this.driver.findElement(By.css(graphTimeDropdodwn));
    }

    async getCustomizeGraphButton(){
        return await this.driver.findElement(By.css(customizeGraphButton));
    }

    async getSaveAsButton(){
        return await this.driver.findElement(By.xpath(saveAsButton));
    }

    async getViewArea(){
        return await this.driver.findElement(By.css(viewArea));
    }

    async getViewRawToggle(){
        return await this.driver.findElement(By.css(viewRawToggle));
    }

    async getAutoRefreshDropdown(){
        return await this.driver.findElement(By.css(autorefreshDropdown));
    }

    async getTimeRangeDropdown(){
        return await this.driver.findElement(By.css(timeRangeDropdown));
    }

    async getSubmitQueryButton(){
        return await this.driver.findElement(By.css(submitQueryButton));
    }

    //TODO - more element getters



}

module.exports = dataExplorerPage;
