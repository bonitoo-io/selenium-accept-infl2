const expect = require('chai').expect;
const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const signinPage = require(__srcdir + '/pages/signin/signinPage.js');
const influxPage = require(__srcdir + '/pages/influxPage.js');

class signinSteps extends baseSteps {

    constructor(driver){
        super(driver);
        this.signinPage = new signinPage(driver);
        this.influxPage = new influxPage(driver);
    }

    async verifyHeadingContains(text){
        expect(await (await this.signinPage.getHeading()).getText()).to.include(text);
    }

    async verifyVersionContains(version){
        expect(await (await this.signinPage.getVersionInfo()).getText()).to.include(version);
    }

    async verifyCreditsLink(){
        await this.signinPage.getCreditsLink().then(  elem => {
            elem.getText().then( eltxt => {
                expect(eltxt).to.equal('InfluxData');
            });

            elem.getAttribute('href').then(href => {
                expect(href).to.equal('https://www.influxdata.com/');
            });
        });
    }

    async enterUsername(name){
        await this.signinPage.getNameInput().then(async input => {
            await input.clear();
            await input.sendKeys(name);
        });
    }

    async enterPassword(password){
        await this.signinPage.getPasswordInput().then(async input =>{
            await input.clear();
            await input.sendKeys(password);
        });
    }

    async clickSigninButton(){
        await this.signinPage.getSigninButton().then(async btn =>{
            await btn.click();
        });
    }
}

module.exports = signinSteps;

