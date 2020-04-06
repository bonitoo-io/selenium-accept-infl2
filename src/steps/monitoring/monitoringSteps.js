const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const alertsPage = require(__srcdir + '/pages/monitoring/alertsPage.js');

class monitoringSteps extends influxSteps{

    constructor(driver){
        super(driver);
        this.alPage = new alertsPage(__wdriver);
    }

    async isLoaded(){
        await this.alPage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.alPage.getCreateCheckButton());
        this.assertVisible(await this.alPage.getCreateEndpointButton());
        this.assertVisible(await this.alPage.getCreateRuleButton());
    }

    async verifyNotifyRulesCreateDropdownDiabled(){
        await this.verifyElementDisabled(await this.alPage.getCreateRuleButton());
    }

    async clickAlertingTab(tabName){
        await this.clickAndWait(await this.alPage.getAlertingTab(tabName));
    }

    async clickCreateCheckButton(){
        await this.clickAndWait(await this.alPage.getCreateCheckButton());
    }

    async verifyCreateCheckDropdownItems(items){
        let itemList = items.split(',');
        for(let i = 0; i < itemList.length; i++){
            await this.assertVisible(await this.alPage.getCreateCheckDropdownItem(itemList[i].trim()));
        }
    }

    async verifyCreateCheckDropdownNotVisible(){
        await this.assertNotPresent(alertsPage.getCreateCheckDropdownSelector());
    }

    async hoverCreateCheckQMark(){
        await this.hoverOver(await this.alPage.getChecksQuestionMark());
    }

    async verifyCreateCheckTooltipVisible(){
        await this.assertVisible(await this.alPage.getChecksTooltipContents());
    }

    async verifyCreateCheckTooltipNotVisible(){
        await this.assertNotPresent(alertsPage.getChecksTooltipContentsSelector());
    }

    async hoverPageTitle(){
        await this.hoverOver(await this.alPage.getPageTitle());
    }

    async hoverCreateEndpointQMark(){
        await this.hoverOver(await this.alPage.getEndpointsQuestionMark());
    }

    async verifyCreateEndpointTooltipVisible(){
        await this.assertVisible(await this.alPage.getEndpointsTooltipContents());
    }

    async verifyCreateEndpointTooltipNotVisible(){
        await this.assertNotPresent(alertsPage.getEndpointsTooltipContentsSelector());
    }

    async hoverCreateRuleQMark(){
        await this.hoverOver(await this.alPage.getRulesQuestionMark());
    }

    async verifyCreateRuleTooltipVisible(){
        await this.assertVisible(await this.alPage.getRulesTooltipContents());
    }

    async verifyCreateRuleTooltipNotVisible(){
        await this.assertNotPresent(alertsPage.getRulesTooltipContentsSelector());
    }

    async clickCreateEndpointButton(){
        await this.clickAndWait(await this.alPage.getCreateEndpointButton());
    }

    async verifyCreateEndpointPopupLoaded(){
        await this.verifyElementText(await this.alPage.getPopupTitle(),'Create a Notification Endpoint');
        await this.assertVisible(await this.alPage.getEpPopupEndpointDropdownButton());
        await this.assertVisible(await this.alPage.getEpPopupEndpointNameInput());
        await this.assertVisible(await this.alPage.getEpPopupEndpointDescriptionText());
        await this.assertVisible(await this.alPage.getEpPopupCancelButton());
        await this.assertVisible(await this.alPage.getEpPopupSaveButton());
    }

    async clickFirstTimeCreateThresholdCheck(){
        await this.clickAndWait(await this.alPage.getFirstTimeThresholdCheckCreateButton());
    }

    async clickFirstTimeCreateDeadmanCheck(){
        await this.scrollElementIntoView(await this.alPage.getFirstTimeDeadmanCheckCreateButton());
        await this.clickAndWait(await this.alPage.getFirstTimeDeadmanCheckCreateButton());
    }

}

module.exports = monitoringSteps;
