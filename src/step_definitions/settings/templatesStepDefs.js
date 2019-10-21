import { Then, When } from 'cucumber';

const templatesSteps = require(__srcdir + '/steps/settings/templatesSteps.js');

let tpltSteps = new templatesSteps(__wdriver);

Then(/^the templates are sorted as:$/, async templates => {
   await tpltSteps.verifyTemplateCardsSort(templates);
});

When(/^click user templates$/, async () => {
   await tpltSteps.clickUserTemplatesButton();
});

When(/^click empty state import template button$/, async () => {
   await tpltSteps.clickImportTemplateEmptyButton();
});

Then(/^the import template popup is loaded$/, async () => {
   await tpltSteps.verifyImportTemplatePopupLoaded();
});

Then(/^the Import JSON as template button is disabled$/, async () => {
   await tpltSteps.verifyImportTemplatePopupSubmitEnabled(false);
});

Then(/^the Import JSON as template button is enabled$/, async () => {
   await tpltSteps.verifyImportTemplatePopupSubmitEnabled(true);
});

When(/^click header import template button$/, async () => {
   await tpltSteps.clickImportTemplateHeaderButton();
});

Then(/^click the import template paste button$/, async () => {
   await tpltSteps.clickImportTemplatePasteButton();
});

Then(/^the Import Template file upload area is present$/, async () => {
   await tpltSteps.verifyImportTemplateFileUpload(true);
});

Then(/^the Import Template file upload area is not present$/, async () => {
   await tpltSteps.verifyImportTemplateFileUpload(false);
});

Then(/^the Import Template paste JSON text area is present$/, async () => {
   await tpltSteps.verifyImportTemplatePasteJSON(true);
});

Then(/^the Import Template paste JSON text area is not present$/, async () => {
   await tpltSteps.verifyImportTemplatePasteJSON(false);
});

When(/^enter into the Impprt Template paste JSON text area:$/, async text => {
   await tpltSteps.enterTextImportTemplateJSON(text);
});

When(/^click the import template upload button$/, async () => {
   await tpltSteps.clickImportTemplateUploadButton();
});

When(/^upload the template file "(.*)"$/, async filePath => {
   await tpltSteps.uploadTemplateFile(filePath);
});

Then(/^there is a template card named "(.*)"$/, async name => {
   await tpltSteps.verifyTemplateCardVisibility(name);
});
