const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const alertHistoryTitle = '[data-testid=alert-history-title]';
const filterInput = '//*[./*[@data-testid=\'input-field--default\']]//*[@data-testid=\'input-field\']';
const eventRows = '.event-row';
const eventRowCheckNameField = '//*[./*[@class=\'event-row\']][%INDEX%]//a';
const eventRowsAtLevel = '//*[./*[@class=\'event-row\']]//*[contains(@class,\'level-table-field--%LEVEL%\')]';
const eventMarkersDiv = '[data-testid=event-markers]';
const eventFilterExamplesDropdown = '[data-testid=dropdown-menu]';
const eventMarkerByIndex = '[data-testid=event-markers] > div:nth-of-type(%INDEX%)';
const eventMarkers  = '[data-testid=event-markers] > *';
const eventMarkersByType = '[data-testid=event-markers] > [class*=\'event-marker--line__%TYPE%\'';
const eventMarkerToggleByType = '[data-testid=event-marker-vis-toggle-%TYPE%] > *';

const canvasGraphAxes = 'canvas.giraffe-axes';
const canvasGraphContent = 'canvas.giraffe-layer-line';

const eventTable = '.event-table';

const urlCtx = 'checks';

class checkStatusHistoryPage extends influxPage {

    constructor(driver) {
        super(driver);
    }

    async isLoaded() {
        await super.isLoaded([{type: 'css', selector: alertHistoryTitle },
            {type: 'xpath', selector: filterInput },
            {type: 'css', selector: canvasGraphAxes },
            {type: 'css', selector: canvasGraphContent },
            {type: 'css', selector: eventTable}
        ], urlCtx);
    }


    async getAlertHistoryTitle(){
        return await this.driver.findElement(By.css(alertHistoryTitle));
    }

    async getFilterInput(){
        return await this.driver.findElement(By.xpath(filterInput));
    }

    async getEventRows(){
        return await this.driver.findElements(By.css(eventRows));
    }

    async getEventRowCheckNameField(index){
        return await this.driver.findElement(By.xpath(eventRowCheckNameField.replace('%INDEX%', index)));
    }

    async getCanvasGraphAxes(){
        return await this.driver.findElement(By.css(canvasGraphAxes));
    }

    async getCanvasGraphContent(){
        return await this.driver.findElement(By.css(canvasGraphContent));
    }

    async getEventTable(){
        return await this.driver.findElement(By.css(eventTable));
    }

    async getEventRowsAtLevel(level){
        return await this.driver.findElements(By.xpath(eventRowsAtLevel.replace('%LEVEL%', level)))
    }

    async getEventMarkersDiv(){
        return await this.driver.findElement(By.css(eventMarkersDiv));
    }

    async getEventFilterExamplesDropdown(){
        return await this.driver.findElement(By.css(eventFilterExamplesDropdown));
    }

    static getEventFilterExamplesDropdownSelector(){
        return { type: 'css', selector: eventFilterExamplesDropdown};
    }

    async getEventMarkerByIndex(index){
        return await this.driver.findElement(By.css(eventMarkerByIndex.replace('%INDEX%', index)));
    }

    async getEventMarkers(){
        return await this.driver.findElements(By.css(eventMarkers));
    }

    async getEventMarkersByType(){
        return await this.driver.findElement(By.css(eventMarkersByType.replace('%TYPE%', type.toLowerCase())));
    }

    async getEventMarkerToggleByType(type){
        return await this.driver.findElement(By.css(eventMarkerToggleByType.replace('%TYPE%', type.toLowerCase())));
    }

}

module.exports = checkStatusHistoryPage;

