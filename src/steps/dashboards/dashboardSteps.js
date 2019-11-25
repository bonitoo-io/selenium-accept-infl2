const expect = require('chai').expect;
const Key = require('selenium-webdriver').Key;

const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const dashboardPage = require(__srcdir + '/pages/dashboards/dashboardPage.js');

class dashboardSteps extends influxSteps {

    constructor(driver) {
        super(driver);
        this.dbdPage = new dashboardPage(driver);
    }

    async nameDashboard(name){
        await this.dbdPage.getPageTitle().then(async elem => {
            await elem.click().then( async () => {
                await this.dbdPage.getNameInput().then(async input => {
                    await input.clear().then(async () => {
                        await input.sendKeys(name + Key.ENTER).then(async () => {
                        });
                    });
                });
            });
        });
    }

    async verifyDashboardLoaded(name){
        await this.dbdPage.isLoaded();
        await this.dbdPage.getPageTitle().then(async title => {
            await title.getText().then(async text => {
                await expect(text).to.equal(name);
            });
        });

    }

    async verifyDashboardCellVisible(name){
        await this.assertVisible(await this.dbdPage.getCellByName(name));
    }

}

module.exports = dashboardSteps;
