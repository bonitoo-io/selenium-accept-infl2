import { Then, When } from 'cucumber';

const templatesSteps = require(__srcdir + '/steps/settings/templatesSteps.js');

let tpltSteps = new templatesSteps(__wdriver);

Then(/^the templates are sorted as:$/, async templates => {
   await tpltSteps.verifyTemplateCardsSort(templates);
});
