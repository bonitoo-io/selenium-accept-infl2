const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const logoutButton = '[data-testid=button]';
const getStartedDataCollect = 'div.getting-started--container:nth-of-type(1)';
const getStartedDashboard = 'div.getting-started--container:nth-of-type(2)';
const getStartedExplore = 'div.getting-started--container:nth-of-type(3)';
const tutorialsList = '//ul[contains(@class, \'tutorials\')]';
const dashboardsList = '//div[contains(@class,\'cf-col-sm-4 cf-col-md-3\')]//div[@data-testid=\'panel\'][2]//ul';
const usefulLinkList = '//div[contains(@class,\'cf-col-sm-4 cf-col-md-3\')]//div[@data-testid=\'panel\'][3]//ul';


// TODO - add selectors - especially for isLoaded below

class homePage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: logoutButton},
            {type: 'css', selector: getStartedDataCollect},
            {type: 'css', selector: getStartedDashboard},
            {type: 'css', selector: getStartedExplore},
            {type: 'xpath', selector: tutorialsList},
            {type: 'xpath', selector: usefulLinkList},
        ]);
    }

    async getLogoutButton(){
        return await this.driver.findElement(By.css(logoutButton));
    }

    async getGetStartedDataCollect(){
        return await this.driver.findElement(By.css(getStartedDataCollect));
    }

    async getGetStartedDashboard(){
        return await this.driver.findElement(By.css(getStartedDashboard));
    }

    async getGetStartedExplore(){
        return await this.driver.findElement(By.css(getStartedExplore));
    }

    async getTutorialsList(){
        return await this.driver.findElement(By.xpath(tutorialsList));
    }

    async getUsefulLinksList(){
        return await this.driver.findElement(By.xpath(usefulLinkList));
    }

    async getTutorialLinkByText(text){
        return await this.driver.findElement(By.xpath(`${tutorialsList}//a[text() = '${text}']`));
    }

    async getUsefulLinkByText(text){
        return await this.driver.findElement(By.xpath(`${usefulLinkList}//a[contains(text(), '${text}')]`));
    }

    async getDashboardsList(){
        return await this.driver.findElement(By.xpath(dashboardsList));
    }
}

module.exports = homePage;
