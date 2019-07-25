import { Then } from 'cucumber';
const homeSteps = require(__srcdir + '/steps/home/homeSteps.js');

let hSteps = new homeSteps(__wdriver);

Then(/^the home page is loaded$/, async () => {
    await hSteps.isLoaded();
});
