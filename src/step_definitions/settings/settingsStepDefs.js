const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, promise, until} = require('selenium-webdriver');
import { After, AfterAll, Before, BeforeAll, Given, Status, Then, When } from 'cucumber';
const bucketsSteps = require(__srcdir + '/steps/settings/bucketsSteps.js')

let bktTabSteps = new bucketsSteps(__wdriver)

Then(/^the buckets tab is loaded$/, async() => {
    await bktTabSteps.isLoaded()
})
