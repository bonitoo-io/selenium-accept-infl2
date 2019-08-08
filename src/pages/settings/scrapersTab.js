const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const scrapersFilter = '[data-testid=input-field]';
const createScraperHeader = '[data-testid=create-scraper-button-header]';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const urlSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const bucketSort = '[data-testid=resource-list--sorter]:nth-of-type(3)';
//const createConfigBody = 'div.resource-list--body [data-testid=button]';

const urlCtx = 'scrapers';

class scrapersTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: scrapersFilter},
                {type: 'css', selector: createScraperHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: urlSort},
                {type: 'css', selector: bucketSort},
            ]
        );
    }

}

module.exports = scrapersTab;
