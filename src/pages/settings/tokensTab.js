const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const tokensFilter = '[data-testid=input-field--filter]';
const genTokenButton = '[data-testid=dropdown-button--gen-token]';
const tokenListing = '[data-testid=index-list]';
const descHeader = '[data-testid=index-list--header-cell]:nth-of-type(1)';
const statusHeader = '[data-testid=index-list--header-cell]:nth-of-type(2)';
//const createVariableBody = '[data-testid=button-create-initial]';

const urlCtx = 'tokens';

class tokensTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: tokensFilter},
                {type: 'css', selector: genTokenButton},
                {type: 'css', selector: tokenListing},
                {type: 'css', selector: descHeader},
                {type: 'css', selector: statusHeader},
            ]
        );
    }

}

module.exports = tokensTab;
