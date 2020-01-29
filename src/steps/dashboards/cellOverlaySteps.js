const expect = require('chai').expect;
const assert = require('chai').assert;
const Key = require('selenium-webdriver').Key;
const { By } = require('selenium-webdriver');

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
        await this.clickAndWait(await this.cellOverlay.getTMTimeRangeDropdown());
    }

    async selectCellEditTimeRangeItem(item){
        let itemToken = await item.replace(/\s/g,'').toLowerCase();
        await this.cellOverlay.getTMTimeRangeDropdownItem(itemToken).then(async elem => {
            await this.scrollElementIntoView(elem).then(async () => {
                await this.clickAndWait(await this.cellOverlay
                    .getTMTimeRangeDropdownItem(itemToken));
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

    async verifyCellEditSubmitDisabled(){
        await this.verifyElementDisabled(await this.cellOverlay.getTimemachineSubmit());
    }

    async verifyCellEditSubmitEnabled(){
        await this.verifyElementEnabled(await this.cellOverlay.getTimemachineSubmit());
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

    async clickTMAutorefreshDropdown(){
        await this.clickAndWait(await this.cellOverlay.getTMAutorefreshDropdown());
    }

    async verifyAutorefreshListContents(itemList){
        let list = itemList.split(',');
        for(let i = 0; i < list.length; i++){
            await this.assertVisible(await this.cellOverlay.getTMAutorefreshItem(list[i]));
        }
    }

    async clickTMAutorefreshItem(item){
        await this.clickAndWait(await this.cellOverlay.getTMAutorefreshItem(item));
    }

    async verifyTMAutorefreshForceButtonNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getTMAutorefreshForceButtonSelector());
    }

    async verifyTMAutorefreshForceButtonVisible(){
        await this.assertVisible(await this.cellOverlay.getTMAutorefreshForceButton());
    }

    async verifyTMTimeRangeDropdownList(itemList){
        let list = itemList.split(',');
        for(let i = 0; i < list.length; i++){
            let elem = await this.cellOverlay
                .getTMTimeRangeDropdownItem(list[i]
                    .replace(/\s/g,'')
                    .toLowerCase());
            await this.scrollElementIntoView(elem);
            await this.assertVisible(elem);
        }
    }

    async verifyTMTimeRangeDropdownListNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getTMTimeRangeDropdownContentsSelector());
    }

    async verifyTMQueryBuilderVisible(){
        await this.assertVisible(await this.cellOverlay.getTMQueryBuilder());
    }

    async verifyTMQueryBuilderSwitchWarnNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getTMSwitchToQBuilderWarnSelector())
    }

    async verifyTMFluxEditorVisible(){
        await this.assertVisible(await this.cellOverlay.getTMFluxEditor());
    }

    async clickTMSwitch2QBuilder(){
        await this.clickAndWait(await this.cellOverlay.getTMSwitchToQueryBuilder());
    }

    async clickTMSwitch2QBuilderConfirm(){
        await this.clickAndWait(await this.cellOverlay.getTMSwitchToQBuilderConfirm());
    }

    async clickTMFluxEditor(){
        await this.clickAndWait(await this.cellOverlay.getTMFluxEditor());
    }

    async verifyTMFluxEditorNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getTMFluxEditorSelector());
    }

    async verifyTMBucketListContents(bucketList){
        let list = bucketList.split(',')
        for(let i = 0; i < list.length; i++){
            await this.assertVisible(await this.cellOverlay.getTMBucketSelectorBucket(list[i].trim()));
        }
    }

    async verifyBucketNotInTMBucketList(bucket){
        await this.assertNotPresent(cellEditOverlay.getTMBucketSelectorBucketSelector(bucket));
    }

    async filterBucketListContents(value){
        await this.clearInputText(await this.cellOverlay.getTMBucketSelectorFilter());
        await this.typeTextAndWait(await this.cellOverlay.getTMBucketSelectorFilter(), value);
    }

    async clearBucketSelectorFilter(){
        await this.clearInputText(await this.cellOverlay.getTMBucketSelectorFilter());
    }

    async verifyTMBuilderCardsSize(count){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await expect(cards.length).to.equal(parseInt(count));
    }

    async verifyItemsInBuilderCard(index,items){
        let cards = await this.cellOverlay.getTMBuilderCards();
        let list = items.split(',');
        for(let i = 0; i < list.length; i++){
            await this.assertVisible(await cards[parseInt(index) - 1]
                .findElement(By.css(`[data-testid='selector-list ${list[i].trim()}']`)))
        }
    }

    async verifySelectorCountInBuilderCard(index,value){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await cards[parseInt(index) - 1]
            .findElement(By.css('.tag-selector--count'))
            .then(async elem => {
                await this.verifyElementContainsText(elem, value);
            })
    }

    async verifyItemNotInBuilderCard(index,item){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await cards[parseInt(index) - 1]
            .findElements(By.css(`[data-testid='selector-list ${item.trim()}']`))
            .then(async elems => {
                expect(await elems.length).to.equal(0);
            })
    }

    async clickTagSelectorOfBuilderCard(index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await this.clickAndWait(await cards[parseInt(index) - 1]
            .findElement(By.css('[data-testid=tag-selector--dropdown-button]')));
    }

    async verifyItemsInBuilderCardTagSelector(index,items){
        let cards = await this.cellOverlay.getTMBuilderCards();
        let list = items.split(',');
        for(let i = 0; i < list.length; i++){
            await this.assertVisible(await cards[parseInt(index) - 1]
                .findElement(By.css(`[data-testid='searchable-dropdown--item ${list[i].trim()}']`)))
        }
    }

    async clickTagSelectorDropdownItemInBuilderCard(item,index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await this.clickAndWait(await cards[parseInt(index) - 1]
            .findElement(By.css(`[data-testid='searchable-dropdown--item ${item.trim()}']`)));
    }

    async clickTagInBuilderCard(tag, cardIndex){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await this.clickAndWait(await cards[parseInt(cardIndex) - 1]
            .findElement(By.css(`[data-testid='selector-list ${tag}']`)));
    }

    async clickBuilderCardDelete(index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await this.clickAndWait(await cards[parseInt(index) - 1]
            .findElement(By.css('.builder-card--delete')));
    }

    async filterBuilderCardListContents(index,term){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await this.typeTextAndWait(await cards[parseInt(index) - 1]
            .findElement(By.css('[data-testid=\'input-field\']')), term,
            async () => { await this.driver.sleep(2000) }); //can be slow to update
        //this.driver.sleep(2000); //DEBUG
    }

    async clearTagsFilterInBuilderCard(index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await this.clearInputText(await cards[parseInt(index) - 1]
            .findElement(By.css('[data-testid=\'input-field\']')));
    }

    async verifyBuilderCardEmpty(index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await this.assertVisible(await cards[parseInt(index) - 1]
            .findElement(By.css('[data-testid=\'builder-card--empty\']')));
    }

    async verifyBuilderCardTagSelectNotPresent(index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await cards[parseInt(index) - 1]
            .findElements(By.css('[data-testid=tag-selector--dropdown-menu--contents]'))
            .then(async elems => {
                expect(await elems.length).to.equal(0);
            })
    }

    async verifyBuilderCardSelectCountNotPresent(index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await cards[parseInt(index) - 1]
            .findElements(By.css('.tag-selector--count'))
            .then(async elems => {
                expect(await elems.length).to.equal(0);
            })
    }

    async verifyBuilderCardDeleteNotPresent(index){
        let cards = await this.cellOverlay.getTMBuilderCards();
        await cards[parseInt(index) - 1]
            .findElements(By.css('.builder-card--delete'))
            .then(async elems => {
                expect(await elems.length).to.equal(0);
            })
    }

    async verifyTMQueryBuilderFunctionDuration(duration){
        await this.verifyInputEqualsValue(await this.cellOverlay.getTMBuilderCardMenuDurationInput(), duration);
    }

    async clickTMQueryBuilderFunctionDuration(){
        await this.clickAndWait(await this.cellOverlay.getTMBuilderCardMenuDurationInput())
    }

    async verifyTMQBFunctionDurationSuggestionCount(count){
        await this.cellOverlay.getTMQBDurationSuggestions().then(async elems => {
           expect(await elems.length).to.equal(parseInt(count));
        });
    }

    async verifyTMQBFunctionDurationSuggestionItems(items){
        let list = items.split(',');
        for (let i = 0; i < list.length; i++){
            let elem = await this.cellOverlay.getTMQBDurationSuggestionByName(list[i].trim());
            await this.scrollElementIntoView(elem);
            await this.assertVisible(elem);
        }
    }

    async clickTMQBFunctionDurationSuggestionItem(item){
        let elem = await this.cellOverlay.getTMQBDurationSuggestionByName(item.trim());
        await this.scrollElementIntoView(elem);
        await this.clickAndWait(elem);
    }

    async verifyTMQueryBuilderFunctionListItems(items){
        let list = items.split(',');
        for(let i = 0; i < list.length; i++){
            let elem = await this.cellOverlay.getTMBuilderCardMenuFunctionListItem(list[i].trim())
            await this.scrollElementIntoView(elem);
            await this.assertVisible(elem);
        }

    }

    async filterQueryBuilderFunctionList(term){
        await this.typeTextAndWait(await this.cellOverlay.getTMBuilderCardMenuFunctionFilter(), term)
    }

    async clearQueryBuilderFunctionListFilter(){
        await this.clearInputText(await this.cellOverlay.getTMBuilderCardMenuFunctionFilter())
    }

    async verifyQuerBuilderFunctionListItemCount(count){
        await this.cellOverlay.getTMBuilderCardMenuFunctionListItems().then(async elems => {
           await expect(await elems.length).to.equal(parseInt(count));
        });
    }

}

module.exports = cellOverlaySteps;
