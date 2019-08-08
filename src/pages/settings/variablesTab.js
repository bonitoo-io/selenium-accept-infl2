const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const variablesFilter = '[data-testid=input-field]';
const createVariableHeader = '.tabbed-page-section--header [data-testid=add-resource-dropdown--button]';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const typeSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
//const createVariableBody = 'div.resource-list--body [data-testid=button]';

const urlCtx = 'variables';

class variablesTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: variablesFilter},
                {type: 'css', selector: createVariableHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: typeSort},
            ]
        );
    }

}

module.exports = variablesTab;
