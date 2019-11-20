const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const createDashboardDropdown = '[data-testid=add-resource-dropdown--button]';
const filterDashboards =  '[data-testid=search-widget]';
const nameSortButton = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const modifiedSortButton = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const createDashboardDropdownEmpty = '[data-testid=\'resource-list\'] [data-testid=\'add-resource-dropdown--button\']';
const createDashboardItems = '[data-testid^=add-resource-dropdown--][id]';
const dashboardCardByName = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]';
const dashboardCardExportButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@class=\'context-menu--container\'][.//*[text() = \'Export\']]';
const dashboardCardCloneButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@class=\'context-menu--container\'][.//*[text() = \'Clone\']]'
const dashboardCardDeleteButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@class=\'context-menu--container\'][.//*[text() = \'Delete\']]'
const dashboardCardName = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'dashboard-card--name\']';
const dashboardCardNameButton = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'dashboard-card--name-button\']';
const dashboardCardNameInput = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'dashboard-card--input\']';
const dashboardCardDescription = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'resource-list--editable-description\']';
const dashboardCardDescriptionEdit = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'resource-list--editable-description\']//*[@data-testid=\'icon\']'
const dashboardCardDescriptionInput = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'resource-list--editable-description\']//*[@data-testid=\'input-field\']';
const dashboardCardLabelsEmpty = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'inline-labels--empty\']';
const dashboardCardAddLabels = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'inline-labels--add\']';
const dashboardCardLabelPill = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'label--pill %LABEL%\']';
const dashboardCardLabelPillDelete = '//*[@data-testid=\'dashboard-card\'][.//span[text() = \'%NAME%\']]//*[@data-testid=\'label--pill--delete %LABEL%\']';

const addLabelsPopover = '[data-testid=\'inline-labels--popover\']';
const addLabelsPopoverLabel = '//*[@data-testid=\'inline-labels--popover\']//*[contains(@data-testid,\'label--pill\')][text()=\'%LABEL%\']';
const addLabelsPopoverFilter = '[data-testid=\'inline-labels--popover-field\']';
const addLabelsLabelPills = '[data-testid^=\'label--pill\']';
const addLabelsPopoverListItem = '[data-testid^=\'label-list--item %ITEM%\']';
const addLabelsPopoverNewItem = '[data-testid^=\'inline-labels--create-new\']';

const importPopupUploadFileRadio = '[data-testid=\'overlay--body\'] [data-testid=\'radio--button\'][title=\'Upload\']';
const importPopupPasteJSONRadio = '[data-testid=\'overlay--body\'] [data-testid=\'radio--button\'][title=\'Paste\']';
const importPopupImportJSONButton = '[data-testid=\'overlay--footer\'] [title^=\'Import JSON\']';
const importPopupDismiss = '[data-testid=\'overlay--header\'] button';
const importPopupFileInput = '[data-testid=\'overlay--body\'] [class*=\'drag-and-drop--form\'] ';
const importPopupFileInputHeader = '[data-testid=\'overlay--body\'] [class*=\'drag-and-drop--header\']';
const importPopupDragNDropFile = 'input[type=file]'; //N.B. has display:none

const urlCtx = 'dashboards';

class dashboardsPage extends influxPage {

    constructor(driver){
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: createDashboardDropdown},
            {type: 'css', selector: filterDashboards} ,
            {type: 'css', selector: nameSortButton},
            {type: 'css', selector: modifiedSortButton}
        ], urlCtx);
    }

    async getCreateDashboardDropdown(){
        return await this.driver.findElement(By.css(createDashboardDropdown));
    }

    async getFilterDashboards(){
        return await this.driver.findElement(By.css(filterDashboards));
    }

    async getNameSortButton(){
        return await this.driver.findElement(By.css(nameSortButton));
    }

    async getModifiedSortButton(){
        return await this.driver.findElement(By.css(modifiedSortButton));
    }

    async getCreateDashboardItem(item){
        return await this.driver.findElement(By.css(`[data-testid^=add-resource-dropdown--][id='${item}']`));
    }

    async getCreateDashboardDropdownEmpty(){
        return await this.driver.findElement(By.css(createDashboardDropdownEmpty));
    }

    static getCreateDashboardDropdownEmptySelector(){
        return { type: 'css', selector: createDashboardDropdownEmpty}
    }

    async getCreateDashboardItems(){
        return await this.driver.findElements(By.css(createDashboardItems));
    }

    async getDashboardCardByName(name){
        return await this.driver.findElement(By.xpath(dashboardCardByName.replace('%NAME%', name)))
    }

    static getDashboardCardSelectorByName(name){
        return {  type: 'xpath', selector: dashboardCardByName.replace('%NAME%', name) }
    }

    async getDashboardCardExportButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardExportButton.replace('%NAME%', name)));
    }

    static getDashboardCardExportButtonSelector(name){
        return { type: 'xpath', selector: dashboardCardExportButton.replace('%NAME%', name)};
    }

    async getDashboardCardCloneButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardCloneButton.replace('%NAME%', name)));
    }

    static getDashboardCardCloneButtonSelector(name){
        return { type: 'xpath', selector: dashboardCardCloneButton.replace('%NAME%', name)};
    }


    async getDashboardCardDeleteButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardDeleteButton.replace('%NAME%', name)));
    }

    static getDashboardCardDeleteButtonSelector(name){
        return { type: 'xpath', selector: dashboardCardDeleteButton.replace('%NAME%', name)};
    }

    async getDashboardCardName(name){
        return await this.driver.findElement(By.xpath(dashboardCardName.replace('%NAME%', name)));
    }

    async getDashboardCardNameButton(name){
        return await this.driver.findElement(By.xpath(dashboardCardNameButton.replace('%NAME%', name)));
    }

    async getDashboardCardNameInput(name){
        return await this.driver.findElement(By.xpath(dashboardCardNameInput.replace('%NAME%', name)));
    }

    async getDashboardCardDescription(name){
        return await this.driver.findElement(By.xpath(dashboardCardDescription.replace('%NAME%', name)));
    }

    async getDashboardCardDescriptionEdit(name){
        return await this.driver.findElement(By.xpath(dashboardCardDescriptionEdit.replace('%NAME%', name)));
    }

    async getDashboardCardDescriptionInput(name){
        return await this.driver.findElement(By.xpath(dashboardCardDescriptionInput.replace('%NAME%', name)));
    }

    async getDashboardCardLabelsEmpty(name){
        return await this.driver.findElement(By.xpath(dashboardCardLabelsEmpty.replace('%NAME%', name)));
    }

    async getDashboardCardAddLabels(name){
        return await this.driver.findElement(By.xpath(dashboardCardAddLabels.replace('%NAME%', name)));
    }

    async getAddLabelsPopoverLabel(label){
        return await this.driver.findElement(By.xpath(addLabelsPopoverLabel.replace('%LABEL%', label)));
    }

    static getAddLabelsPopoverLabelSelector(label){
        return { type: 'xpath', selector: addLabelsPopoverLabel.replace('%LABEL%', label)}
    }

    async getAddLabelsPopoverFilter(){
        return await this.driver.findElement(By.css(addLabelsPopoverFilter));
    }

    async getAddLabelsLabelPills(){
        return await this.driver.findElements(By.css(addLabelsLabelPills));
    }

    async getAddLabelsPopoverListItem(item){
        return await this.driver.findElement(By.css(addLabelsPopoverListItem.replace('%ITEM%', item)));
    }

    async getAddLabelsPopoverNewItem(){
        return await this.driver.findElement(By.css(addLabelsPopoverNewItem));
    }

    static getAddLabelsPopoverNewItemSelector(){
        return { type: 'css', selector: addLabelsPopoverNewItem }
    }

    async getDashboardCardLabelPill(name, label){
        return await this.driver.findElement(By.xpath(dashboardCardLabelPill
            .replace('%NAME%', name).replace('%LABEL%', label)));
    }

    static getDashboardCardLabelPillSelector(name, label){
        return { type: 'xpath', selector: dashboardCardLabelPill
                .replace('%NAME%', name).replace('%LABEL%', label) }
    }

    async getAddLabelsPopover(){
        return await this.driver.findElement(By.css(addLabelsPopover));
    }

    static getAddLabelsPopoverSelector(){
        return { type: 'css', selector: addLabelsPopover};
    }

    async getDashboardCardLabelPillDelete(name, label){
        return await this.driver.findElement(By.xpath(dashboardCardLabelPillDelete
            .replace("%NAME%", name).replace('%LABEL%', label)));
    }

    async getImportPopupUploadFileRadio(){
        return await this.driver.findElement(By.css(importPopupUploadFileRadio));
    }

    async getImportPopupPasteJSONRadio(){
        return await this.driver.findElement(By.css(importPopupPasteJSONRadio));
    }

    async getImportPopupImportJSONButton(){
        return await this.driver.findElement(By.css(importPopupImportJSONButton));
    }

    async getImportPopupDismiss(){
        return await this.driver.findElement(By.css(importPopupDismiss));
    }

    async getImportPopupFileInput(){
        return await this.driver.findElement(By.css(importPopupFileInput));
    }

    async getImportPopupFileInputHeader(){
       return await this.driver.findElement(By.css(importPopupFileInputHeader));
    }

    async getImportPopupDragNDropFile(){
        return await this.driver.findElement(By.css(importPopupDragNDropFile));
    }

}

module.exports = dashboardsPage;
