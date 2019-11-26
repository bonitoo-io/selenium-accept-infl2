// TBD - leverage influxdbv2 REST API
const process = require('process');
const axios = require('axios');
const fs = require('fs');

const active_config = require(__basedir + '/bonitoo.conf.json').active;
const config = require(__basedir + '/bonitoo.conf.json')[active_config];
const defaultUser = require(__basedir + '/bonitoo.conf.json').default_user;

const mil2Nano = 1000000;

axios.defaults.baseURL = `${config.protocol}://${config.host}:${config.port}`;

global.__config = config;
global.__defaultUser = defaultUser;
global.__users = { 'init': undefined };

process.argv.slice(2).forEach((val) => {

    let pair = val.split('=');

    switch(pair[0]){
    case 'headless': //overrides value in config file
        config.headless = (pair[1] === 'true');
        console.log(config.headless ? 'running headless' : 'running headed');
        break;
    }

});

/* Uncomment to debug axios
axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})
*/

const flush = async () => {
    // console.log('calling flush')
    await axios.get('/debug/flush');
    delete global.__users;
    global.__users = { 'init': undefined };
};

// user { username: 'name', password: 'password', org; 'orgname', bucket: 'bucketname' }
const setupUser = async(user) => {
    await axios.post('/api/v2/setup', user).then(resp => {
        user.id = resp.data.user.id;
        user.orgid = resp.data.org.id;
        user.bucketid = resp.data.bucket.id;
        putUser(user);
        //console.log("DEBUG __users: " + JSON.stringify(__users, null, '\t'))
        //console.log("DEBUG resp " + JSON.stringify(resp.data, null, '\t'))
    });
};

// user { username: 'name', password: 'password', org; 'orgname', bucket: 'bucketname' }
const putUser = (user) => {
    if(!(user.username in __users)){
        __users[user.username] = user;
        return;
    }
    throw `${user.username} already defined in global users`;
};

const getUser = (name) => {

    if(name.toUpperCase() === 'DEFAULT'){
        return __users[__defaultUser.username];
    }

    if(name in __users){
        return __users[name];
    }
    throw `"${name}" is not a key in global users`;
};

const signIn = async (username) => {

    let user = getUser(username);
    return await axios.post('/api/v2/signin', '', {auth: {username: user.username, password: user.password}}).then(async resp => {
        //console.log("DEBUG Headers " + JSON.stringify(resp.headers))
        let cookie = resp.headers['set-cookie'][0];
        axios.defaults.headers.common['Cookie'] = cookie; //for axios
        //let pair = cookie.split('=')
        //let expiry = new Date(Date.now() + (24 * 60 * 60 * 1000));
        //await __wdriver.get(`${__config.protocol}://${__config.host}:${__config.port}/`)  //  not working even with valid session cookie redirected to login
        //await __wdriver.manage().addCookie({name: pair[0], value: pair[1], expiry: expiry, domain: __config.host}); //for selenium
        return cookie;
    }).catch(err => {
        console.log(err);
        throw(err); //need to rethrow error - otherwise cucumber will not catch it and test will be success
    });

};

const endSession = async() => {
    delete axios.defaults.headers.common['Cookie'];
};

let nowNano = new Date().getTime() * 1000000;

let intervalNano = 600 * 1000 * 1000000; //10 min in nanosecs

const writeData = async (org, //string
    bucket, //string
    lines = ['testmeas value=300 ' + (nowNano - (3 * intervalNano)),
        'testmeas value=200 ' + (nowNano - (2 * intervalNano)),
        'testmeas value=100 ' + (nowNano - intervalNano)],
    chunkSize = 100) => {

    let chunk = [];
    let chunkCt = 0;

    while(chunkCt < lines.length){
        chunk = ((chunkCt + chunkSize) <= lines.length) ?
            lines.slice(chunkCt, chunkCt + chunkSize - 1) :
            lines.slice(chunkCt, chunkCt + (lines.length % chunkSize));
        await axios.post('/api/v2/write?org=' + org + '&bucket=' + bucket, chunk.join('\n') ).then(() => {
            //  console.log(resp.status)
        }).catch( err => {
            console.log(err);
        });

        chunkCt += chunkSize;
        chunk = [];
    }

};

const query = async(orgID, //string
    query // string
) => {
    return await axios({method: 'post',
        url: '/api/v2/query?orgID=' + orgID,
        data: {'query': query} }).then(async response => {
        return response.data;
    }).catch(async err => {
        console.log('CAUGHT ERROR: ' + err);
    });


};

//Parse query result string to Array[Map()] of column items
const parseQueryResults = async(results) => {
    let resultsArr = results.split('\r\n,');

    let resultsMapArr = [];

    let resultsMapKeys = resultsArr[0].split(',');

    resultsMapKeys.shift(); //first element is empty string

    for(let i = 0; i < resultsArr.length; i++){
        if(i === 0){
            continue;
        }
        resultsMapArr[i-1] = new Map();
        let colVals = resultsArr[i].split(',');
        for(let j = 0; j < resultsMapKeys.length; j++){
            await resultsMapArr[i-1].set(resultsMapKeys[j], colVals[j]);
        }
    }

    return resultsMapArr;
};

//{"name":"ASDF","retentionRules":[],"orgID":"727d19908f30184f","organization":"qa"}
const createBucket = async(orgId, // String
    orgName, //String
    bucketName, //String
) => {
    //throw "createBuctket() not implemented";
    return await axios({
        method: 'post',
        url: '/api/v2/buckets',
        data: { 'name': bucketName, 'orgID': orgId, 'organization': orgName }
    }).then(async response => {
        return response.data;
    }).catch(async err => {
        console.log('influxUtils.createBucket - Error ' + err);
    });
};

//TODO - create cell and view to attach to dashboard
const createDashboard = async(name, orgId) => {
    return await axios.post('/api/v2/dashboards', { name, orgId }).then(resp => {
        return resp.data;
    }).catch(err => {
        console.log('ERROR: ' + err);
        throw(err); // rethrow it to cucumber
    });
};

// http://localhost:9999/api/v2/labels
// {"orgID":"8576cb897e0b4ce9","name":"MyLabel","properties":{"description":"","color":"#7CE490"}}
const createLabel = async(orgId,
    labelName,
    labelDescr,
    labelColor ) =>{

    return await axios({
        method: 'post',
        url: '/api/v2/labels',
        data: { 'orgId': orgId, 'name': labelName,
            'properties': { 'description': labelDescr, 'color': labelColor }}
    }).then(resp => {
        return resp.data;
    }).catch(err => {
        console.log('ERROR: ' + err);
        throw(err);
    });
};

const getDocTemplates = async(orgId) => {

    return await axios({
        method: 'get',
        url: `/api/v2/documents/templates?orgID=${orgId}`
    }).then(resp => {
        return resp.data;
    }).catch(err => {
        throw(err);
    });

};

const createTemplateFromFile = async(filepath, orgID) => {
    let content = await readFileToBuffer(process.cwd() + '/' + filepath);
    let newTemplate = JSON.parse(content);
    newTemplate.orgID = orgID;

    return await axios({
        method: 'POST',
        url: '/api/v2/documents/templates',
        data: newTemplate
    }).then(resp => {
        return resp.data;
    }).catch(err => {
        throw(err);
    })

};

const writeLineProtocolData = async (user, def) => {

    let define = JSON.parse(def);

    let dataPoints = [];
    let nowMillis = new Date().getTime();
    //line protocol i.e. myMeasurement,host=myHost testField="testData" 1556896326
    let intervals = await getIntervalMillis(define.points, define.start);
    let startMillis = nowMillis - intervals.full;

    let samples = await genPoints(define.algo, define.points);

    for(let i = 0; i < samples.length; i++){
        dataPoints.push(`${define.algo},test=generic ${define.measurement}=${samples[i]} ${(startMillis + (intervals.step * i)) * mil2Nano}\n`);
    }

    await writeData(user.org, user.bucket, dataPoints);
};

// sample def : { "points": 10, "measurement":"level", "start": "-60h", "algo": "hydro", "prec": "sec"}
const genLineProtocolFile = async(filePath, def) => {
    let define = JSON.parse(def);

    if(fs.existsSync(filePath)) {
        console.log('Removing pre-existing file ' + filePath);
        await fs.unlink(filePath, async err => {
            if (err) {
                console.log('Failed to remove file ' + filePath);
            }
        });
    }

    let dataPoints = [];
    let nowMillis = new Date().getTime();
    //line protocol i.e. myMeasurement,host=myHost testField="testData" 1556896326
    let intervals = await getIntervalMillis(define.points, define.start);
    let startMillis = nowMillis - intervals.full;

    let samples = await genPoints(define.algo, define.points);


    for(let i = 0; i < samples.length; i++){
        dataPoints.push(`${define.algo},test=generic ${define.measurement}=${samples[i]} ${startMillis + (intervals.step * i)}\n`);
    }

    await dataPoints.forEach(async point => {
        await fs.appendFile(filePath, point, err => {
            if(err){console.log('Error writing point ' + point + ' to file ' + filePath);}
        });
    });

};

const genPoints = async (algo, count) => {
    let samples = [];
    switch(algo.toLowerCase()){
    case 'fibonacci':
        samples = await genFibonacciValues(count);
        break;
    case 'hydro':
        samples = await genHydroValues(count);
        break;
    case 'sine':
        samples = await genSineValues(count);
        break;
    default:
        throw `Unhandled mode ${algo}`;
    }
    return samples;
};

// 'start' should have time format e.g. -2h, 30m, 1d
const getIntervalMillis = async(count, start) => {
    let time = start.slice(0, -1);
    let fullInterval  = 0;
    let pointInterval = 0;
    switch(start[start.length - 1]){
    case 'd': //days
        fullInterval = Math.abs(parseInt(time)) * 24 * 60000 * 60;
        break;
    case 'h': //hours
        fullInterval = Math.abs(parseInt(time)) * 60000 * 60;
        break;
    case 'm': //minutes
        fullInterval = Math.abs(parseInt(time)) * 60000;
        break;
    case 's': //seconds
        fullInterval = Math.abs(parseInt(time)) * 1000;
        break;
    default:
        throw new `unhandle time unit ${start}`;
    }

    pointInterval = fullInterval / count;
    return {full: fullInterval, step: pointInterval};
};

const genFibonacciValues = async (count) => {
    let result = [];
    for(let i = 0; i < count; i++){
        if(i === 0){
            result.push(1);
        }else if(i === 1){
            result.push(2);
        }else{
            result.push(result[i-1] + result[i-2]);
        }
    }
    return result;
};

const genHydroValues = async(count) => {
    let current = Math.floor(Math.random() * 400) + 100;
    let result = [];
    let trend = (Math.floor(Math.random() * 10) - 5);

    for(let i = 0; i < count; i++){
        current += (Math.floor(Math.random() * 10) + trend);
        result.push(current/100.0);
        if(current < trend){ //negative trend could lead to neg value so set new trend
            trend = Math.floor(Math.random() * 5);
        }else if(current > (500 - trend)){ // pushing ceiling set neg trend
            trend = Math.floor(Math.random() * -5);
        }
    }
    return result;
};

const genSineValues = async(count) => {
    let result = [];
    for(let i = 0; i < count; i++){
        result.push(Math.sin(i));
    }
    return result;
};

const readFileToBuffer = async function(filepath) {
    return await fs.readFileSync(filepath, 'utf-8'); //, async (err) => {
};

const removeFileIfExists = async function(filepath){
    if(fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
};

const fileExists = async function(filePath){
   return fs.existsSync(filePath);
};

const waitForFileToExist = async function(filePath, timeout = 10000){
  let sleepTime = 3000;
  let totalSleep = 0;
  while (totalSleep < timeout){
      if(fs.existsSync(filePath)){
          return true;
      }
      totalSleep += sleepTime;
  }

  throw `Timed out ${timeout}ms waiting for file ${filePath}`;

};

module.exports = { flush,
    config,
    defaultUser,
    setupUser,
    putUser,
    getUser,
    signIn,
    endSession,
    writeData,
    createDashboard,
    query,
    createBucket,
    parseQueryResults,
    createLabel,
    genLineProtocolFile,
    getIntervalMillis,
    getDocTemplates,
    genFibonacciValues,
    writeLineProtocolData,
    readFileToBuffer,
    createTemplateFromFile,
    removeFileIfExists,
    fileExists,
    waitForFileToExist
};

//flush()
