const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, promise, until} = require('selenium-webdriver');
import { After, AfterAll, Before, BeforeAll, Given, Status, Then, When } from 'cucumber';
import { flush, config, defaultUser } from '../../utils/InfluxUtils';

const expect = require('chai').expect;
const onboardingSteps = require(__srcdir + '/steps/onboarding/onboardingSteps.js')

/*
let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize({ width: 1024, height: 768}))
    .build()
*/

let driver = __wdriver
let onbSteps = new onboardingSteps(driver)

const delay = function(timeout){
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}

Before( async () => {
   // console.log("DEBUG Before hook " )
    await driver.sleep(1000) //since gets called after scenarios, need a short delay to avoid promise resolution issues
    await flush()
})

BeforeAll(async() => {
   // console.log("DEBUG BeforeAll " )
})

Given(/^I open the Influx onboarding page$/, async () => {

    //await driver.get("http://" + __config.host + ":" + __config.port + "/" )
    await onbSteps.openBase()

    //await onbSteps.delay(3000)
    //return 'pending';

})

Then(/^there is a Welcome message$/, async () => {

    /*
    expect(await driver.findElement(By.css('[data-testid=init-step--head-main]'))
        .getText())
        .to
        .include('Welcome') */
    await onbSteps.verifyHeadContains('Welcome')
    //return 'pending';

})

Then(/^there is a link to corporate$/, async () => {

    /*
    expect(await driver.findElement(By.css('[data-testid=credits] a')).getText())
        .to
        .equal('InfluxData')

    expect(await driver.findElement(By.css('[data-testid=credits] a')).getAttribute('href'))
        .to
        .equal('https://www.influxdata.com/')
    */
    await onbSteps.verifyCreditsLink()

})

When(/^I click on Get Started$/, async () => {

    //await driver.findElement(By.css('[data-testid=onboarding-get-started]')).click()
    //return 'pending';
    await onbSteps.clickStart();
    //await onbSteps.delay(3000)

})

Then(/^the Initial Setup Page is loaded$/, async () => {
    /*
    expect(await driver.findElement(By.css('[data-testid=admin-step--head-main]')).getText())
        .to
        .include('Setup')

    expect(await driver.findElement(By.css('[data-testid=nav-step--welcome]')).getText())
        .to
        .equal('Welcome')

    expect(await driver.findElement(By.css('[data-testid=nav-step--setup]')).getText())
        .to
        .include('Setup') */
    await onbSteps.verifySetupHeaderContains('Setup')
    await onbSteps.verifyNavCrumbText('welcome', 'Welcome')
    await onbSteps.verifyNavCrumbText('setup', 'Setup')
    //return 'pending';

})

Then(/^the continue button is disabled$/, async () => {
    await onbSteps.verifyContinueButtonDisabled()
})

When(/^enter a new user name "(.*?)"$/, async name => {
    await onbSteps.setInputFieldValue('username', (name === 'DEFAULT') ? __defaultUser.name : name)
    //return "pending";
})

When(/^enter a new password "(.*?)"$/, async password => {
    await onbSteps.setInputFieldValue('password', (password === 'DEFAULT') ? __defaultUser.password : password)
    //return "pending";
})

When(/^enter confirm the new password "(.*?)"$/, async password => {
    await onbSteps.setInputFieldValue('password-chk', (password === 'DEFAULT') ? __defaultUser.password : password)
    //return "pending";
})

Then(/^the form error message says "(.*?)"$/, async message => {
    await onbSteps.verifyFormErrorMessage(message)
})

Then(/^the form error message is not present$/, async () => {
    await onbSteps.verifyFormErrorMessageNotPresent()
})

When(/^enter enter a new organization name "(.*?)"$/, async orgname => {
    await onbSteps.setInputFieldValue('orgname', (orgname === 'DEFAULT') ? __defaultUser.orgname : orgname)
    //return "pending";
})

When(/^enter a new bucket name "(.*?)"$/, async bucketname => {
    await onbSteps.setInputFieldValue('bucketname', (bucketname === 'DEFAULT') ? __defaultUser.bucketname : bucketname)
    //return "pending";
})

When(/^click next from setup page$/, async () => {
    await onbSteps.clickContinueButton()
 //   return "pending";
})

Then(/^verify ready page$/, async () => {
    await onbSteps.verifySubtitle()
    await onbSteps.verifyNavCrumbText('complete', 'Complete')
    await onbSteps.delay(1000)
    //ideally following should be not an exact match but a general value match e.g. lighter than, darker than
    await onbSteps.verifyNavCrumbTextColor('complete', 'rgba(246, 246, 248, 1)')
    //return "pending";

})

When(/^click quick start button$/, async () => {
    //await readyPage.clickQickStart()
    await onbSteps.clickQuickStartButton()
    //return 'pending'
})

When(/^click advanced button$/, async () => {
   await onbSteps.clickAdvancedButton()
})

Then(/^Fail$/, async() => {
    await onbSteps.failTest()
})

/*
After(() => {
    console.log("DEBUG After hook")
})
*/

AfterAll(async() => {
    await driver.close()
})

