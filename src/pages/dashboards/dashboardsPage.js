const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const createDashboardDropdown = '[data-testid=add-resource-dropdown--button]';
const filterDashboards =  '[data-testid=search-widget]';
const nameSortButton = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const modifiedSortButton = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const createDashboardDropdownEmpty = '[data-testid=\'resource-list\'] [data-testid=\'add-resource-dropdown--button\']';
const createDashboardItems = '[data-testid^=add-resource-dropdown--][id]';
const dashboardCardByName = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]';
const dashboardCardExportButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@class=\'context-menu--container\'][.//*[text() = \'Export\']]';
const dashboardCardCloneButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@class=\'context-menu--container\'][.//*[text() = \'Clone\']]'
const dashboardCardDeleteButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@class=\'context-menu--container\'][.//*[text() = \'Delete\']]'
const dashboardCardName = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'dashboard-card--name\']';
const dashboardCardNameButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'dashboard-card--name-button\']';
const dashboardCardNameInput = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'dashboard-card--input\']';
const dashboardCardDescription = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'resource-list--editable-description\']';
const dashboardCardDescriptionEdit = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'resource-list--editable-description\']//*[@data-testid=\'icon\']'
const dashboardCardDescriptionInput = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'resource-list--editable-description\']//*[@data-testid=\'input-field\']';

const urlCtx = 'dashboards';

class dashboardsPage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: createDashboardDropdown},
            {type: 'css', selector: filterDashboards} ,
            {type: 'css', selector: nameSortButton},
            {type: 'css', selector: modifiedSortButton}
        ], urlCtx);
    }

    async getCreateDashboardDropdown(){
        return await this.driver.findElement(By.css(createDashboardDropdown));
    }

    async getFilterDashboards(){
        return await this.driver.findElement(By.css(filterDashboards));
    }

    async getNameSortButton(){
        return await this.driver.findElement(By.css(nameSortButton));
    }

    async getModifiedSortButton(){
        return await this.driver.findElement(By.css(modifiedSortButton));
    }

    async getCreateDashboardItem(item){
        return await this.driver.findElement(By.css(`[data-testid^=add-resource-dropdown--][id='${item}']`));
    }

    async getCreateDashboardDropdownEmpty(){
        return await this.driver.findElement(By.css(createDashboardDropdownEmpty));
    }

    static getCreateDashboardDropdownEmptySelector(){
        return { type: 'css', selector: createDashboardDropdownEmpty}
    }

    async getCreateDashboardItems(){
        return await this.driver.findElements(By.css(createDashboardItems));
    }

    async getDashboardCardByName(name){
        return await this.driver.findElement(By.xpath(dashboardCardByName.replace('%NAME%', name)))
    }

    static getDashboardCardSelectorByName(name){
        return {  type: 'xpath', selector: dashboardCardByName.replace('%NAME%', name) }
    }

    async getDashboardCardExportButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardExportButton.replace('%NAME%', name)));
    }

    static getDashboardCardExportButtonSelector(name){
        return { type: 'xpath', selector: dashboardCardExportButton.replace('%NAME%', name)};
    }

    async getDashboardCardCloneButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardCloneButton.replace('%NAME%', name)));
    }

    static getDashboardCardCloneButtonSelector(name){
        return { type: 'xpath', selector: dashboardCardCloneButton.replace('%NAME%', name)};
    }


    async getDashboardCardDeleteButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardDeleteButton.replace('%NAME%', name)));
    }

    static getDashboardCardDeleteButtonSelector(name){
        return { type: 'xpath', selector: dashboardCardDeleteButton.replace('%NAME%', name)};
    }

    async getDashboardCardName(name){
        return await this.driver.findElement(By.xpath(dashboardCardName.replace('%NAME%', name)));
    }

    async getDashboardCardNameButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardNameButton.replace('%NAME%', name)));
    }

    async getDashboardCardNameInput(name){
        return await this.driver.findElement(By.xpath(dashboardCardNameInput.replace('%NAME%', name)));
    }

    async getDashboardCardDescription(name){
        return await this.driver.findElement(By.xpath(dashboardCardDescription.replace('%NAME%', name)));
    }

    async getDashboardCardDescriptionEdit(name){
        return await this.driver.findElement(By.xpath(dashboardCardDescriptionEdit.replace('%NAME%', name)));
    }

    async getDashboardCardDescriptionInput(name){
        return await this.driver.findElement(By.xpath(dashboardCardDescriptionInput.replace('%NAME%', name)));
    }

}

module.exports = dashboardsPage;
