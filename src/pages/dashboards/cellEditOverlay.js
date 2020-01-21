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
const TMViewEmptyGraph = '[data-testid=overlay] [data-testid=empty-graph--no-queries]';
const resizerHandle = '[data-testid=overlay] [data-testid^=draggable-resizer--handle] ';
const viewRawDataToggle = '[data-testid=overlay] .view-raw-data-toggle';
const TMAutorefreshDropdown = '[data-testid=overlay] [data-testid=time-machine--bottom] .autorefresh-dropdown [data-testid=dropdown--button]';
const TMAutorefreshItem = '//*[@data-testid=\'dropdown-item\'][./*[text()=\'%ITEM%\']]';
const TMAutorefreshForceButton = '[class=time-machine] [class^=autorefresh-dropdown] [data-testid=square-button]';
const TMTimeRangeDropdown = '[data-testid=overlay] [data-testid=time-machine--bottom] [data-testid=timerange-dropdown]';
const TMTimeRangeDropdownItem = '[data-testid=dropdown-item-%ITEM%]';
const TMTimeRangeDropdownContents = '[data-testid=dropdown-menu--contents]';
const switchToScriptEditor = '[data-testid=overlay] [data-testid=time-machine--bottom] [data-testid=switch-to-script-editor] ';
const timemachineSubmit = '[data-testid=time-machine-submit-button] ';
const queryBuilder = '[data-testid=query-builder]';
const functionSelect = '[data-testid=function-selector]';
const bucketSelect = '[data-testid=bucket-selector]';
const bucketSelectItem = '[data-testid=bucket-selector] [data-testid=\'selector-list %ITEM%\'] ';
const bucketSelectSearch = '[data-testid=bucket-selector] [data-testid=builder-card--menu] [class *= search]';
const scriptEditorCodeMirror = '.CodeMirror';
//const scriptMonacoEditor = '.monaco-editor';
const scriptMonacoEditor = '.inputarea';
const graphCanvas = 'canvas[data-testid^=giraffe-layer]';
const graphCanvasAxes = 'canvas[data-testid=giraffe-axes]';
const viewOptionsContainer = '.view-options';

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
            {type: 'css', selector: resizerHandle},
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

    async getTMViewEmptyGraph(){
        return await this.driver.findElement(By.css(TMViewEmptyGraph));
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

}

module.exports = cellEditOverlay;
