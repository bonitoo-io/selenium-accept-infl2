const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const labelsFilter = '[data-testid=input-field]';
const createLabelHeader = '[data-testid=button-create]';
const nameSort = '[data-testid=sorter--name]';
const descSort = '[data-testid=sorter--desc]';
//const createVariableBody = '[data-testid=button-create-initial]';

const urlCtx = 'labels';

class labelsTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: labelsFilter},
                {type: 'css', selector: createLabelHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: descSort},
            ]
        );
    }

}

module.exports = labelsTab;
