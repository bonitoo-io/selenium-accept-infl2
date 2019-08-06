const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const tasksPage = require(__srcdir + '/pages/tasks/tasksPage.js');

class dashboardsSteps extends influxSteps {

    constructor(driver){
        super(driver);
        this.tasksPage = new tasksPage(driver);
    }

    async isLoaded(){
        await this.tasksPage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.tasksPage.getFilterTasks());
        this.assertVisible(await this.tasksPage.getCreateTaskDropdownHeader());
        this.assertVisible(await this.tasksPage.getInactiveToggle());
        this.assertVisible(await this.tasksPage.getNameSortButton());
        this.assertVisible(await this.tasksPage.getActiveSortButton());
        this.assertVisible(await this.tasksPage.getScheduleSortButton());
        this.assertVisible(await this.tasksPage.getLastCompetedSortButton());
        this.assertVisible(await this.tasksPage.getCreateTaskDropdownBody());
    }
}

module.exports = dashboardsSteps;
