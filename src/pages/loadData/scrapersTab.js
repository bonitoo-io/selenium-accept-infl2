const { By } = require('selenium-webdriver');
const loadDataPage = require(__srcdir + '/pages/loadData/loadDataPage.js');

const scrapersFilter = '[data-testid=search-widget]';
const createScraperHeader = '[data-testid=create-scraper-button-header]';
const nameSort = '[data-testid=resource-list--sorter]:nth-of-type(1)';
const urlSort = '[data-testid=resource-list--sorter]:nth-of-type(2)';
const bucketSort = '[data-testid=resource-list--sorter]:nth-of-type(3)';
const createScraperEmpty = '[data-testid=create-scraper-button-empty]';

const urlCtx = 'scrapers';

class scrapersTab extends loadDataPage{

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

    async getScraperCardByName(name){
        return await this.driver.findElement(By.xpath(`//*[@data-testid='resource-card'][//span[text() = '${name}']]`))
    }

    async getScrapersFilter(){
        return this.driver.findElement(By.css(scrapersFilter));
    }

    async getCreateScraperHeader(){
        return this.driver.findElement(By.css(createScraperHeader));
    }

    async getNameSort(){
        return this.driver.findElement(By.css(nameSort));
    }

    async getUrlSort(){
       return this.driver.findElement(By.css(urlSort));
    }

    async getBucketSort(){
        return this.driver.findElement(By.css(bucketSort));
    }

    async getCreateScraperEmpty(){
        return this.driver.findElement(By.css(createScraperEmpty));
    }

    static getCreateScraperEmptySelector(){
        return { type: 'css', selector: createScraperEmpty};
    }


}

module.exports = scrapersTab;
