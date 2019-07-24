const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, promise, until} = require('selenium-webdriver');
import { After, AfterAll, Before, BeforeAll, Given, Status, Then, When } from 'cucumber';
const homeSteps = require(__srcdir + '/steps/home/homeSteps.js')

let hSteps = new homeSteps(__wdriver)

Then(/^the home page is loaded$/, async () => {
    await hSteps.isLoaded()
})
