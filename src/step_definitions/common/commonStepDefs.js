import { AfterAll, Given, Then, When } from 'cucumber';
import {flush} from '../../utils/influxUtils';
const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const signinSteps = require(__srcdir + '/steps/signin/signinSteps.js');
const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const influxUtils = require(__srcdir + '/utils/influxUtils.js');

let bSteps = new baseSteps(__wdriver);
let sSteps = new signinSteps(__wdriver);
let iSteps = new influxSteps(__wdriver);

Given(/^I reset the environment$/, async () => {
    await bSteps.driver.sleep(1000); //since gets called after scenarios, need a short delay to avoid promise resolution issues
    await flush();
});

/*
Before(() => {
})

BeforeAll(() => {
})

After(() => {
    console.log("DEBUG After hook")
})
*/

AfterAll(async() => {
    await bSteps.driver.close();
});


Then(/^the success notification says "(.*?)"$/, async message => {
    await bSteps.isNotificationMessage(message);
});

Then(/^the success notification contains "(.*?)"$/, async text => {
    await bSteps.containsNotificationText(text);
});

Then(/^the error notification contains "(.*?)"$/, async text => {
    await bSteps.containsErrorNotificationText(text);
});

When(/^close all notifications$/, async() => {
    await bSteps.closeAllNotifications();
});

// newUser if not DEFAULT should follow {username: 'name', password: 'password', org: 'org', bucket: 'bucket'}
Given(/^run setup over REST "(.*?)"$/, async( newUser ) => {

    await influxUtils.flush();

    if(newUser === 'DEFAULT'){
        await influxUtils.setupUser(__defaultUser);
    }else{
        let user = JSON.parse(newUser);
        if(user.password.length < 8 ){
            throw Error(`Password: ${user.password} is shorter than 8 chars`);
        }
        await influxUtils.setupUser(user);
    }

});

When(/^API sign in user "(.*?)"$/, async username => {
    await influxUtils.signIn((username === 'DEFAULT') ? __defaultUser.username : username).then(async () => {
        // await sSteps.driver.sleep(1500)

    }).catch(async err => {
        console.log('ERROR ' +  err);
        throw(err);
    });
});

When(/^API end session$/, async() => {
    await influxUtils.endSession();
});

When(/^UI sign in user "(.*?)"$/, {timeout: 10000},  async username => {
    let user = influxUtils.getUser((username === 'DEFAULT') ? __defaultUser.username : username);
    await sSteps.signin(user);
    //await sSteps.driver.sleep(1500)
});

When(/^write basic test data for org "(.*?)" to bucket "(.*?)"$/, async (org,bucket) => {
    await influxUtils.writeData(org,bucket);
});

When(/^write sine data for org "(.*?)" to bucket "(.*?)"$/, async (org, bucket) =>{

    let nowNano = new Date().getTime() * 1000000;

    let intervalNano = 600 * 1000 * 1000000; //10 min in nanosecs

    let lines = [];

    let recCount = 256;

    let startTime = nowNano - (recCount * intervalNano);

    for(let i = 0; i < recCount; i++){
        lines[i] = 'sinus point=' + Math.sin(i) + ' ' + (startTime + (i * intervalNano));
    }

    await influxUtils.writeData(org, bucket, lines);


});


When(/^API create a dashboard named "(.*?)" for user "(.*?)"$/, async (name, username) => {

    let user = await influxUtils.getUser(username);

    let dashb = await influxUtils.createDashboard(name, user.orgid);

    if(user.dashboards === undefined){
        user.dashboards = new Object();
    }

    //Save dashboard for later use
    user.dashboards[name] =  dashb;

});


When(/^open page "(.*?)" for user "(.*?)"$/, async (page, username) => {

    let user = await influxUtils.getUser((username === 'DEFAULT') ? __defaultUser.username : username);
    let ctx = 'orgs/' + user.orgid;
    if(page !== 'HOME'){
        ctx += `/${page}`;
    }

    await bSteps.openContext(ctx);

    await iSteps.isLoaded();
    //await bSteps.driver.sleep(3000)

});

