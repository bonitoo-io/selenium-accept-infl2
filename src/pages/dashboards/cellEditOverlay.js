const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const timeMachineOverlay = '[data-testid=overlay]';
const cellTitle = '[data-testid=overlay] [data-testid=page-header--left] [data-testid=page-title]';
const cellNameInput = '[data-testid=overlay] [data-testid=page-header] [data-testid=input-field]';
const viewTypeDropdown = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'view-type--dropdown\']';
const viewTypeListContents = '[data-testid=\'view-type--dropdown\'] [data-testid=dropdown-menu--contents]';
const viewTypeItem = '[data-testid=\'view-type--%ITEM%\']';
const customizeButton = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'cog-cell--button\']';
const editCancel = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'cancel-cell-edit--button\']';
const saveCell = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'save-cell--button\']';
const TMTop = '.time-machine--top';
const TMBottom = '[data-testid=\'time-machine--bottom\']';
const TMViewEmptyGraphQueries = '[data-testid=overlay] [data-testid=empty-graph--no-queries]';
const TMViewNoResults = '[data-testid=overlay] [data-testid=empty-graph--no-results]';
const TMResizerHandle = '[data-testid=overlay] [data-testid=draggable-resizer--handle]';
const viewRawDataToggle = '[data-testid=overlay] .view-raw-data-toggle';
const TMAutorefreshDropdown = '[data-testid=overlay] [data-testid=time-machine--bottom] .autorefresh-dropdown [data-testid=dropdown--button]';
const TMAutorefreshItem = '//*[@data-testid=\'dropdown-item\'][./*[text()=\'%ITEM%\']]';
const TMAutorefreshForceButton = '[class=time-machine] [class^=autorefresh-dropdown] [data-testid=square-button]';
const TMTimeRangeDropdown = '[data-testid=overlay] [data-testid=time-machine--bottom] [data-testid=timerange-dropdown]';
const TMTimeRangeDropdownItem = '[data-testid=dropdown-item-%ITEM%]';
const TMTimeRangeDropdownContents = '[data-testid=dropdown-menu--contents]';
const switchToScriptEditor = '[data-testid=overlay] [data-testid=time-machine--bottom] [data-testid=switch-to-script-editor] ';
const TMSwitchToQueryBuilder = '[data-testid=switch-query-builder-confirm--button]';
const TMSwitchToQBuilderConfirm = '[data-testid=switch-query-builder-confirm--popover--contents] [data-testid=button]';
const TMSwitchToQBuilderWarn = '[data-testid=switch-query-builder-confirm--popover--contents]';
const timemachineSubmit = '[data-testid=time-machine-submit-button] ';
const TMQueryTabByName = '//*[contains(@class,\'query-tab \')][./*[@title=\'%NAME%\']]';
const TMQueryBuilder = '[data-testid=query-builder]';
const functionSelect = '[data-testid=function-selector]';
const bucketSelect = '[data-testid=bucket-selector]';
const TMBucketSelectorBucket = '[data-testid=bucket-selector] [data-testid=\'selector-list %NAME%\']';
const TMBucketSelectorFilter = '[data-testid=bucket-selector] [data-testid=\'input-field\']';
const TMBuilderCards = '[data-testid=builder-card]';
const bucketSelectItem = '[data-testid=bucket-selector] [data-testid=\'selector-list %ITEM%\'] ';
const bucketSelectSearch = '[data-testid=bucket-selector] [data-testid=builder-card--menu] [class *= search]';
const scriptEditorCodeMirror = '.CodeMirror';
//const scriptMonacoEditor = '.monaco-editor';
const scriptMonacoEditor = '.inputarea';
const TMFluxEditor = '[data-testid=flux-editor]';
const graphCanvas = '[data-testid=\'overlay\'] canvas[data-testid^=giraffe-layer]';
const graphCanvasAxes = '[data-testid=\'overlay\'] canvas[data-testid=giraffe-axes]';
const viewOptionsContainer = '.view-options';

const TMQBSelectedBucket = '[data-testid=bucket-selector] [data-testid^=\'selector-list\'][class*=selected]';
const TMQBSelectedTagOfCard = '//*[@data-testid=\'builder-card\'][.//*[@data-testid=\'tag-selector--container %INDEX%\']]//*[contains(@data-testid,\'selector-list\')][contains(@class,\'selected\')]'
const TMBuilderCardMenuDurationInput = '[data-testid=\'builder-card--menu\'] [data-testid=\'duration-input\']';
const TMBuilderCardMenuFunctionListItem = '[data-testid=\'function-selector\'] [data-testid=\'selector-list %ITEM%\']'
const TMBuilderCardMenuFunctionFilter = '[data-testid=\'input-field\'][placeholder*=\'functions\']';
const TMBuilderCardMenuFunctionListItems = '[data-testid=function-selector] [data-testid^=\'selector-list\']';
const TMQBDurationSuggestions = '[data-testid=\'builder-card--menu\'] [data-testid=\'dropdown-menu--contents\'] [data-testid=\'dropdown-item\']';
const TMQBDurationSuggestionByName = '//*[@data-testid=\'builder-card--menu\']//*[@data-testid=\'dropdown-menu--contents\']//*[@data-testid=\'dropdown-item\'][./*[text()=\'%NAME%\']]';
const TMBuilderTabsAddQuery = '[data-testid=overlay] [class=time-machine-queries--tabs] [data-testid=square-button]';


const urlCtx = 'cells';

class cellEditOverlay extends influxPage {

    constructor(driver) {
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([{type: 'css', selector: cellTitle},
            {type: 'css', selector: viewTypeDropdown},
            {type: 'css', selector: customizeButton},
            {type: 'css', selector: editCancel},
            {type: 'css', selector: saveCell},
            {type: 'css', selector: TMResizerHandle},
            {type: 'css', selector: viewRawDataToggle},
            {type: 'css', selector: TMAutorefreshDropdown},
            {type: 'css', selector: TMTimeRangeDropdown},
           // {type: 'css', selector: switchToScriptEditor},
            {type: 'css', selector: timemachineSubmit},
            //{type: 'css', selector: queryBuilder},
           // {type: 'css', selector: functionSelect},
            //{type: 'css', selector: bucketSelect}
        ], urlCtx);
    }

    static getTimeMachineOverlay(){
        return {type: 'css', selector: timeMachineOverlay};
    }

    async getTMTop(){
        return await this.driver.findElement(By.css(TMTop));
    }

    async getTMBottom(){
        return await this.driver.findElement(By.css(TMBottom));
    }

    async getCellTitle(){
        return await this.driver.findElement(By.css(cellTitle));
    }

    async getCellNameInput(){
        return await this.driver.findElement(By.css(cellNameInput));
    }

    async getBucketSelectItem(item){
        return await this.driver.findElement(By.css(bucketSelectItem.replace('%ITEM%', item)))
    }

    async getBucketSelectSearch(){
        return await this.driver.findElement(By.css(bucketSelectSearch));
    }

    static getBucketSelectSearchSelector(){
        return { type: 'css', selector: bucketSelectSearch };
    }

    async getEditCancel(){
        return await this.driver.findElement(By.css(editCancel));
    }

    async getSaveCell(){
        return await this.driver.findElement(By.css(saveCell));
    }

    async getTMTimeRangeDropdown(){
        return await this.driver.findElement(By.css(TMTimeRangeDropdown));
    }

    async getTMTimeRangeDropdownItem(item){
        //console.log("DEBUG selector " + TMTimeRangeDropdownItem.replace('%ITEM%', item));
        return await this.driver.findElement(By.css(TMTimeRangeDropdownItem.replace('%ITEM%', item)));
    }

    async getTimemachineSubmit(){
        return await this.driver.findElement(By.css(timemachineSubmit));
    }

    async getSwitchToScriptEditor(){
        return await this.driver.findElement(By.css(switchToScriptEditor));
    }

    async getScriptEditorCodeMirror(){
        return await this.driver.findElement(By.css(scriptEditorCodeMirror));
    }

    async getScriptMonacoEditor(){
        return await this.driver.findElement(By.css(scriptMonacoEditor));
    }

    async getGraphCanvas(){
        return await this.driver.findElement(By.css(graphCanvas));
    }

    static getGraphCanvasSelector(){
        return { type: 'css', selector: graphCanvas }
    }

    async getGraphCanvasAxes(){
        return await this.driver.findElement(By.css(graphCanvasAxes));
    }

    async getViewTypeDropdown(){
        return await this.driver.findElement(By.css(viewTypeDropdown));
    }

    async getViewTypeItem(item){
        return await this.driver.findElement(By.css(viewTypeItem.replace('%ITEM%', item)));
    }

    async getViewTypeListContents(){
        return await this.driver.findElement(By.css(viewTypeListContents));
    }

    static getViewTypeListContentsSelector(){
        return { type: 'css', selector: viewTypeListContents };
    }

    async getCustomizeButton(){
        return await this.driver.findElement(By.css(customizeButton));
    }

    async getViewOptionsContainer(){
        return await this.driver.findElement(By.css(viewOptionsContainer));
    }

    static getViewOptionsContainerSelector(){
        return { type: 'css', selector: viewOptionsContainer };
    }

    async getTMViewEmptyGraphQueries(){
        return await this.driver.findElement(By.css(TMViewEmptyGraphQueries));
    }

    async getTMViewNoResults(){
        return await this.driver.findElement(By.css(TMViewNoResults));
    }

    async getTMAutorefreshDropdown(){
        return await this.driver.findElement(By.css(TMAutorefreshDropdown));
    }

    async getTMAutorefreshItem(item){
        return await this.driver.findElement(By.xpath(TMAutorefreshItem.replace('%ITEM%', item)))
    }

    async getTMAutorefreshForceButton(){
        return await this.driver.findElement(By.css(TMAutorefreshForceButton));
    }

    static getTMAutorefreshForceButtonSelector(){
        return { type: 'css', selector: TMAutorefreshForceButton };
    }

    async getTMTimeRangeDropdownContents(){
        return await this.driver.findElement(By.css(TMTimeRangeDropdownContents));
    }

    static getTMTimeRangeDropdownContentsSelector(){
        return { type: 'css', selector: TMTimeRangeDropdownContents };
    }

    async getTMQueryTabByName(name){
        return await this.driver.findElement(By.xpath(TMQueryTabByName.replace('%NAME%',name)))
    }

    async getTMQueryBuilder(){
        return await this.driver.findElement(By.css(TMQueryBuilder));
    }

    async getTMFluxEditor(){
        return await this.driver.findElement(By.css(TMFluxEditor));
    }

    static getTMFluxEditorSelector(){
        return { type: 'css', selector: TMFluxEditor }
    }

    async getTMSwitchToQueryBuilder(){
        return await this.driver.findElement(By.css(TMSwitchToQueryBuilder));
    }

    async getTMSwitchToQBuilderConfirm(){
        return await this.driver.findElement(By.css(TMSwitchToQBuilderConfirm));
    }

    static getTMSwitchToQBuilderWarnSelector(){
        return { type: 'css', selector: TMSwitchToQBuilderWarn }
    }

    async getTMBucketSelectorBucket(name){
        return await this.driver.findElement(By.css(TMBucketSelectorBucket.replace('%NAME%', name)));
    }

    static getTMBucketSelectorBucketSelector(name){
        return { type: 'css', selector: TMBucketSelectorBucket.replace('%NAME%', name) }
    }

    async getTMBucketSelectorFilter(){
        return await this.driver.findElement(By.css(TMBucketSelectorFilter));
    }

    async getTMBuilderCards(){
        return await this.driver.findElements(By.css(TMBuilderCards));
    }

    async getTMBuilderCardByIndex(index){
        return (await this.driver.findElements(By.css(TMBuilderCards)))[index - 1];
    }

    async getTMBuilderCardMenuDurationInput(){
        return await this.driver.findElement(By.css(TMBuilderCardMenuDurationInput));
    }

    async getTMBuilderCardMenuFunctionListItem(item){
        return await this.driver.findElement(By.css(TMBuilderCardMenuFunctionListItem.replace('%ITEM%', item)));
    }

    static getTMBuilderCardMenuFunctionListItemSelector(item){
        return { type: 'css', selector: TMBuilderCardMenuFunctionListItem.replace('%ITEM%', item) }
    }

    async getTMBuilderCardMenuFunctionFilter(){
        return await this.driver.findElement(By.css(TMBuilderCardMenuFunctionFilter));
    }

    async getTMBuilderCardMenuFunctionListItems(){
        return await this.driver.findElements(By.css(TMBuilderCardMenuFunctionListItems));
    }

    async getTMQBDurationSuggestions(){
        return await this.driver.findElements(By.css(TMQBDurationSuggestions));
    }

    async getTMQBDurationSuggestionByName(name){
        return await this.driver.findElement(By.xpath(TMQBDurationSuggestionByName.replace('%NAME%', name)));
    }

    async getTMResizerHandle(){
        return await this.driver.findElement(By.css(TMResizerHandle));
    }

    async getTMBuilderTabsAddQuery(){
        return await this.driver.findElement(By.css(TMBuilderTabsAddQuery));
    }

    async getTMQBSelectedBucket(){
        return await this.driver.findElement(By.css(TMQBSelectedBucket));
    }

    async getTMQBSelectedTagOfCard(index){
        return await this.driver.findElement(By.xpath(TMQBSelectedTagOfCard.replace('%INDEX%', index)));
    }


}

module.exports = cellEditOverlay;