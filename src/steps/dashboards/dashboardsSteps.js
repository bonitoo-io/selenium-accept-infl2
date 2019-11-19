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

    async verifyDashboardCardNotPresent(name){
        await this.assertNotPresent(await dashboardsPage.getDashboardCardSelectorByName(name));
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

    async clearDashboardCardName(name){
        await this.clearInputText(await this.dbdsPage.getDashboardCardNameInput(name));
    }

    async renameDashboardCard(newName, oldName){
        await this.typeTextAndWait(await this.dbdsPage.getDashboardCardNameInput(oldName), newName)
    }

    async verifyDashboardCardContainsDescription(name,descr){
        await this.verifyElementContainsText(await this.dbdsPage.getDashboardCardDescription(name),
            descr);
    }

    async hoverOverDashboardCardDescription(name){
        await this.hoverOver(await this.dbdsPage.getDashboardCardDescription(name));
    }

    async clickDashboardCardEditDescriptionButton(name){
        await this.clickAndWait(await this.dbdsPage.getDashboardCardDescriptionEdit(name));
    }

    async enterDashboardCardDescription(name,descr){
        await this.typeTextAndWait(await this.dbdsPage.getDashboardCardDescriptionInput(name), descr);
    }

    async clickEmptyLabelOfDashboardCard(name){
        await this.clickAndWait(await this.dbdsPage.getDashboardCardLabelsEmpty(name));
    }

    async clickAddLabelOfDashboardCard(name){
        await this.clickAndWait(await this.dbdsPage.getDashboardCardAddLabels(name));
    }

    async verifyLabelInDashboardsPopoverIsVisible(label){
        await this.assertVisible(await this.dbdsPage.getAddLabelsPopoverLabel(label));
    }

    async verifyLabelInDashboardsPopoverIsNotPresent(label){
        await this.assertNotPresent(await dashboardsPage.getAddLabelsPopoverLabelSelector(label));
    }

    async enterDashboardLabelsFilter(text){
        await this.typeTextAndWait(await this.dbdsPage.getAddLabelsPopoverFilter(), text);
    }

    async verifyDasboardAddLabelsPillCount(count){
        await this.dbdsPage.getAddLabelsLabelPills().then(async pills => {
           expect(pills.length).to.equal(parseInt(count));
        });
    }

    async clearDashboardLabelsFilter(){
        await this.clearInputText(await this.dbdsPage.getAddLabelsPopoverFilter());
    }

    async verifyLabelPopoverCreateNewNotPresent(){
        await this.assertNotPresent(await dashboardsPage.getAddLabelsPopoverNewItemSelector());
    }

    async verifyLabelPopoverCreateNewIsVisible(){
        await this.assertVisible(await this.dbdsPage.getAddLabelsPopoverNewItem());
    }

    async clickLabelPopoverCreateNewLabel(){
        await this.clickAndWait(await this.dbdsPage.getAddLabelsPopoverNewItem());
    }

    async verifyDashboardCardHasLabel(name, label){
        await this.assertVisible(await this.dbdsPage.getDashboardCardLabelPill(name, label));
    }

    async verifyAddLabelsPopopverNotPresent(){
        await this.assertNotPresent(await dashboardsPage.getAddLabelsPopoverSelector());
    }

    async clickDasboardCardAddLabel(name){
        await this.clickAndWait(await this.dbdsPage.getDashboardCardAddLabels(name));
    }

    async hoverDashboardCardLabel(name, label){
        await this.hoverOver(await this.dbdsPage.getDashboardCardLabelPill(name, label))
    }

    async clickDashboardCardRemoveLabel(name,label){
        await this.clickAndWait(await this.dbdsPage.getDashboardCardLabelPillDelete(name, label));
    }

    async verifyDashboardCardLabelsEmptyVisible(name){
        await this.assertVisible(await this.dbdsPage.getDashboardCardLabelsEmpty(name));
    }

    async verifyDashboardCardLabelNotPresent(name, label){
        await this.assertNotPresent(await dashboardsPage.getDashboardCardLabelPillSelector(name, label));
    }

    async verifyDashboardCardsVisible(cards){
        let cardsArr = cards.split(',');
        cardsArr.forEach(async cardName => {
            await this.assertVisible(await this.dbdsPage.getDashboardCardByName(cardName));
        } )
    }

    async verifyDashboardCardsNotPresent(cards){
        let cardsArr = cards.split(',');
        for(let i = 0; i < cardsArr.length; i++){
            await this.assertNotPresent(await dashboardsPage.getDashboardCardSelectorByName(cardsArr[i].trim()));
        }
    }

    async enterDashboardsCardFilter(term){
        await this.typeTextAndWait(await this.dbdsPage.getFilterDashboards(), term);
    }

    async clearDashboardsCardFilter(){
        await this.clearInputText(await this.dbdsPage.getFilterDashboards());
    }

}

module.exports = dashboardsSteps;

