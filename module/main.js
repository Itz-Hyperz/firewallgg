const axios = require('axios');
let providedToken = undefined;

function setToken(token) {
    if(typeof token == 'undefined') return console.log('Please provide your API token in the setToken request function.');
    providedToken = token;
};

async function postBan(userId, userTag, databaseName, banReason, banProof) {
    if(typeof providedToken == 'undefined') return console.log('FirewallGG requires a token to post a ban, use .setToken("YOUR_API_TOKEN") before utilising postBan.');
    const fetch = await axios({
        method: 'POST',
        url: 'https://firewall.bosssoftware.net/api/postban',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'User-Agent': '*',
            'authorization': providedToken
        },
        data: {
            "userId": userId,
            "userTag": userTag,
            "databaseName": databaseName,
            "banReason": banReason,
            "banProof": banProof
        }
    });
    return fetch.data;
};

async function search(userId) {
    if(typeof userId == 'undefined') console.log('No userId was defined in FirewallGG NPM request.')
    let listFetch = await axios({
        method: 'get',
        url: `https://firewall.bosssoftware.net/api/checkuser/${userId}`
    });
    return listFetch.data;
};

module.exports = {
    setToken: setToken,
    postBan: postBan,
    search: search
}
