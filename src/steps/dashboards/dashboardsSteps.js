const { expect, assert } = require('chai');

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
        await this.clickAndWait(await this.dbdsPage.getCreateDashboardDropdown()); // todo better wait
    }

    async clickCreateDashboardItem(item){
        await this.clickAndWait(await this.dbdsPage.getCreateDashboardItem(item)); // todo better wait
    }

    async clickCreateDashboardEmpty(){
        await this.clickAndWait(await this.dbdsPage.getCreateDashboardDropdownEmpty()); // todo better wait
    }

    async verifyEmptyCreateDashboardItems(items){
        let itemsArr = items.split(',');
        await this.dbdsPage.getCreateDashboardItems().then( async pgItems => {
            for( let i = 0; i < pgItems.length; i++){
                expect(await pgItems[i].getAttribute('id')).to.equal(itemsArr[i].trim());
            }
        });
    }

    async verifyEmptyCreateDashboardNotPresent(){
        await this.assertNotPresent(dashboardsPage.getCreateDashboardDropdownEmptySelector());
    }

    async verifyDashboardCardVisible(name){
        await this.assertVisible(await this.dbdsPage.getDashboardCardByName(name));
    }

    async hoverOVerDashboardCard(name){
        await this.hoverOver(await this.dbdsPage.getDashboardCardByName(name));
    }

    async verifyExportButtonOfCardVisible(name){
        await this.assertVisible(await this.dbdsPage.getDashboardCardExportButton(name));
    }

    async verifyCloneButtonOfCardVisible(name){
        await this.assertVisible(await this.dbdsPage.getDashboardCardCloneButton(name));
    }

    async verifyDeleteButtonOfCardVisible(name){
        await this.assertVisible(await this.dbdsPage.getDashboardCardDeleteButton(name));
    }

    async hoverOverDashboardCardName(name){
        await this.hoverOver(await this.dbdsPage.getDashboardCardName(name));
    }

    async clickDashboardCardName(name){
        await this.clickAndWait(await this.dbdsPage.getDashboardCardNameButton(name));
    }

}

module.exports = dashboardsSteps;

