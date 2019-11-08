import { Given, Then, When } from 'cucumber';

const clientLibsSteps = require(__srcdir + '/steps/loadData/clientLibsSteps.js');
let clibTabSteps = new clientLibsSteps(__wdriver);


Then(/^the Client Libraries tab is loaded$/, async () => {
    await clibTabSteps.verifyClientLibsTabIsLoaded();
});

When(/^click the "(.*)" client library tile$/, async name => {
   await clibTabSteps.clickLibTileByName(name);
});

Then(/^the csharp info popup is loaded$/, async () => {
   await clibTabSteps.verifyCSharpPopupLoaded();
});
