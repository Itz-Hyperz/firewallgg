/*
    This file will allow you to post your bans to a channel in the Hyperz Development Discord! Simply execute this post request every time you add a ban to your database.
*/

const axios = require('axios');
run();

async function run() {
    let request = await axios({
        method: 'post',
        url: 'https://firewall.hyperz.net/api/postban',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'User-Agent': '*',
            'authorization': 'YOUR_API_TOKEN'
        },
        data: {
            "userId": "386421496463097857",
            "userTag": "exyjs#0000",
            "databaseName": "HD | Blacklists",
            "banReason": "Claiming other developers work as his. Ripping websites.",
            "banProof": "https://cdn.hyperz.net/u/main/rWgEErY.png"
        }
    })
    console.log(request.data)
};
