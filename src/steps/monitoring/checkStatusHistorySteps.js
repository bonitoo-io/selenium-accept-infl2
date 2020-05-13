const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const checkStatusHistoryPage = require(__srcdir + '/pages/monitoring/checkStatusHistoryPage.js');
const expect = require('chai').expect;

class checkStatusHistorySteps extends influxSteps {

    constructor(driver) {
        super(driver);
        this.ckHistPage = new checkStatusHistoryPage(__wdriver);
    }

    async isLoaded() {
        await this.ckHistPage.isLoaded();
    }

    async verifyIsLoaded() {
        await this.assertVisible(await this.ckHistPage.getAlertHistoryTitle());
        await this.assertVisible(await this.ckHistPage.getFilterInput());
        await this.assertVisible(await this.ckHistPage.getCanvasGraphAxes());
        await this.assertVisible(await this.ckHistPage.getCanvasGraphContent());
        await this.assertVisible(await this.ckHistPage.getEventTable());
    }

    async verifyMinimumEvents(count){
        await this.ckHistPage.getEventRows().then(async rows => {
            expect(rows.length).to.be.at.least(parseInt(count));
        }).catch(async e => {
            console.warn('Caught error looking for events ' + JSON.stringify(e));
            throw e;
        });
    }

    async verifyEventName(index, name){
        await this.verifyElementContainsText(await this.ckHistPage.getEventRowCheckNameField(index), name)
    }

    async clickEventName(index){
        await this.clickAndWait(await this.ckHistPage.getEventRowCheckNameField(index), async () => {
            await this.driver.sleep(500); //can be slow to load?
        });
    }

    async verifyMinimumCountEventsAtLevel(count, level){
        await this.ckHistPage.getEventRowsAtLevel(level.trim()).then(async rows => {
           expect(rows.length).to.be.at.least(parseInt(count));
        }).catch(async e => {
            console.warn(`Caught error looking for events at level ${level} ${JSON.stringify(e)}`);
            throw e;
        })
    }

    async clickEventFilterInput(){
        await this.clickAndWait(await this.ckHistPage.getFilterInput());
    }

    async verifyFilterExamplesDropdownVisible(){
        await this.assertVisible(await this.ckHistPage.getEventFilterExamplesDropdown());
    }

    async verifyFilterExamplesDropdownNotVisible(){
        await this.assertNotPresent(await checkStatusHistoryPage.getEventFilterExamplesDropdownSelector());
    }

    async clickAlertHistoryTitle(){
        await this.clickAndWait(await this.ckHistPage.getAlertHistoryTitle());
    }

    async zoomInOnEventMarkers(){
        await this.ckHistPage.getEventMarkers().then(async markers => {
            let first = await this.ckHistPage.getEventMarkerByIndex(1);
            let last = await this.ckHistPage.getEventMarkerByIndex(markers.length);
            console.log("DEBUG first " + JSON.stringify(await first.getRect()));
            console.log("DEBUG last " + JSON.stringify(await last.getRect()));
            await this.driver.executeScript('arguments[0].style.border=\'3px solid red\'', first);
            await this.driver.executeScript('arguments[0].style.border=\'3px solid red\'', last);
            await this.ckHistPage.getCanvasGraphContent().then(async canvas => {
                console.log("DEBUG canvas " + JSON.stringify(await canvas.getRect()));
                let action = await this.driver.actions();
                let rect = await canvas.getRect();
                let x = parseInt(rect.x);
                let y = parseInt(rect.y);
                //let targetX = parseInt(((rect.width/denom) * numer) + x);
                let targetY = parseInt((rect.height / 2) + y);
                let targetX1 = (await first.getRect()).x - 2;

                console.log("DEBUG targetX1 " + targetX1 + ' type: ' + typeof(targetX1));
                await action.move({x: parseInt(targetX1), y: targetY, duration: 500})
                    .perform();

                let action2 = await this.driver.actions();
                let targetX2 = (await last.getRect()).x + 2;

                await action2.press()
                    .move({x: parseInt(targetX2), y: targetY, duration: 500})
                    .release()
                    .perform();

                await this.driver.sleep(200); // todo better wait - let graph update
            })
        })
    }
}

module.exports = checkStatusHistorySteps;
