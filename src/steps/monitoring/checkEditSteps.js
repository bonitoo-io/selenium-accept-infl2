const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const checkEditPage = require(__srcdir + '/pages/monitoring/checkEditPage.js');
const basePage = require(__srcdir + '/pages/basePage.js');

class checkEditSteps extends influxSteps {

    constructor(driver) {
        super(driver);
        this.ckEdPage = new checkEditPage(__wdriver);
    }

    async isLoaded() {
        await this.ckEdPage.isLoaded();
    }

    async verifyIsLoaded() {
        await this.assertVisible(await this.ckEdPage.getPageCheckEditTitle());
        await this.assertVisible(await this.ckEdPage.getQueriesToggle());
        await this.assertVisible(await this.ckEdPage.getConfigureCheckToggle());
    }

    async verifyIsNotLoaded(){
        await this.assertNotPresent(checkEditPage.getOverlaySelector());
    }

    async clickCKEdSaveButton(){
        await this.clickAndWait(await this.ckEdPage.getSaveCellButton());
    }

    async dismissOverlay(){
        await this.clickAndWait(await this.ckEdPage.getDismissButton());
    }


    async enterAlertCheckName(name){
        await this.clickAndWait(await this.ckEdPage.getPageCheckEditTitle());
        await this.clearInputText(await this.ckEdPage.getPageCheckEditTitleInput());
        await this.typeTextAndWait(await this.ckEdPage.getPageCheckEditTitleInput(), name);
    }

    async clickCkEdConfigureCheck(){
        await this.clickAndWait(await this.ckEdPage.getConfigureCheckToggle(), async () => {
            await this.driver.sleep(500); // slow to load?
        });
    }

    async verifyConfigureCheckStepLoaded(){
        //Properties
        await this.assertVisible(await this.ckEdPage.getConfChkIntervalInput());
        await this.assertVisible(await this.ckEdPage.getConfChkOffset());
        await this.assertVisible(await this.ckEdPage.getConfChkAddTagButton());
        //Message Template
        await this.assertVisible(await this.ckEdPage.getConfChkMessageTextArea());
        //Thresholds
        await this.assertVisible(await this.ckEdPage.getConfChkAddThresholdButton('CRIT'));
        await this.scrollElementIntoView(await this.ckEdPage.getConfChkAddThresholdButton('WARN'));
        await this.scrollElementIntoView(await this.ckEdPage.getConfChkAddThresholdButton('INFO'));
        await this.scrollElementIntoView(await this.ckEdPage.getConfChkAddThresholdButton('OK'));
        //Checklist
        await this.assertVisible(await this.ckEdPage.getChecklistPopover());
    }

    async verifyChecklistPopoverItems(items){
        let itemList = JSON.parse(items);
        console.log("DEBUG itemList " + JSON.stringify(itemList));
        for(const item of itemList){

                await this.verifyElementContainsClass(await this.ckEdPage.getChecklistPopoverItemByText(item.text),
                    `${item.state}`);
        }
    }

    async clickCkEdIntervalInput(){
        await this.clickAndWait(await this.ckEdPage.getConfChkIntervalInput());
    }

    async verifyCkEdIntervalInput(duration){
        await this.verifyElementAttributeContainsText(await this.ckEdPage.getConfChkIntervalInput(),
            'value', duration );
    }

    async verifyCkEdOffsetInput(val){
        await this.verifyElementAttributeContainsText(await this.ckEdPage.getConfChkOffset(),
            'value', val );
    }

    async clickCkEdOffsetInput(){
        await this.clickAndWait(await this.ckEdPage.getConfChkOffset());
    }

    async enterIntoIntervalOffset(offset){
        await this.clearInputText(await this.ckEdPage.getConfChkOffset());
        await this.typeTextAndWait(await this.ckEdPage.getConfChkOffset(), offset);
    }

    async verifyCkEdHintDropdownNotVisible(){
        await this.assertNotPresent(await basePage.getDropdownContentsSelector());
    }

    async verifyCkEdHintDropdownItems(items){
        let itemList = items.split(',');
        for(const item of itemList){
            let elem = await this.ckEdPage.getDropdownItemByText(item)
            await this.scrollElementIntoView(elem);
            await this.assertVisible(elem);
        }
    }

    async clickCkEdHintDropdownItem(item){
        await this.scrollElementIntoView(await this.ckEdPage.getDropdownItemByText(item));
        await this.clickAndWait(await this.ckEdPage.getDropdownItemByText(item));
    }

    async updateChecMessageTemplateContent(content){
        //await this.clearInputText(await this.ckEdPage.getConfChkMessageTextArea());
        (await this.ckEdPage.getConfChkMessageTextArea()).clear();
        await this.typeTextAndWait(await this.ckEdPage.getConfChkMessageTextArea(), content);
    }

    async verifyCheckMessageTemplateContent(content){
        await this.verifyElementText(await this.ckEdPage.getConfChkMessageTextArea(), content)
    }

    async clickAddThresholdCondition(threshold){
        await this.clickAndWait(await this.ckEdPage.getConfChkAddThresholdButton(threshold))
    }

    async clickThresholdDefinitionDropdown(threshold){
        await this.clickAndWait(await this.ckEdPage.getConfNthThresholdDefDropdownButton(threshold))
    }

    async verifyThresholdDefinitionDropdownItems(threshold, items){
        let itemList = items.split(',');
        for(const item of itemList){
            let elem = await this.ckEdPage.getConfNthThresholdDefDropdownItem(threshold,item)
            await this.scrollElementIntoView(elem);
            await this.assertVisible(elem);
        }
    }

    async clickThresholdDefinitionDropdownItem(threshold, item){
        await this.clickAndWait(await this.ckEdPage.getConfNthThresholdDefDropdownItem(threshold,item))
    }

    async setUnaryThresholdBoundaryValue(threshold, val1){
        await this.clearInputText(await this.ckEdPage.getConfNthThresholdDefInput(threshold));
        await this.typeTextAndWait(await this.ckEdPage.getConfNthThresholdDefInput(threshold), val1);
    }

    async verifyBinaryThresholdBoundaryValues(threshold, lower, upper){
        await this.verifyElementAttributeContainsText(await this.ckEdPage.getConfNthThresholdDefInput(threshold), 'value', lower);
        await this.verifyElementAttributeContainsText(await this.ckEdPage.getConfNthThreshold2ndInput(threshold), 'value', upper);
    }

    async verifyUnaryThresholdBoundaryValue(threshold, val){
        await this.verifyElementAttributeContainsText(await this.ckEdPage.getConfNthThresholdDefInput(threshold), 'value', val);
    }

    async setBinaryThresholdBoundaryValues(threshold, lower, upper){
        await this.clearInputText(await this.ckEdPage.getConfNthThresholdDefInput(threshold));
        await this.typeTextAndWait(await this.ckEdPage.getConfNthThresholdDefInput(threshold), lower);
        await this.clearInputText(await this.ckEdPage.getConfNthThreshold2ndInput(threshold));
        await this.typeTextAndWait(await this.ckEdPage.getConfNthThreshold2ndInput(threshold), upper);
    }

}

module.exports = checkEditSteps;
