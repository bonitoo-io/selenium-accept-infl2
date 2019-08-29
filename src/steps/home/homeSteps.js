const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const homePage = require(__srcdir + '/pages/home/homePage.js');

class homeSteps extends influxSteps {

    constructor(driver){
        super(driver);
        this.homePage = new homePage(driver);
    }

    async isLoaded(){
        await this.homePage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.homePage.getLogoutButton());
        this.assertVisible(await this.homePage.getGetStartedDataCollect());
        this.assertVisible(await this.homePage.getGetStartedDashboard());
        this.assertVisible(await this.homePage.getGetStartedExplore());
        this.assertVisible(await this.homePage.getTutorialsList());
        this.assertVisible(await this.homePage.getUsefulLinksList());
        this.assertVisible(await this.homePage.getTutorialLinkByText('Get Started with Flux'));
        this.assertVisible(await this.homePage.getUsefulLinkByText('Documentation'));
    }

    async clickLogout(){
        await this.homePage.getLogoutButton().then(async btn => {
            await btn.click();
        });
    }

    async clickQuickStartPanel(title){
        switch(title.toLowerCase()){
        case 'data collector':
            await (await this.homePage.getGetStartedDataCollect()).click();
            break;
        case 'dashboard':
            await (await this.homePage.getGetStartedDashboard()).click();
            break;
        case 'explorer':
            await (await this.homePage.getGetStartedExplore()).click();
            break;
        default:
            throw `Unknown Quick Start Panel: ${title}`;
        }
    }



}


module.exports = homeSteps;