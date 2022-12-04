const config = {
    bansBeforeBlock: 0, // How many bans a user can have before they get 
    createAuditLogs: true, // Create an audit log when a user gets banned via the Firewall
    logInConsole: false // Log in the terminal when a user gets banned via the Firewall
};

const axios = require('axios');
module.exports = async function(app, con, client, faxstore) {
    faxstore.on('createUserAccount', async function(user, service) {
        let request = await axios({
            method: 'get',
            url: `https://firewall.hyperz.net/api/checkuser/${user.userId}`
        }).catch(function(error) {
            return "failed";
        });
        if(!request?.data || request == "failed") return;
        if(request.data.length >= config.bansBeforeBlock) {
            let list = [];
            await request.data.forEach(ban => {
                list.push(`${ban.database}`)
            });
            if(config.createAuditLogs) {
                faxstore.emit('CreateAuditLog', user.userId, 'FirewallGG Ban', `User ${user.userId} is actively banned in: ${list.join(', ')}.`);
            };
            if(config.logInConsole) {
                console.log(`[FirewallGG] User ${user.userId} is actively banned in: ${list.join(', ')}.`);
            };
            con.query(`UPDATE users SET disabled=1, banned=1, staffnotes=staffnotes+" [FirewallGG] User ${user.userId} is actively banned in: ${list.join(', ')}." WHERE userId="${user.userId}"`, async function(err, row) {
                if(err) throw err;
            });
        };
    });
};
