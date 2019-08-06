const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const createDashboardDropdown = '[data-testid=add-resource-dropdown--button]';
const filterDashboards =  '[data-testid=search-widget]';
const nameSortButton = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const modifiedSortButton = '[data-testid=resource-list--sorter]:nth-of-type(2)';

const urlCtx = 'dashboards';

class dashboardsPage extends influxPage {

    constructor(driver){
        super(driver)
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

}

module.exports = dashboardsPage
