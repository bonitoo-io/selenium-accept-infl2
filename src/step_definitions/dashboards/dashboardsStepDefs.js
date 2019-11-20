import { Then, When } from 'cucumber';
const dashboardsSteps = require(__srcdir + '/steps/dashboards/dashboardsSteps.js');

let dbdsSteps = new dashboardsSteps(__wdriver);

Then(/^the Dashboards page is loaded$/, {timeout: 2 * 5000}, async() => {
    await dbdsSteps.isLoaded();
    await dbdsSteps.verifyIsLoaded();
    await dbdsSteps.verifyHeaderContains('Dashboards');
});

When(/^click create dashboard control$/, async() => {
    await dbdsSteps.clickCreateDashboard();
});

When(/^click "(.*)" in create dashboard dropdown$/, async item => {
    await dbdsSteps.clickCreateDashboardItem(item);
});

When(/^click the empty Create dashboard dropdown button$/, async () => {
   await dbdsSteps.clickCreateDashboardEmpty();
});

Then(/^the empty create dashboard dropdown list contains$/, async (items) => {
  await dbdsSteps.verifyEmptyCreateDashboardItems(items);
});

When(/^click the create dashboard item "(.*)"$/, async (item) => {
   await dbdsSteps.clickCreateDashboardItem(item);
});

Then(/^the empty Create dashboard dropdown button is not present$/, async () => {
   await dbdsSteps.verifyEmptyCreateDashboardNotPresent();
});

Then(/^there is a dashboard card named "(.*)"$/, async name =>{
   await dbdsSteps.verifyDashboardCardVisible(name);
});

Then(/^there is no dashboard card named "(.*)"$/, async name => {
   await dbdsSteps.verifyDashboardCardNotPresent(name);
});


When(/^hover over dashboard card named "(.*)"$/, async name => {
   await dbdsSteps.hoverOVerDashboardCard(name);
});

Then(/^the export button for the dashboard card "(.*)" is visible$/, async name => {
    await dbdsSteps.verifyExportButtonOfCardVisible(name);
});

Then(/^the clone button for the dashboard card "(.*)" is visible$/, async name => {
    await dbdsSteps.verifyCloneButtonOfCardVisible(name);
});

Then(/^the delete button for the dashboard card "(.*)" is visible$/, async name => {
    await dbdsSteps.verifyDeleteButtonOfCardVisible(name);
});

When(/^hover over dashboard card name "(.*)"$/, async name => {
    await dbdsSteps.hoverOverDashboardCardName(name);
});

When(/^click the edit dashboard card name button for "(.*)"$/, async name => {
    await dbdsSteps.clickDashboardCardName(name);
});

When(/^clear the name input of the dashboard card "(.*)"$/, async name => {
   await dbdsSteps.clearDashboardCardName(name);
});

When(/^enter the new name "(.*)" in the name input of the dashboard card "(.*)"$/, async (newName, oldName) => {
   await dbdsSteps.renameDashboardCard(newName, oldName);
});

Then(/^the description for card "(.*)" contains "(.*)"$/, async (name, descr) => {
   await dbdsSteps.verifyDashboardCardContainsDescription(name,descr);
});

When(/^hover over description of the dashboard card "(.*)"$/, async name => {
   await dbdsSteps.hoverOverDashboardCardDescription(name);
});

When(/^click the edit description button for the dashboard card "(.*)"$/, async name => {
    await dbdsSteps.clickDashboardCardEditDescriptionButton(name);
});

When(/^enter into the dashboard card "(.*)" the description:$/, async (name, descr) => {
   await dbdsSteps.enterDashboardCardDescription(name,descr);
});

When(/^click empty label for the dashboard card "(.*)"$/, async name => {
    await dbdsSteps.clickEmptyLabelOfDashboardCard(name);
});

When(/^click add label for the dashboard card "(.*)"$/, async name => {
   await dbdsSteps.clickAddLabelOfDashboardCard(name);
});

Then(/^the label "(.*)" in the popover selector is visible$/, async label => {
    await dbdsSteps.verifyLabelInDashboardsPopoverIsVisible(label);
});

When(/^enter "(.*)" in the popover label selector filter$/, async text => {
   await dbdsSteps.enterDashboardLabelsFilter(text);
});

Then(/^there are "(.*)" label pills in the select label popover$/, async count => {
   await dbdsSteps.verifyDasboardAddLabelsPillCount(count);
});

When(/^clear the popover label selector filter$/, async () => {
   await dbdsSteps.clearDashboardLabelsFilter();
});

Then(/^the  create new label item is not visible in the popover$/, async () => {
   await dbdsSteps.verifyLabelPopoverCreateNewNotPresent();
});

Then(/^the create new label item is visible in the popover$/, async () => {
   await dbdsSteps.verifyLabelPopoverCreateNewIsVisible();
});

When(/^click the new label item in the add labels popover$/, async () => {
   await dbdsSteps.clickLabelPopoverCreateNewLabel();
});

Then(/^the dashboard card "(.*)" has the label "(.*)"$/, async (name, label) => {
   await dbdsSteps.verifyDashboardCardHasLabel(name, label);
});

Then(/^the add label popover is not present$/, async () => {
   await dbdsSteps.verifyAddLabelsPopopverNotPresent();
});

When(/^click the add label button for the dashboard card "(.*)"$/, async name => {
   await dbdsSteps.clickDasboardCardAddLabel(name);
});

When(/^hover over the label "(.*)" of the dashboard card "(.*)"$/, async (label,name) => {
   await dbdsSteps.hoverDashboardCardLabel(name, label);
});

When(/^click remove label "(.*)" from the dashboard card "(.*)"$/, async (label,name) => {
   await dbdsSteps.clickDashboardCardRemoveLabel(name,label);
});

Then(/^the dashboard card "(.*)" labels empty message is visible$/, async name => {
   await dbdsSteps.verifyDashboardCardLabelsEmptyVisible(name);
});

Then(/^the label "(.*)" of the dashboard card "(.*)" is not present$/, async (label,name) => {
   await dbdsSteps.verifyDashboardCardLabelNotPresent(name, label);
});

Then(/^the label "(.*)" is not present in the popover selector$/, async label => {
   await dbdsSteps.verifyLabelInDashboardsPopoverIsNotPresent(label);
});

Then(/^the dashboards page contains the cards:$/, async cards => {
    await dbdsSteps.verifyDashboardCardsVisible(cards);
});

When(/^enter the term "(.*)" in the dashboards filter$/, async term => {
   await dbdsSteps.enterDashboardsCardFilter(term);
});

When(/^clear the dashboards filter$/, async () => {
   await dbdsSteps.clearDashboardsCardFilter();
});

Then(/^the dashboards page does not contain the cards:$/, {timeout: 15000}, async cards => {
   await dbdsSteps.verifyDashboardCardsNotPresent(cards);
});

Then(/^the Import Dashboard popup is loaded$/, async () => {
   await dbdsSteps.verifyImportDashboardPopupVisible();
});

When(/^upload the import dashboard file "(.*)"$/, async path2file  => {
    await dbdsSteps.uploadImportDashboardPopupFile(path2file);
});

Then(/^the import dashboard drag and drop header contains success "(.*)"$/, async path2file => {
    await dbdsSteps.verifyImportPopupUploadSuccess();
    await dbdsSteps.verifyImportPopupUploadFilename(path2file);
});

When(/^click the Import Dashboard button$/, async () => {
   await dbdsSteps.clickImportDashboardButton();
});



