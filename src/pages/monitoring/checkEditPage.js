const influxPage = require(__srcdir + '/pages/influxPage.js');
const { By } = require('selenium-webdriver');

const overlay = '[data-testid=overlay]';
const dismissButton = '[data-testid=page-control-bar] [data-testid=square-button]';
const pageCheckEditTitle = '[data-testid=overlay] [data-testid=page-header] [data-testid=page-title]';
const queriesToggle = '[data-testid=overlay] [data-testid=select-group--option][title=queries]';
const configureCheckToggle = '[data-testid=overlay] [data-testid=\'checkeo--header alerting-tab\']';

// TODO timemachine controls -- see dashboards - try and reuse

const urlCtx = 'checks';

class checkEditPage extends influxPage {

    constructor(driver) {
        super(driver);
    }

    async isLoaded(){
        await super.isLoaded([
            {type: 'css', selector: dismissButton},
            {type: 'css', selector: pageCheckEditTitle},
            {type: 'css', selector: queriesToggle},
            {type: 'css', selector: configureCheckToggle}
        ], urlCtx);
    }

    static getOverlaySelector(){
        return { type: 'css', selector: overlay};
    }

    async getDismissButton(){
        return await this.driver.findElement(By.css(dismissButton));
    }

    async getPageCheckEditTitle(){
        return await this.driver.findElement(By.css(pageCheckEditTitle));
    }

    async getQueriesToggle(){
        return await this.driver.findElement(By.css(queriesToggle));
    }

    async getConfigureCheckToggle(){
        return await this.driver.findElement(By.css(configureCheckToggle))
    }

}

module.exports = checkEditPage;
