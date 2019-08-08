const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const tabHeader = '//div[@data-testid=\'panel--header\' and ./div[text()=\'Organization Profile\']]';
const warningHeader = '//form//div[@data-testid=\'panel--header\']';
const renameButton = '[data-testid=button]';

const urlCtx = 'profile';

class orgProfileTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'xpath', selector: tabHeader},
                {type: 'xpath', selector: warningHeader},
                {type: 'css', selector: renameButton},
            ]
        );
    }

}

module.exports = orgProfileTab;
