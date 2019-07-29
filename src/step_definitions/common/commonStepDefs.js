import { Then, When } from 'cucumber';
const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const influxUtils = require(__srcdir + '/utils/influxUtils.js');

let bSteps = new baseSteps(__wdriver);

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
When(/^run setup over REST "(.*?)"$/, async( newUser ) => {

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

