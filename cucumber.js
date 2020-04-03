const chrome = require('selenium-webdriver/chrome');
const ffox = require('selenium-webdriver/firefox');
const fs = require('fs');
const {Builder, Capabilities, By, Key, logging, PageLoadStrategy, promise, until} = require('selenium-webdriver');
//following provides cleaner paths in require statements
global.__basedir = __dirname;
global.__srcdir = __dirname + "/src";
global.__runtime = new Date();
global.__runtimeStr = __runtime.getFullYear().toString() +
    (__runtime.getMonth() + 1).toString().padStart(2, '0') +
    __runtime.getDate().toString().padStart(2, '0') + "-" +
    __runtime.getHours().toString().padStart(2, '0') +
    __runtime.getMinutes().toString().padStart(2, '0') +
    __runtime.getSeconds().toString().padStart(2, '0');


const { flush, config, defaultUser } = require(__srcdir + '/utils/influxUtils');

global.__screenShotDir = process.cwd() + "/" + __config.screenshot_dir + "/" + __runtimeStr;
global.__dataBuffer = {};

fs.mkdirSync(__screenShotDir,  { recursive: true });

/*
mkdirp(__screenShotDir, function (err) {
    if (err) console.error(err)
    else console.log('created screenshots directory ' + __screenShotDir)
});
*/


var common = '--require "src/step_definitions/**/*.js" --require hooks.js --require-module babel-core/register ';

// "download": {
//         "default_directory": "/home/karl/bonitoo/prjs/github.com/bonitoo-io/selenium-accept-infl2/temp",
//         "directory_upgrade": true,
//         "prompt_for_download": false
//     },

let caps = new Capabilities();

//global.__downloadsDir = __basedir + "/downloads/";

//console.log("DEBUG __downloadsDir " + __downloadsDir);

let chromeUserPreferences = { 'download.prompt_for_download': false, "download.default_directory": __basedir };

/*
try {
    fs.statSync(__downloadsDir);
}catch(e){
    fs.mkdirSync(__downloadsDir);
}*/

let logPrefs =  new logging.Preferences();
logPrefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);
logPrefs.setLevel(logging.Type.DRIVER, logging.Level.INFO);

if(__config.headless) {
    caps.set('applicationCacheEnabled', false);
    caps.set('pageLoadStrategy', 'none');

    switch (__config.browser.toLowerCase()) {
        case "chrome":
        global.__wdriver = new Builder()
            .withCapabilities(caps)
            .forBrowser(__config.browser)
            .setChromeOptions(new chrome.Options().headless()
            .addArguments("--no-sandbox")
            .addArguments("--disable-dev-shm-usage")
                .setUserPreferences(chromeUserPreferences)
                //.setPageLoadStrategy(PageLoadStrategy.NONE)
                .setLoggingPrefs(logPrefs)
                .windowSize({width: 1024, height: 768}))
            .build();
            break;
        case "firefox":
            global.__wdriver = new Builder()
                .forBrowser(__config.browser)
                .setFirefoxOptions(new ffox.Options().headless().windowSize({width: 1024, height: 768}))
                .build()
            break;

    }
}else{
    switch (__config.browser.toLowerCase()) {
        case "chrome":
            global.__wdriver = new Builder()
                .withCapabilities(caps)
                .forBrowser(__config.browser)
                .setChromeOptions(new chrome.Options().addArguments("--incognito")
                    .addArguments("--no-sandbox")
                    .addArguments("--disable-dev-shm-usage")
                    .setUserPreferences(chromeUserPreferences)
                    .setLoggingPrefs(logPrefs)
                    .windowSize({width: 1024, height: 768}))
                .build();
            break;
        case "firefox":
            global.__wdriver = new Builder()
                .withCapabilities(caps)
                .forBrowser(__config.browser)
                .build()
            break;
    }

}

__wdriver.manage().setTimeouts({implicit: 3000});
__wdriver.executor_.w3c = true;
//let browserVer = __wdriver.capabilities['browserVersion'];
//let driverVer = __wdriver.capabilities['chrome']['chromedriverVersion'].split(' ')[0];
console.log("DEBUG __wdriver: " + JSON.stringify(__wdriver));
//console.log(`Browser version: ${browserVer}`);
//console.log(`Driver version: ${driverVer}`);

module.exports = {
    'default': common + '--format summary --format node_modules/cucumber-pretty --format json:report/cucumber_report.json',
    dry: common + '--dry-run',
    progress: common + '--format progress'
};
