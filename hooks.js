const fs = require('fs')
var {Before, BeforeAll, After, AfterAll, Status} = require('cucumber')

/*
Before(function (scenario, callback) {
    callback();
});


BeforeAll(async function (scenario, callback) {
    callback();
})
*/

function writeScreenShot(filename) {
    __wdriver.takeScreenshot().then(async (image, err) => {
        fs.writeFile(filename, image, 'base64', (err) => {
            if (err) {
                console.log(err)
            }
        })
    })
}

After(function (scenario ,  callback  ) {

    //__wdriver.sleep(1500) //DEBUG - getting shots out of order

    if(!fs.existsSync(`./${__config.screenshot_dir}`)){
        fs.mkdir(`./${__config.screenshot_dir}`, () => {})
    }

    let uri = scenario.sourceLocation.uri
    let feature = uri.substring(uri.lastIndexOf("/") + 1).replace('.','-')
    let name = scenario.pickle.name.trim().replace(' ', '_')
    let now = new Date()
    let nowStr = now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') + "-" +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0') +
        now.getSeconds().toString().padStart(2, '0')
    let filebase = __config.screenshot_dir + '/' + feature + "-" + nowStr + "-" + name


    if(scenario.result.status === Status.FAILED){
        writeScreenShot(filebase + "-ERR" + ".png")
    }else {
        writeScreenShot(filebase + "--OK" + ".png")
    }
    callback()

});

/*
AfterAll(function ( callback ) {

    callback();
});
*/


