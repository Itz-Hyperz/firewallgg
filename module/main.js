const axios = require('axios');

const ban = (userId, userTag, databaseName, banReason, banProof) => {
    const fetch = await axios.post('https://firewall.hyperz.net/api/postban', {
        userId: userId,
        userTag: userTag,
        databaseName: databaseName,
        banReason: banReason,
        banProof: banProof
    })
    
    return fetch.data;
}
module.exports = async function(userId) {
    if(typeof userId == 'undefined') console.log('No userId was defined in FirewallGG NPM request.')
    let listFetch = await axios({
        method: 'get',
        url: `https://firewall.hyperz.net/api/checkuser/${userId}`
    });
    return listFetch.data;
}, {
    ban
}
