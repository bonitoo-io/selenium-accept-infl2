import { Then, When } from 'cucumber';

const labelsSteps = require(__srcdir + '/steps/settings/labelsSteps.js');

let lblSteps = new labelsSteps(__wdriver);

Then(/^the create Label popup is loaded$/, {timeout: 10000}, async () => {
    lblSteps.verifyCreateLabelPopupLoaded();
});

When(/^dismiss the Create Label Popup$/, async () => {
   lblSteps.dismissCreateLabelPopup();
});
