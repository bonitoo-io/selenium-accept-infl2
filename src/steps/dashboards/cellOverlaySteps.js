const expect = require('chai').expect;
const assert = require('chai').assert;
const Key = require('selenium-webdriver').Key;

const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const cellEditOverlay = require(__srcdir + '/pages/dashboards/cellEditOverlay.js');

class cellOverlaySteps extends influxSteps {

    constructor(driver) {
        super(driver);
        this.cellOverlay = new cellEditOverlay(driver);
    }

    async verifyCellOverlayIsLoaded(title){
        await this.cellOverlay.isLoaded();
        await this.verifyElementContainsText(await this.cellOverlay.getCellTitle(), title);
    }

    async nameDashboardCell(name){
        await this.cellOverlay.getCellTitle().then(async elem => {
            await elem.click().then(async () => {
                await this.cellOverlay.getCellNameInput().then(async input =>{
                    await this.clearInputText(input).then(async () => {
                        await this.typeTextAndWait(input, name + Key.ENTER);
                    })
                })
            })
        })
    }

    async clickDashboardCellEditCancel(){
        await this.clickAndWait(await this.cellOverlay.getEditCancel());
    }

    async clickDashboardCellSave(){
        await this.clickAndWait(await this.cellOverlay.getSaveCell());
    }

    async clickCellEditTimeRangeDropdown(){
        await this.clickAndWait(await this.cellOverlay.getTimeRangeDropdown());
    }

    async selectCellEditTimeRangeItem(item){
        await this.cellOverlay.getTimeRangeDropdownItem(item).then(async elem => {
            await this.scrollElementIntoView(elem).then(async () => {
                await this.clickAndWait(await this.cellOverlay.getTimeRangeDropdownItem(item));
            })
        })
    }

    async clickCellEditScriptEditorButton(){
        await this.clickAndWait(await this.cellOverlay.getSwitchToScriptEditor());
    }

    async pasteIntoCellEditScriptEditor(text){
        let escapedTxt = text.replace(/\"/g, "\\\"");
        //await this.setCodeMirrorText(await this.cellOverlay.getScriptEditorCodeMirror(), escapedTxt);
        //await this.setMonacoEditorText(await this.cellOverlay.getScriptMonacoEditor(), escapedTxt);
        await this.setMonacoEditorText(await this.cellOverlay.getScriptMonacoEditor(), text);
    }

    async clearCellEditScriptEditor(){
//        await this.setCodeMirrorText(await this.cellOverlay.getScriptEditorCodeMirror(), "");
        await this.driver.sleep(1000);
        //await this.setMonacoEditorText(await this.cellOverlay.getScriptMonacoEditor(), "");
        await this.clearMonacoEditorText(await this.cellOverlay.getScriptMonacoEditor());
    }

    async clickCellEditSubmitButton(){
        await this.clickAndWait(await this.cellOverlay.getTimemachineSubmit(), async () => {
            await this.driver.sleep(1500); //todo better wait - sec and half to load for now
        });
    }

    async getCurrentCellEditPreviewGraph(){

        if(await this.isPresent(cellEditOverlay.getGraphCanvasSelector())) {
            await this.cellOverlay.getGraphCanvas().then(async canvas => {
                __dataBuffer.graphEditCanvas = await this.driver
                    .executeScript('return arguments[0].toDataURL(\'image/png\');', canvas);
                console.log("DEBUG __dataBuffer.graphEditCanvas " + __dataBuffer.graphEditCanvas);
                await this.cellOverlay.getGraphCanvasAxes().then(async axes => {
                    __dataBuffer.graphEditCanvasAxes = await this.driver
                        .executeScript('return arguments[0].toDataURL(\'image/png\');', axes);
                })
            });
        }else{
            __dataBuffer.graphEditCanvas = "";
        }
    }

    async verifyCellEditPreviewGraphVisible(){
        await this.assertVisible(await this.cellOverlay.getGraphCanvas());
    }

    async verifyCellEditPreviewGraphChanged(){
        if(await this.isPresent(cellEditOverlay.getGraphCanvasSelector())) {
            await this.cellOverlay.getGraphCanvas().then(async canvas => {
                let currentCanvas = await this.driver
                    .executeScript('return arguments[0].toDataURL(\'image/png\');',
                        canvas);
                //visual DEBUG Below
                //await this.writeBase64ToPNG('debug.png', currentCanvas);
                //this.writeBase64ToPNG('canvas.png', __dataBuffer.graphEditCanvas);
                expect(currentCanvas).to.not.equal(__dataBuffer.graphEditCanvas)
                //Axes may or maynot change TODO look at axes comparison
                /*await this.cellOverlay.getGraphCanvasAxes().then(async axes => {
                    let currentAxes = await this.driver
                        .executeScript('return arguments[0].toDataURL(\'image/png\').substring(21);', axes);
                    //visual DEBUG below
                    await this.writeBase64ToPNG('axes.png', currentAxes);
                })*/
            });
        }else{
            throw new Error("Cell Edit Preview Graph Not Found");
        }
    }

    async clickCellEditSaveButton(){
        await this.clickAndWait(await this.cellOverlay.getSaveCell());
    }

    async clickCellEditName(){
        await this.clickAndWait(await this.cellOverlay.getCellTitle());
    }

    async updateCellName(name){
        await this.clearInputText(await this.cellOverlay.getCellNameInput());
        await this.typeTextAndWait(await this.cellOverlay.getCellNameInput(), name);
    }

    async clickViewTypeDropdown(){
        await this.clickAndWait(await this.cellOverlay.getViewTypeDropdown());
    }

    async verifyViewTypeListContents(itemList){
        let list = itemList.split(',');
        for(let i = 0; i < list.length; i++){
            let elem = await this.cellOverlay.getViewTypeItem(list[i]);
            await this.scrollElementIntoView(elem);
            await this.assertVisible(elem);
        }
    }

    async verifyViewTypeListNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getViewTypeListContentsSelector());
    }

    async clickCellViewCustomize(){
        await this.clickAndWait(await this.cellOverlay.getCustomizeButton());
    }

    async verifyViewOptionsContainerVisible(){
        await this.assertVisible(await this.cellOverlay.getViewOptionsContainer());
    }

    async verifyCellCustomizeButtonHighlight(){
        await this.verifyElementContainsClass(await this.cellOverlay.getCustomizeButton()
            , 'button-primary')
    }

    async verifyViewOptionsContainerNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getViewOptionsContainerSelector());
    }

    async verifyCustomizeButtonNoHighlightd(){
        await this.verifyElementDoesNotContainClass(await this.cellOverlay.getCustomizeButton()
            , 'button-primary');
    }

    async verifyTMViewEmptyGraphVisible(){
        await this.assertVisible(await this.cellOverlay.getTMViewEmptyGraph());
    }
}

module.exports = cellOverlaySteps;
