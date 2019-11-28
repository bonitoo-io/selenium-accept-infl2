const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const pageTitle = '[data-testid=page-title]';
const nameInput = '[data-testid=page-header] [data-testid=input-field]';
const graphToolTips = '[data-testid=page-header--right] [data-testid=graphtips-question-mark]';
const addCellButtonHeader = '//*[@data-testid=\'page-header--right\']//*[@data-testid=\'button\'][.//*[text()=\'Add Cell\']]';
const addNoteButton = '//*[@data-testid=\'page-header--right\']//*[@data-testid=\'button\'][.//*[text()=\'Add Note\']]';
const variablesButton = '//*[@data-testid=\'page-header--right\']//*[@data-testid=\'button\'][.//*[text()=\'Variables\']]';
const timeLocaleDropdown = '//*[@data-testid=\'page-header--right\']//*[@data-testid=\'dropdown--button\'][.//*[contains(@class,\'annotate\')]]';
const autorefresh = '//*[@data-testid=\'page-header--right\']/*[contains(@class,\'autorefresh-dropdown\')]';
const refreshRateDropdown = '//*[@data-testid=\'page-header--right\']//*[contains(@class,\'autorefresh\')]//*[@data-testid=\'dropdown--button\']';
const forceRefreshButton = '//*[@data-testid=\'page-header--right\']//*[contains(@class,\'autorefresh\')]//*[@data-testid=\'square-button\']';
const timeRangeDropdown = '//*[@data-testid=\'page-header--right\']//*[@data-testid=\'timerange-dropdown\']//*[@data-testid=\'dropdown--button\']';
const presentationModeButton = '//*[@data-testid=\'page-header--right\']//*[contains(@title,\'Presentation\')]';

const dropdownMenuItem = '//*[@data-testid=\'dropdown-menu\']//*[contains(@data-testid,\'dropdown-item\')]/*[text()=\'%ITEM%\']';
const dropdownMenuDivider = '//*[@data-testid=\'dropdown-menu\']//*[@data-testid=\'dropdown-divider\'][text()=\'%LABEL%\']';

const emptyStateTextLink = '[data-testid=\'empty-state--text\'] a';
const emptyStateAddCellButton = '[data-testid=\'empty-state\'] [data-testid=\'add-cell--button\']';

const cellByName = '//*[contains(@class, \' cell \')][.//*[text()=\'%NAME%\']]';

const urlCtx = 'dashboards';

class dashboardPage extends influxPage {

    constructor(driver) {
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: pageTitle},
            {type: 'css', selector: graphToolTips},
            {type: 'xpath', selector: addCellButtonHeader},
            {type: 'xpath', selector: addNoteButton},
            {type: 'xpath', selector: variablesButton},
            {type: 'xpath', selector: timeLocaleDropdown},
            {type: 'xpath', selector: autorefresh},
            {type: 'xpath', selector: timeRangeDropdown},
            {type: 'xpath', selector: presentationModeButton}], urlCtx);
    }


    async getPageTitle(){
        //return await this.driver.findElement(By.css(pageTitle));
        return await this.smartGetElement({type: 'css', selector: pageTitle});
    }

    async getNameInput(){
        return await this.driver.findElement(By.css(nameInput));
    }

    async getCellByName(name){
        return await this.driver.findElement(By.xpath(cellByName.replace('%NAME%', name)));
    }

    async getGraphToolTips(){
        return await this.driver.findElement(By.css(graphToolTips));
    }

    async getAddCellButtonHeader(){
        return await this.driver.findElement(By.xpath(addCellButtonHeader));
    }

    async getAddNoteButton(){
        return await this.driver.findElement(By.xpath(addNoteButton));
    }

    async getVariablesButton(){
        return await this.driver.findElement(By.xpath(variablesButton));
    }

    async getTimeLocaleDropdown(){
        return await this.driver.findElement(By.xpath(timeLocaleDropdown));
    }

    async getRefreshRateDropdown(){
        return await this.driver.findElement(By.xpath(refreshRateDropdown));
    }

    async getForceRefreshButton(){
        return await this.driver.findElement(By.xpath(forceRefreshButton));
    }

    async getTimeRangeDropdown(){
        return await this.driver.findElement(By.xpath(timeRangeDropdown));
    }

    async getPresentationModeButton(){
        return await this.driver.findElement(By.xpath(presentationModeButton));
    }

    async getEmptyStateTextLink(){
        return await this.driver.findElement(By.css(emptyStateTextLink));
    }

    async getEmptyStateAddCellButton(){
        return await this.driver.findElement(By.css(emptyStateAddCellButton));
    }

    async getDropdownMenuItem(item){
        return await this.driver.findElement(By.xpath(dropdownMenuItem.replace('%ITEM%', item)))
    }

    async getdropdownMenuDivider(label){
        return await this.driver.findElement(By.xpath(dropdownMenuDivider.replace('%LABEL%', label)));
    }
}

module.exports = dashboardPage;
