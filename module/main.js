const axios = require('axios');
module.exports = async function(userId) {
    let bans = await code(userId)
    return bans;
};

async function code(userId) {
    let bans = [];
    let count = 0;
    let check;
    let databaseRequest = await axios({
        method: 'get',
        url: `https://raw.githubusercontent.com/Itz-Hyperz/firewallgg/main/databases.json`
    });
    let databases = databaseRequest.data;
    for(let database of databases) {
        count++
        if(!database.active) return;
        let themeColor = database.themeColor || '#FFFFFF';
        let logoUrl = database.logoUrl || 'https://firewall.gg/assets/logo.png';
        let request;
        try {
            request = await axios({
                method: database.method,
                url: `${database.requestUrl}${userId}`,
                headers: {
                    'Authorization': `Bearer r1O.CJZ9LVtLKEs2ocpZ0sR1C3436H`
                }
            });
        } catch(e) {
            if(e.toString().includes('Request failed')) {
                request = "failed";
            };
        };
        let _json = "STRING";
        if(request != "failed") {
            if(!request?.data) return;
            let data = request.data;
            if(Array.isArray(data)) {
                // Stronger Together Array Check
                data = await data.find(o => o.active == 1);
            };
            if(typeof data?.time != 'undefined') {
                let date = new Date(data.time*1000);
                if(!date.toString().toLowerCase().includes('invalid date')) {
                    data.time = Number(data.time);
                    date = new Date(data.time*1000);
                    if(typeof data.time == 'number') {
                        data.time = 'Unavailable.'
                    }
                };
            };
            if(data?.active || data?.blacklistdata?.blacklisted || data?.blacklistdata?.active) {
                if(typeof data?.active == 'number' || typeof data?.blacklistdata?.blacklisted == 'number' || typeof data?.blacklistdata?.active == 'number') {
                    if(typeof data?.active != 'undefined') {
                        data.active = await booleanConvert(data?.active) || data?.active;
                    };
                    if(typeof data?.blacklistdata?.blacklisted != 'undefined') {
                        data.blacklistdata.blacklisted = await booleanConvert(data?.blacklistdata?.blacklisted) || data?.blacklistdata?.blacklisted;
                    };
                    if(typeof data?.blacklistdata?.active != 'undefined') {
                        data.blacklistdata.active = await booleanConvert(data?.blacklistdata?.active) || data?.blacklistdata?.active;
                    };
                };
                _json = {
                    "database": database.name,
                    "themeColor": themeColor,
                    "logoUrl": logoUrl,
                    "active": data?.active || data?.blacklistdata?.blacklisted || data?.blacklistdata?.active,
                    "userid": data?.userid || data?.user?.id || data?.user || 'NA',
                    "reason": data?.reason || data?.blacklistdata?.reason || data?.public_reason || 'NA',
                    "proof": data?.proof || 'None provided...',
                    "time": data?.time || data?.blacklistdata?.date || 'NA',
                    "otherData": database.otherData || {}
                };
            };
        }
        if(typeof _json == 'object') {
            await bans.push(_json);
        };
        check = await lastActions(databases, count);
    };
    while(check == true) {
        return bans;
    };
};

async function lastActions(databases, count) {
    if(count >= databases.length) {
        return true;
    } else {
        return false;
    };
};

async function booleanConvert(number) {
    if(number == 1) {
        return true;
    } else {
        return false;
    };
};
