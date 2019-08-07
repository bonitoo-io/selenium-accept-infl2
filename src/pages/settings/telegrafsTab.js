const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const telegrafsFilter = '[data-testid=input-field]';
const createConfigHeader = 'div.tabs--contents-header [data-testid=button]';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const bucketSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
//const createConfigBody = 'div.resource-list--body [data-testid=button]';

const urlCtx = 'telegrafs';

class telegrafsTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: telegrafsFilter},
                {type: 'css', selector: createConfigHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: bucketSort},
            ]
        );
    }

}

module.exports = telegrafsTab;
