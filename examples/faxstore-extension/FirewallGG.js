const config = {
    bansBeforeBlock: 1, // How many bans a user can have before they get banned (minimum value is 1)
    logInConsole: true, // Log in the terminal when a user gets banned via the Firewall
    bypassUserIds: ["YOUR_USER_ID"] // A list of User IDs that you wish to bypass the firewall
};

const axios = require('axios');
module.exports = async function(app, con, client, faxstore) {
    faxstore.on('login', async function(userObject, DbUserResults) {
        if(config.bypassUserIds.includes(DbUserResults.userId)) return;
        let request = await axios({
            method: 'get',
            url: `https://firewall.hyperz.net/api/checkuser/${DbUserResults.userId}`
        }).catch(function(error) {
            return "failed";
        });
        if(!request?.data || request == "failed") return;
        if(request.data.length >= config.bansBeforeBlock) {
            let list = [];
            await request.data.forEach(ban => {
                list.push(`${ban.database}`)
            });
            if(config.logInConsole) console.log(`[FirewallGG] User ${DbUserResults.userId} is actively banned in: ${list.join(', ')}.`);
            con.query(`UPDATE users SET disabled=1, banned=1 WHERE userId="${DbUserResults.userId}"`, async function(err, row) {
                if(err) throw err;
            });
            if(DbUserResults.staffnotes == null || DbUserResults.staffnotes.toLowerCase().includes('[firewallgg]')) return;
            con.query(`UPDATE users SET staffnotes="${DbUserResults.staffnotes}\n[FirewallGG] User ${DbUserResults.userId} is actively banned in: ${list.join(', ')}." WHERE userId="${DbUserResults.userId}"`, async function(err, row) {
                if(err) throw err;
            });
        };
    });
};
