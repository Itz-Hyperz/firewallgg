const axios = require('axios');
run("USER_ID_TO_PASS")
async function run(userId) {
    let check = await axios({
        method: 'get',
        url: `https://firewall.hyperz.net/api/checkuser/${userId}`
    });
    if(check?.data) {
        console.log(check.data);
        console.log(`This user has ${check.data.length} active bans.`)
    };
    return check?.data;
};
