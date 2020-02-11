const fs = require('fs')
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

    async verifyCellEditPreviewAxesVisible(){
        await this.assertVisible(await this.cellOverlay.getGraphCanvasAxes());
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

    async verifyTMViewEmptyQueriesGraphVisible(){
        await this.assertVisible(await this.cellOverlay.getTMViewEmptyGraphQueries());
    }

    async verifyTMViewNoResultsVisible(){
        await this.assertVisible(await this.cellOverlay.getTMViewNoResults());
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

    async verifyTMQueryBuilderSwitchWarnVisible(){
        await this.assertVisible(await this.cellOverlay.getTMSwitchToQBuilderWarn());
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

    async clickTMBucketSelectorItem(item){
        await this.clickAndWait(await this.cellOverlay.getTMBucketSelectorBucket(item.trim()),
            async () => { await this.driver.sleep(1000) }) //slow to load sometimes?
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

    async verifyEmptyTagsInBuilderCard(index){
        await this.cellOverlay.getTMBuilderCardByIndex(index).then(async elem => {
            await this.assertVisible(await elem.findElement(By.css('[data-testid=\'empty-tag-keys\']')));
        });
    }

    async verifyNoSelectedTagsInBuilderCard(index){
        await this.cellOverlay.getTMBuilderCardByIndex(index).then(async elem => {
            await elem.findElements(By.css('[data-testid^=selector-list][class*=selected]'))
                .then(async items => {
                    await expect(await items.length).to.equal(0);
                });
        });
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

    async closeAllTMQBCards(){
        let cards = await this.cellOverlay.getTMBuilderCards();
        for(let i = cards.length - 1; i > 0; i--){ //close all but last card
            await this.clickAndWait(await cards[i].findElement(By.css('.builder-card--delete')));
        }
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

    async getTMPreviewMetrics(){
        /*await this.dbdPage.getCellByName(name).then(async cell => {
            await cell.getRect().then(async rect => {
                // console.log("DEBUG rect for " + name + " " + JSON.stringify(rect))
                if(typeof __dataBuffer.rect === 'undefined'){
                    __dataBuffer.rect = [];
                }
                __dataBuffer.rect[name] = rect;
                //debug why resize not saved
                //await influxUtils.signIn('admin');
                //let dashboards = await influxUtils.getDashboards();
                //console.log("DEBUG dashboards " + JSON.stringify(dashboards));

            })
        })*/

        await this.cellOverlay.getTMTop().then(async cell => {
            // TODO generalize the following into system wide method
           await cell.getRect().then(async rect => {
               if(typeof __dataBuffer.rect === 'undefined'){
                   __dataBuffer.rect = [];
               }
               __dataBuffer.rect['TMTop'] = rect;

           })
        });
    }

    async getTMPQueryAreaMetrics(){
        await this.cellOverlay.getTMBottom().then(async cell => {
            await cell.getRect().then(async rect => {
                if(typeof __dataBuffer.rect === 'undefined'){
                    __dataBuffer.rect = [];
                }
                __dataBuffer.rect['TMBottom'] = rect;

            })
        });
    }

    async getTMPreviewCanvas(){
        await this.cellOverlay.getGraphCanvas().then(async canvas => {
                if(typeof __dataBuffer.graphCellLine === 'undefined') {
                    __dataBuffer.graphCellLine = [];
                }
                __dataBuffer.graphCellLine['TMPreview'] = await this.driver
                    .executeScript('return arguments[0].toDataURL(\'image/png\');', canvas);
        });
    }

    async getTMPreviewCanvasAxes(){
        await this.cellOverlay.getGraphCanvasAxes().then(async axes => {
            if(typeof __dataBuffer.graphCellAxes === 'undefined') {
                __dataBuffer.graphCellAxes = [];
            }
            __dataBuffer.graphCellAxes['TMPreviewAxes'] = await this.driver
                .executeScript('return arguments[0].toDataURL(\'image/png\');', axes);
        })
    }

    async resizeTMPreviewBy(deltaSize){

        await this.cellOverlay.getTMResizerHandle().then(async resizer => {



            let action = await this.driver.actions();
            let action2 = await this.driver.actions();
            let rect = await resizer.getRect();
            let x = parseInt(rect.x);
            let y = parseInt(rect.y);
            await action  //troubleshoot why action occasionally fails
                .move({x:0, y: 0, origin: resizer, duration: 500})
                .press().perform();
            await this.driver.sleep(1000); //wait for animation
            await action2.move({x: 0, y: parseInt(deltaSize.dh), origin: resizer, duration: 500})
                .release()
                .perform();
            await this.driver.sleep(1000); //slight wait for animation

        });
    }

    //todo - generalize this for different elements
    async verifyTMPreviewAreaSizeChange(deltaSize){

        let tolerance = 10;
        await this.cellOverlay.getTMTop().then(async preview => {
            let rect = await preview.getRect();
            //console.log("DEBUG rect " + JSON.stringify(rect))
            let width = parseInt(rect.width);
            let height = parseInt(rect.height);
            let dw = parseInt(deltaSize.dw);
            let dh = parseInt(deltaSize.dh);
            let exph = parseInt(__dataBuffer.rect['TMTop'].height) + dh;
            let expw = parseInt(__dataBuffer.rect['TMTop'].width) + dw;
            expect(Math.abs(exph - height )).to.be.below(tolerance);
            expect(Math.abs(expw - width )).to.be.below(tolerance);

        });

    }

    //todo - generalize this for different elements
    async verifyTMQBAreaSizeChange(deltaSize){
        let tolerance = 10;
        await this.cellOverlay.getTMBottom().then(async preview => {
            let rect = await preview.getRect();
            //console.log("DEBUG rect " + JSON.stringify(rect))
            let width = parseInt(rect.width);
            let height = parseInt(rect.height);
            let dw = parseInt(deltaSize.dw);
            let dh = parseInt(deltaSize.dh);
            let exph = parseInt(__dataBuffer.rect['TMBottom'].height) + dh;
            let expw = parseInt(__dataBuffer.rect['TMBottom'].width) + dw;
            expect(Math.abs(exph - height )).to.be.below(tolerance);
            expect(Math.abs(expw - width )).to.be.below(tolerance);

        });

    }

    async verifyTMPreviewCanvasChange(){
        await this.driver.sleep(3000); //troubleshoot why no change
        await this.cellOverlay.getGraphCanvas().then(async canvasLine => {
            let currentLine = await this.driver
                .executeScript('return arguments[0].toDataURL(\'image/png\');', canvasLine);

            await fs.writeFile('before.png',  __dataBuffer.graphCellLine['TMPreview'].split(',')[1], 'base64', (err) => {
                if (err) {
                    console.log(err)
                }
            });


            await fs.writeFile('after.png', currentLine.split(',')[1], 'base64', (err) => {
                if (err) {
                    console.log(err)
                }
            });

            await expect(currentLine).to.not.equal(__dataBuffer.graphCellLine['TMPreview']);
        })
    }

    async verifyTMPreviewAxesChange(){
        await this.cellOverlay.getGraphCanvasAxes().then(async canvasAxes => {
            let currentAxes = await this.driver
                .executeScript('return arguments[0].toDataURL(\'image/png\');', canvasAxes);

            await expect(currentAxes).to.not.equal(__dataBuffer.graphCellAxes['TMPreviewAxes']);
        })
    }

    async verifyTMPreviewCanvasNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getGraphCanvasSelector())
    }

    async verifyTMPreviewCanvasAxesNotPresent(){
        await this.assertNotPresent(cellEditOverlay.getGraphCanvasAxesSelector())
    }

    async clickTMAddQuery(){
        await this.clickAndWait(await this.cellOverlay.getTMBuilderTabsAddQuery());
    }

    async verifyTMQueryBucketSelected(bucket){
        await this.verifyElementContainsText(await this.cellOverlay.getTMQBSelectedBucket(), bucket);

    }

    async verifyTMQueryCardSelected(index,tag){
        await this.verifyElementContainsText(await this.cellOverlay
            .getTMQBSelectedTagOfCard(parseInt(index) - 1), tag)
    }

    async verifyTMQueryFunctionsSelected(funcs){
        let list = funcs.split(',');
        for(let i = 0; i < list.length; i++){
            await this.cellOverlay.getTMQBSelectedFunctionByName(list[i].trim()).then(async elems => {
                expect(elems.length).to.equal(1, ` selected function ${list[i]} should occur once` );
            });
        }

    }

    async clickTMQBFunction(func){
        await this.clickAndWait(await this.cellOverlay.getTMBuilderCardMenuFunctionListItem(func));
    }

    async verifyTMQBActiveQuery(name){
        await this.cellOverlay.getTMQBActiveQueryTab().then(async tab => {
            await tab.findElement(By.css('.query-tab--name')).then(async elem => {
                this.verifyElementContainsText(elem, name)
            })
        })
    }

    async clickOnTMQBQueryTab(title){
        await this.clickAndWait(await this.cellOverlay.getTMQBQueryTabByName(title));
    }

    async rightClickTMQBQueryTabTitle(title){
        await this.cellOverlay.getTMQBQueryTabByName(title).then(async elem => {
            let action = this.driver.actions();

            await action.contextClick(elem).perform();
        });
    }

    async clickTMQBQueryTabRightClickMenuItem(item){
        await this.clickAndWait(await this.cellOverlay.getTMQBRightClickItem(item));
    }

    async enterNewTMQBQueryTabName(name){
        await this.typeTextAndWait(await this.cellOverlay.getTMQBQueryTabNameInput(),
            name + Key.ENTER);
    }

    async verifyNoTMQBQueryTabNamed(name){
        await this.assertNotPresent(cellEditOverlay.getTMQBQueryTabSelectorByName(name));
    }

    async clickTMQBHideQuery(name){
        await this.cellOverlay.getTMQBQueryTabByName(name).then(async tab => {
            await this.clickAndWait(await tab.findElement(By.css('.query-tab--hide')));
        })
    }

    async clickTMQBDeleteQuery(name){
        await this.cellOverlay.getTMQBQueryTabByName(name).then(async tab => {
            await this.clickAndWait(await tab.findElement(By.css('.query-tab--close')));
        })
    }

    async verifyTMQBNumberOfQueryTabs(count){
        await this.cellOverlay.getTMQBQueryTabs().then(async elems => {
            await expect(elems.length).to.equal(parseInt(count),
                `Expected number of query tabs to equals ${count}`);
        })
    }

    async verifyTMQBScriptEditorContents(script){
        let text = await this.getMonacoEditorText();
        await expect(text.trim()).to.equal(script.trim());
    }

    async updateTMQBScriptEditorContents(script){
        await this.clearMonacoEditorText(await this.cellOverlay.getScriptMonacoEditor());
        await this.setMonacoEditorText(await this.cellOverlay.getScriptMonacoEditor(), script);
    }

    async verifyTMEmptyGraphErrorMessage(msg){
        await this.verifyElementContainsText(await this.cellOverlay.getTMEmptyGraphErrMessage(), msg)
    }

}

module.exports = cellOverlaySteps;
