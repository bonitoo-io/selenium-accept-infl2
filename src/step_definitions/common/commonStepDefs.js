import { Then, When } from 'cucumber';
const baseSteps = require(__srcdir + '/steps/baseSteps.js');

let bSteps = new baseSteps(__wdriver);

Then(/^the success notification says "(.*?)"$/, async message => {
    await bSteps.isNotificationMessage(message);
});

Then(/^the success notification contains "(.*?)"$/, async text => {
    await bSteps.containsNotificationText(text);
});

When(/^close all notifications$/, async() => {
    await bSteps.closeAllNotifications();
});
