const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const telegrafsFilter = '[data-testid=search-widget]';
const createConfigHeader = '//div[@data-testid=\'tabs--tab-contents\']/div[@data-testid=\'flex-box\']/button';
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
                {type: 'xpath', selector: createConfigHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: bucketSort},
            ]
        );
    }

}

module.exports = telegrafsTab;
