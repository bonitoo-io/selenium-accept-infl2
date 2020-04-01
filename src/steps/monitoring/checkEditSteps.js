const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const checkEditPage = require(__srcdir + '/pages/monitoring/checkEditPage.js');

class checkEditSteps extends influxSteps {

    constructor(driver) {
        super(driver);
        this.ckEdPage = new checkEditPage(__wdriver);
    }

    async isLoaded() {
        await this.ckEdPage.isLoaded();
    }

    async verifyIsLoaded() {
        await this.assertVisible(await this.ckEdPage.getPageCheckEditTitle());
        await this.assertVisible(await this.ckEdPage.getQueriesToggle());
        await this.assertVisible(await this.ckEdPage.getConfigureCheckToggle());
    }

    async verifyIsNotLoaded(){
        await this.assertNotPresent(checkEditPage.getOverlaySelector());
    }

    async dismissOverlay(){
        await this.clickAndWait(await this.ckEdPage.getDismissButton());
    }

}

module.exports = checkEditSteps;
