import { Then, When } from 'cucumber';
const dataExplorerSteps = require(__srcdir + '/steps/dataExplorer/dataExplorerSteps.js');

let deSteps = new dataExplorerSteps(__wdriver);

Then(/^the Data Explorer page is loaded$/, async () => {
    await deSteps.isLoaded()
    await deSteps.verifyIsLoaded()
})
