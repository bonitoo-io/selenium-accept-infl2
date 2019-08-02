const chrome = require('selenium-webdriver/chrome');
const ffox = require('selenium-webdriver/firefox')
const {Builder, By, Key, promise, until} = require('selenium-webdriver');
//following provides cleaner paths in require statements
global.__basedir = __dirname
global.__srcdir = __dirname + "/src"

const { flush, config, defaultUser } = require(__srcdir + '/utils/influxUtils');

var common = '--require "src/step_definitions/**/*.js" --require hooks.js --require-module babel-core/register ';

if(__config.headless) {
    switch (__config.browser.toLowerCase()) {
        case "chrome":
        global.__wdriver = new Builder()
            .forBrowser(__config.browser)
            .setChromeOptions(new chrome.Options().headless().windowSize({width: 1024, height: 768}))
            .build()
            break;
        case "firefox":
            global.__wdriver = new Builder()
                .forBrowser(__config.browser)
                .setFirefoxOptions(new ffox.Options().headless().windowSize({width: 1024, height: 768}))
                .build()
            break;

    }
}else{
        global.__wdriver = new Builder()
                .forBrowser(__config.browser)
                .build()
}

__wdriver.manage().setTimeouts({implicit: 3000})


module.exports = {
    'default': common + '--format summary --format node_modules/cucumber-pretty --format json:report/cucumber_report.json',
    dry: common + '--dry-run',
    progress: common + '--format progress'
};
