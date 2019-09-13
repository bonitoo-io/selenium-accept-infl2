import { Then, When } from 'cucumber';

const telegrafsSteps = require(__srcdir + '/steps/loadData/telegrafsSteps.js');

let teleTabSteps = new telegrafsSteps(__wdriver);

Then(/^there is a telegraf card for "(.*)"$/, async name => {

    teleTabSteps.verifyTelegrafCardByName(name);

});
