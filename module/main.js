const axios = require('axios');
module.exports = async function(userId) {
    let bans = [];
    const databaseRequest = await axios({
        method: 'get',
        url: `https://raw.githubusercontent.com/Itz-Hyperz/firewallgg/main/databases.json`
    });
    const databases = databaseRequest.data;
    await databases.forEach(async function(database){
        let request = await axios({
            method: database.method,
            url: `${database.requestUrl}${userId}`
        });
        if(!request?.data) return;
        let values = request.data;
        if(values?.active || values?.banned) {
            let _json = {
                "database": database?.name,
                "active": values?.active,
                "userid": values?.userid,
                "reason": values?.reason,
                "proof": values?.proof,
                "time": values?.time
            };
            await bans.push(_json);
        };
    });
    return bans;
};