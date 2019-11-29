import { Then, When } from 'cucumber';
const cellOverlaySteps = require(__srcdir + '/steps/dashboards/cellOverlaySteps.js');

let celOvSteps = new cellOverlaySteps(__wdriver);

Then(/^the cell edit overlay is loaded$/, async () => {
   await celOvSteps.verifyCellOverlayIsLoaded('Name this Cell');
});

When(/^name dashboard cell "(.*)"$/, async name => {
   await celOvSteps.nameDashboardCell(name);
});

When(/^click dashboard cell edit cancel button$/, async () => {
   await celOvSteps.clickDashboardCellEditCancel();
});

When(/^click dashboard cell save button$/, async () => {
   await celOvSteps.clickDashboardCellSave();
});
