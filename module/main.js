const axios = require('axios');
module.exports = async function(userId) {
    let listFetch = await axios({
        method: 'get',
        url: `https://firewall.hyperz.net/api/checkuser/${userId}`
    });
    let bannedList = listFetch.data;
    return bannedList;
};
