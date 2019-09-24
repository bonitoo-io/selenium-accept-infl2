const { By } = require('selenium-webdriver');
const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');

const telegrafsFilter = '[data-testid=search-widget]';
const createConfigInHeader = '//div[@data-testid=\'tabs--tab-contents\']/div[@data-testid=\'flex-box\']/button';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const bucketSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const createConfigInBody = '[data-testid=resource-list] [data-testid=button]';
const telegrafCardTemplate = '//*[@data-testid=\'resource-card\'][div/div/div/span/span[text()=\'%NAME%\']]';
const telegrafCards = '[data-testid=resource-card]';

const urlCtx = 'telegrafs';

// Telegraf wizard
const bucketDropdownBtn = '[data-testid=bucket-dropdown--button] ';
const pluginFilter = '[data-testid=input-field][placeholder*=\'Plugins\']';
const pluginTileTemplate = '[data-testid=telegraf-plugins--%TILE_NAME%]';

// Telegraf wizard step 2
const configurationNameInput = '[data-testid=input-field][title*=\'Configuration Name\']';
const configurationDescrInput = '[data-testid=input-field][title*=\'Configuration Descr\']';
const configurationPluginsSideBar = '//*[*[text()=\'Plugins\']]//div[contains(@class,\'side-bar--tabs\')]';

//Telegraf wizard edit plugin
const pluginDockerEditEndpoint = '//*[label/span[text()=\'endpoint\']]//*[@data-testid=\'input-field\']';
const pluginK8SEditEndpoint = '//*[label/span[text()=\'url\']]//*[@data-testid=\'input-field\']';
const pluginNGINXEditEndpoint = '//*[label/span[text()=\'urls\']]//*[@data-testid=\'input-field\']';
const pluginRedisServersEditEndpoint = '//*[label/span[text()=\'servers\']]//*[@data-testid=\'input-field\']';
const pluginRedisPasswordEditEndpoint = '//*[label/span[text()=\'password\']]//*[@data-testid=\'input-field\']';

//Telegraf wizard step 3
const codeToken = '//code[contains(text(), \'TOKEN\')]';
const codeCliTelegraf = '//code[contains(text(), \'telegraf\')]';
const copyToClipboardToken = 'div.code-snippet:nth-of-type(1) [data-testid=button-copy]';
const copyToClipboardCommand = 'div.code-snippet:nth-of-type(2) [data-testid=button-copy]';




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

    // Telegraf Wizard step 2
    async getPluginItemByName(name){
        return await this.driver.findElement(By.xpath(`//*[contains(@class, 'side-bar--tab')][text() = '${name.toLowerCase()}']`));
    }

    async getConfigurationNameInput(){
        return await this.driver.findElement(By.css(configurationNameInput));
    }

    static getConfigurationNameInputSelector(){
        return { type: 'css', selector: configurationNameInput}
    }

    async getConfigurationDescrInput(){
        return await this.driver.findElement(By.css(configurationDescrInput));
    }

    static getConfigurationDescrInputSelector(){
        return { type: 'css', selector: configurationDescrInput};
    }

    async getConfigurationPluginsSideBar(){
        return await this.driver.findElement(By.xpath(configurationPluginsSideBar));
    }

    static configurationPluginsSideBarSelector(){
        return { type: 'css', selector: configurationPluginsSideBar}
    }

    //Telegraf wizard edit plugin
    async getPluginDockerEditEndpoint(){
        return await this.driver.findElement(By.xpath(pluginDockerEditEndpoint));
    }

    async getPluginK8SEditEndpoint(){
        return await this.driver.findElement(By.xpath(pluginK8SEditEndpoint));
    }

    async getPluginNGINXEditEndpoint(){
        return await this.driver.findElement(By.xpath(pluginNGINXEditEndpoint));
    }

    async getPluginRedisServersEditEndpoint(){
        return await this.driver.findElement(By.xpath(pluginRedisServersEditEndpoint));
    }

    async getPluginRedisPasswordEditEndpoint(){
        return await this.driver.findElement(By.xpath(pluginRedisPasswordEditEndpoint));
    }

    async getCodeToken(){
        return await this.driver.findElement(By.xpath(codeToken));
    }

    async getCodeCliTelegraf(){
        return await this.driver.findElement(By.xpath(codeCliTelegraf));
    }

    async getTelegrafCardByName(name){
        return await this.driver.findElement(By.xpath(telegrafCardTemplate.replace('%NAME%', name)));
    }

    async getTelegrafCards(){
        return await this.driver.findElements(By.css(telegrafCards));
    }

    async getCopyToClipboardToken(){
        return await this.driver.findElement(By.css(copyToClipboardToken));
    }

    async getCopyToClipboardCommand(){
        return await this.driver.findElement(By.css(copyToClipboardCommand));
    }

}

module.exports = telegrafsTab;
