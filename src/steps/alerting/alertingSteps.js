const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const alertingPage = require(__srcdir + '/pages/alerting/alertingPage.js');

class alertingSteps extends influxSteps{

    constructor(driver){
        super(driver);
        this.alPage = new alertingPage(__wdriver);
    }

    async isLoaded(){
        await this.alPage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.alPage.getCreateCheckButton());
        this.assertVisible(await this.alPage.getCreateEndpointButton());
        this.assertVisible(await this.alPage.getCreateRuleButton());
    }

}

module.exports = alertingSteps;
