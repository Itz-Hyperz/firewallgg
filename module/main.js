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
        if(database.active) {
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
                if(data?.blacklistdata?.blacklisted) {
                    data.active = data?.blacklistdata?.blacklisted;
                    data.userid = data?.user?.id || data?.user;
                    data.reason = data?.blacklistdata?.reason || data?.public_reason;
                    data.time = data?.blacklistdata?.date;
                };
                if(data?.active) {
                    if(typeof data?.active == 'number') {
                        if(typeof data?.active != 'undefined') {
                            if(data?.active == 1) {
                                data.active = true;
                            } else {
                                data.active = false;
                            };
                        };
                    };
                    _json = {
                        "database": database.name,
                        "themeColor": themeColor,
                        "logoUrl": logoUrl,
                        "active": data?.active,
                        "userid": data?.userid || 'NA',
                        "reason": data?.reason || 'NA',
                        "proof": data?.proof || 'None provided...',
                        "time": data?.time || 'NA',
                        "otherData": database.otherData || {}
                    };
                };
            };
            if(typeof _json == 'object') {
                await bans.push(_json);
            };
            if(count >= databases.length) {
                check = true
            } else {
                check = false;
            };
        };
    };
    while(check == true) {
        return bans;
    };
};
