const axios = require('axios');
module.exports = async function(userId) {
    if(typeof userId == 'undefined') console.log('No userId was defined in FirewallGG NPM request.')
    let listFetch = await axios({
        method: 'get',
        url: `https://firewall.hyperz.net/api/checkuser/${userId}`
    });
    return listFetch.data;
};
