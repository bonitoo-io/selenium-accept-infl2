const { By } = require('selenium-webdriver');
const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');

const telegrafsFilter = '[data-testid=search-widget]';
const createConfigInHeader = '//div[@data-testid=\'tabs--tab-contents\']/div[@data-testid=\'flex-box\']/button';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const bucketSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const createConfigInBody = '[data-testid=resource-list] [data-testid=button]';

const urlCtx = 'telegrafs';

// Telegraf wizard
const bucketDropdownBtn = '[data-testid=bucket-dropdown--button] ';
const pluginFilter = '[data-testid=input-field][placeholder*=\'Plugins\']';
const pluginTileTemplate = '[data-testid=telegraf-plugins--%TILE_NAME%]';


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

    async getTelegrafsFilter(){
        return await this.driver.findElement(By.css(telegrafsFilter));
    }

    async getCreateConfigInHeader(){
        return await this.driver.findElement(By.xpath(createConfigInHeader));
    }

    async getNameSort(){
        return await this.driver.findElement(By.css(nameSort));
    }

    async getBucketSort(){
        return await this.driver.findElement(By.css(bucketSort));
    }

    async getCreateConfigInBody(){
        return await this.driver.findElement(By.css(createConfigInBody));
    }

    // Telegraf Wizard

    async getBucketDropdownBtn(){
        return await this.driver.findElement(By.css(bucketDropdownBtn));
    }

    async getPluginFilter(){
        return await this.driver.findElement(By.css(pluginFilter));
    }

    async getPluginTileByName(name){
        return await this.driver.findElement(By.css(pluginTileTemplate.replace('%TILE_NAME%', name)))
    }

    static getPluginTitleSelectorByName(name){
        return { type: 'css', selector: pluginTileTemplate.replace('%TILE_NAME%', name)}
    }


}

module.exports = telegrafsTab;
