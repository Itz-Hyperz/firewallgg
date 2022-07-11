// This example was made for Node.JS

/*
    JSON KEYS MUST STAY THE SAME AS BELOW
*/

const con = MySQL_Database;
const express = require("express");
const app = express()
app.listen(client.config.port || 3000)
app.get('/firewallgg/checkuser/:userid', async function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if(!req?.params?.userid) return res.redirect('/');
    req.params.userid == req.params.userid.replaceAll('`', '').replaceAll('"', '');
    await con.query(`SELECT * FROM bans WHERE userid="${req?.params?.userid}" AND active="true"`, async (err, row) => {
        if(err) throw err;
        if(!row[0]) {
            // If the user is not banned
            let json_ = {
                "active": false, // This means that the user is not banned
            }
            return res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
        } else {
            // If the user is banned
            let json_ = {
                "active": true,
                "userid": row[0].userid,
                "reason": row[0].reason,
                "proof": row[0].proof || 'None provided...',
                "time": row[0].timeofban
            }
            return res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
        };
    });
});
