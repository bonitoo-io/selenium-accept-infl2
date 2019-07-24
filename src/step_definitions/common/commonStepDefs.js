const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, promise, until} = require('selenium-webdriver');
import { After, AfterAll, Before, BeforeAll, Given, Status, Then, When } from 'cucumber';
const baseSteps = require(__srcdir + '/steps/baseSteps.js')

let bSteps = new baseSteps(__wdriver)

Then(/^the success notification says "(.*?)"$/, async message => {
    await bSteps.isNotificationMessage(message)
})

When(/^close all notifications$/, async() => {
    await bSteps.closeAllNotifications()
})
