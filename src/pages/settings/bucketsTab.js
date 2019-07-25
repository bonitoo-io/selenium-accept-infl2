const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');
//const { By, Key, promise, until} = require('selenium-webdriver');

const urlCtx = 'buckets';

class bucketsTab extends settingsPage {

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx);
    }

}

module.exports = bucketsTab;
