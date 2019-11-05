const { By } = require('selenium-webdriver');
const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');

const libTileByName = '[data-testid=\'client-libraries-cards--%NAME%\']';
const clientURL = '[data-testid=tabs--tab-contents] .code-snippet code';

const urlCtx = 'client-libraries';

class clientLibsTab extends loadDataPage {

    constructor(driver) {
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: clientURL},
                {type: 'css', selector: libTileByName.replace('%NAME%', 'csharp')},
                {type: 'css', selector: libTileByName.replace('%NAME%', 'java')},
                {type: 'css', selector: libTileByName.replace('%NAME%', 'python')},
            ]
        );
    }


    async getLibTileByName(name){
        return await this.driver.findElement(By.css(libTileByName.replace('%NAME%', name)));
    }

    async getClientURL(){
        return await this.driver.findElement(By.css(clientURL));
    }

}

module.exports = clientLibsTab;
