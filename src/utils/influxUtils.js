// TBD - leverage influxdbv2 REST API
const process = require('process');
const axios = require('axios');

const active_config = require(__basedir + '/bonitoo.conf.json').active;
const config = require(__basedir + '/bonitoo.conf.json')[active_config];
const defaultUser = require(__basedir + '/bonitoo.conf.json').default_user;

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

//TODO - create cell and view to attach to dashboard
const createDashboard = async(name, orgId) => {
    return await axios.post('/api/v2/dashboards', { name, orgId }).then(resp => {
        return resp.data;
    }).catch(err => {
        console.log('ERROR: ' + err);
        throw(err); // rethrow it to cucumber
    });
};

module.exports = { flush, config, defaultUser, setupUser, putUser, getUser, signIn, endSession, writeData, createDashboard };

//flush()
