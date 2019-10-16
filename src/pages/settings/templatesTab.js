const { By } = require('selenium-webdriver');

const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const templatesFilter = '[data-testid=search-widget]';
const importTemplateButton = '[title=\'Import Template\']';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const templatesTypeFilterButton = '[data-testid=radio-button]';
const resourceList = '[data-testid=resource-list]';
const templateCards = '[data-testid=template-card--name] span span';

const urlCtx = 'templates';

class templatesTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: templatesFilter},
                {type: 'css', selector: importTemplateButton},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: templatesTypeFilterButton},
                {type: 'css', selector: resourceList},
            ]
        );
    }

    async getTemplateCards(){
        return await this.driver.findElements(By.css(templateCards));
    }

}

module.exports = templatesTab;
