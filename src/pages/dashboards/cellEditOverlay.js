const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const timeMachineOverlay = '[data-testid=overlay]';
const cellTitle = '[data-testid=overlay] [data-testid=page-header--left] [data-testid=page-title]';
const cellNameInput = '[data-testid=overlay] [data-testid=page-header] [data-testid=input-field]';
const viewTypeDropdown = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'view-type--dropdown\']';
const customizeButton = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'cog-cell--button\']';
const editCancel = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'cancel-cell-edit--button\']';
const saveCell = '[data-testid=overlay] [data-testid=page-header--right] [data-testid=\'save-cell--button\']';
const emptyGraph = '[data-testid=overlay] [data-testid^=empty-graph--no-queries]';
const resizerHandle = '[data-testid=overlay] [data-testid^=draggable-resizer--handle] ';
const viewRawDataToggle = '[data-testid=overlay] .view-raw-data-toggle';
const autorefreshDropdown = '[data-testid=overlay] [data-testid=time-machine--bottom] .autorefresh-dropdown [data-testid=dropdown--button]';
const timeRangeDropdown = '[data-testid=overlay] [data-testid=time-machine--bottom] [data-testid=timerange-dropdown]';
const timeRangeDropdownItem = '[data-testid=dropdown-item-past%ITEM%]';
const switchToScriptEditor = '[data-testid=overlay] [data-testid=time-machine--bottom] [data-testid=switch-to-script-editor] ';
const timemachineSubmit = '[data-testid=time-machine-submit-button] ';
const queryBuilder = '[data-testid=query-builder]';
const functionSelect = '[data-testid=function-selector]';
const bucketSelect = '[data-testid=bucket-selector]';
const bucketSelectItem = '[data-testid=bucket-selector] [data-testid=\'selector-list %ITEM%\'] ';
const bucketSelectSearch = '[data-testid=bucket-selector] [data-testid=builder-card--menu] [class *= search]';
const scriptEditorCodeMirror = '.CodeMirror';
const graphCanvas = 'canvas[data-testid^=giraffe-layer]';
const graphCanvasAxes = 'canvas[data-testid=giraffe-axes]';

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
            {type: 'css', selector: autorefreshDropdown},
            {type: 'css', selector: timeRangeDropdown},
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

    async getTimeRangeDropdown(){
        return await this.driver.findElement(By.css(timeRangeDropdown));
    }

    async getTimeRangeDropdownItem(item){
        return await this.driver.findElement(By.css(timeRangeDropdownItem.replace('%ITEM%', item)));
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

    async getGraphCanvas(){
        return await this.driver.findElement(By.css(graphCanvas));
    }

    static getGraphCanvasSelector(){
        return { type: 'css', selector: graphCanvas }
    }

    async getGraphCanvasAxes(){
        return await this.driver.findElement(By.css(graphCanvasAxes));
    }

}

module.exports = cellEditOverlay;
