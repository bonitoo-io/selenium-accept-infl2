const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const dashboardsPage = require(__srcdir + '/pages/dashboards/dashboardsPage.js');

class dashboardsSteps extends influxSteps {

    constructor(driver){
        super(driver);
        this.dbdsPage = new dashboardsPage(driver);
    }

    async isLoaded(){
        await this.dbdsPage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.dbdsPage.getCreateDashboardDropdown());
        this.assertVisible(await this.dbdsPage.getFilterDashboards());
        this.assertVisible(await this.dbdsPage.getNameSortButton());
        this.assertVisible(await this.dbdsPage.getModifiedSortButton());
    }

    async clickCreateDashboard(){
        await this.dbdsPage.getCreateDashboardDropdown().then(async elem => {
            await elem.click();
        })
    }

    async clickCreateDashboardItem(item){
        await this.dbdsPage.getCreateDashboardItem(item).then(async elem => {
            await elem.click();
        })
    }
}

module.exports = dashboardsSteps;

