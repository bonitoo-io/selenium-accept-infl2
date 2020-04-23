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
        await this.assertVisible(await this.alPage.getAlertingTab('checks'));
        await this.assertVisible(await this.alPage.getAlertingTab('rules'));
        await this.assertVisible(await this.alPage.getAlertingTab('endpoints'));
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

    async clickCreateCheckDropdownItem(item){
        await this.clickAndWait(await this.alPage.getCreateCheckDropdownItem(item), async () => {
              await this.driver.sleep(500); //slow to load?
            });
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
        await this.clickAndWait(await this.alPage.getFirstTimeThresholdCheckCreateButton(), async () => {
            await this.driver.sleep(500); //can be slow to load - TODO better wait
        });
    }

    async verifyFirstTimeCreateThresholdCheckVisible(){
        await this.assertVisible(await this.alPage.getFirstTimeThresholdCheckCreateButton());
    }

    async clickFirstTimeCreateDeadmanCheck(){
        await this.scrollElementIntoView(await this.alPage.getFirstTimeDeadmanCheckCreateButton());
        await this.clickAndWait(await this.alPage.getFirstTimeDeadmanCheckCreateButton());
    }

    async verifyFirstTimeCreateDeadmanCheckVisible(){
        await this.assertVisible(await this.alPage.getFirstTimeDeadmanCheckCreateButton());
    }

    async verifyAlertCardName(name){
        await this.assertVisible(await this.alPage.getCheckCardName(name));
    }

    async hoverOverCheckCardName(name){
        await this.scrollElementIntoView(await this.alPage.getCheckCardName(name));
        await this.hoverOver(await this.alPage.getCheckCardName(name));
    }

    async clickCheckCardNameEditButton(name){
        await this.clickAndWait(await this.alPage.getCheckCardNameEditButton(name));
    }

    async updateCheckCardActiveNameInput(newVal){
        await this.clearInputText(await this.alPage.getCheckCardNameInput());
        await this.typeTextAndWait(await this.alPage.getCheckCardNameInput(), newVal);
    }

    async hoverOverCheckCardDescription(name){
        await this.scrollElementIntoView(await this.alPage.getCheckCardDescription(name));
        await this.hoverOver(await this.alPage.getCheckCardDescription(name));
    }

    async clickCheckCardDescriptionEditButton(name){
        await this.clickAndWait(await this.alPage.getCheckCardDescriptionEditButton(name));
    }

    async updateCheckCardActiveDescription(text){
        await this.clearInputText(await this.alPage.getCheckCardDescriptionInput());
        await this.typeTextAndWait(await this.alPage.getCheckCardDescriptionInput(), text);
    }

    async verifyCheckCardDescription(name, text){
        await this.driver.sleep(1000); //card update seems a bit slow
        await this.verifyElementContainsText(await this.alPage.getCheckCardDescription(name), text);
    }


}

module.exports = monitoringSteps;
