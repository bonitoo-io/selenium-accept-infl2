const fs = require('fs')
var {Before, BeforeAll, After, AfterAll, Status} = require('cucumber')

/*
Before(function (scenario, callback) {
    callback();
});

BeforeAll(async function (scenario, callback) {
//    await __wdriver.get('chrome://settings/clearBrowserData').then(async () => {
//        console.log("DEBUG clearing browser cache");
//        await __wdriver.sleep(3000);
//        await __wdriver.switchTo().activeElement();
////    await __wdriver.findElement(By.css("* /deep/ #clearBrowsingDataConfirm")).click();
//        await __wdriver.findElement(By.css("clearBrowsingDataConfirm")).click();
//        await __wdriver.sleep(3000);
//    }).catch(async err => {
//        console.log("DEBUG caught err " + err);
//        throw err;
//    });
    callback();
})*/


async function writeScreenShot(filename) {
    return await __wdriver.takeScreenshot().then(async (image, err) => {

        await fs.writeFile(filename, image, 'base64', (err) => {
            if (err) {
                console.log(err)
            }
        })

        return image
    })
}

let scenarioCt = 0;
let currentFeature = '';

After(async function (scenario /*,   callback */) {

    //__wdriver.sleep(1500) //DEBUG - getting shots out of order
// Handled in cucumber.js
  //  if(!fs.existsSync(`./${__config.screenshot_dir}`)){
  //      fs.mkdir(`./${__config.screenshot_dir}`, () => {})
  //  }

    let uri = scenario.sourceLocation.uri
    let feature = uri.substring(uri.lastIndexOf("/") + 1).replace('.','-')
    let name = scenario.pickle.name.trim().replace(' ', '_')

    if(feature !== currentFeature){
        scenarioCt = 0;
    }

    if(scenarioCt === 0){
        currentFeature = feature;
    }
 //   let now = new Date()
 //   let nowStr = now.getFullYear().toString() +
 //       (now.getMonth() + 1).toString().padStart(2, '0') +
 //       now.getDate().toString().padStart(2, '0') + "-" +
 //       now.getHours().toString().padStart(2, '0') +
 //       now.getMinutes().toString().padStart(2, '0') +
 //       now.getSeconds().toString().padStart(2, '0')
    //let filebase = __config.screenshot_dir + '/' + feature + "-" + nowStr + "-" + name
    let filebase = __screenShotDir + "/" +  feature + "-" + (scenarioCt++).toString().padStart(2, '0') + "-" + name;
    let world = this;

    if(scenario.result.status === Status.FAILED){
            await writeScreenShot(filebase + "-ERR" + ".png").then(async img => {
                await world.attach(img, 'image/png')
            })
    }else {
            await writeScreenShot(filebase + "--OK" + ".png").then(async img => {
                await world.attach(img, 'image/png')
            })
    }
    //callback()

});


/*
AfterAll(async function ( ) {


});
*/


