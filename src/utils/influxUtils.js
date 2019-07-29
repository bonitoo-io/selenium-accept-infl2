// TBD - leverage influxdbv2 REST API
const axios = require('axios');

const active_config = require(__basedir + '/bonitoo.conf.json').active;
const config = require(__basedir + '/bonitoo.conf.json')[active_config];
const defaultUser = require(__basedir + '/bonitoo.conf.json').default_user;

axios.defaults.baseURL = `${config.protocol}://${config.host}:${config.port}`;

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
};

// user { username: 'name', password: 'password', org; 'orgname', bucket: 'bucketname' }
const setupUser = async(user) => {
    await axios.post('/api/v2/setup', user).then(resp => {
        user.id = resp.data.user.id;
        user.orgid = resp.data.org.id;
        user.bucketid = resp.data.bucket.id;
        putUser(user);
        //        console.log("DEBUG __users: " + JSON.stringify(__users, null, '\t'))
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
    throw `${name} is not a key in global users`;
};

module.exports = { flush, config, defaultUser, setupUser, putUser, getUser };

//flush()
