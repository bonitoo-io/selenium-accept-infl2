import { Then, When } from 'cucumber';
const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const createOrgSteps = require(__srcdir + '/steps/createOrgSteps.js')

let iSteps = new influxSteps(__wdriver);
let cOrgSteps = new createOrgSteps(__wdriver);

Then(/^influx page is loaded$/, async() => {

    await iSteps.verifyIsLoaded();

});

Then(/^the Create Organization form is loaded$/, async () => {
    await cOrgSteps.isLoaded();
    await cOrgSteps.verifyIsLoaded();
})

When(/^hover over the "(.*?)" menu item$/, async (item) => {
    await iSteps.hover(item);
});

Then(/^the home submenu items are "(.*?)"$/, async(state) => {
    await iSteps.verifySubMenuItems('home:heading', state);
    await iSteps.verifySubMenuItems('home:neworg', state);
    await iSteps.verifySubMenuItems('home:logout', state);
});

When(/^click nav sub menu "(.*?)"$/, async(item) => {
    await iSteps.clickSubMenuItem(item);
});

Then(/^the menu item text "(.*?)" is "(.*?)"$/, async (text, state) => {
        await iSteps.verifyVisibilityItemByText(text, state.toLowerCase() !== 'hidden')
})
