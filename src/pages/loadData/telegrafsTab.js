const { By } = require('selenium-webdriver');
const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');

const telegrafsFilter = '[data-testid=search-widget]';
const createConfigInHeader = '//div[@data-testid=\'tabs--tab-contents\']/div[@data-testid=\'flex-box\']/button';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const bucketSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const createConfigInBody = '[data-testid=resource-list] [data-testid=button]';

const urlCtx = 'telegrafs';


class telegrafsTab extends loadDataPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: telegrafsFilter},
                {type: 'xpath', selector: createConfigInHeader},
                {type: 'css', selector: nameSort},
                {type: 'css', selector: bucketSort},
            ]
        );
    }

    async getTelegraphCardByName(name){
        return await this.driver.findElement(By.xpath(`//*[@data-testid='resource-card'][//span[text()='${name}']]`))
    }


}

module.exports = telegrafsTab;
