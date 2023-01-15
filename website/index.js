// Basic Imports
const config = require("./config.js");
const express = require("express");
const app = express();
const fs = require('node:fs');
const chalk = require('chalk');
const axios = require('axios');
const firewallgg = require("firewallgg");
const Discord = require('discord.js');
const bansPushHook = new Discord.WebhookClient({ url: 'YOUR_WEBHOOK_URL' });

// Backend Initialization
const backend = require('./backend.js');
backend.init(app);

// Discord Login Passport
const passport = require('passport');
const DiscordStrategy = require('passport-discord-faxes').Strategy;
passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(obj, done) { done(null, obj) });
passport.use(new DiscordStrategy({
    clientID: config.discord.oauthId,
    clientSecret: config.discord.oauthToken,
    callbackURL: `${(config.domain.endsWith('/') ? config.domain.slice(0, -1) : config.domain)}/auth/discord/callback`,
    scope: ['identify', 'guilds', 'email'],
    prompt: 'consent'
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

// Routing
app.get('', async function(req, res) {
    let request = await axios({
        method: 'get',
        url: `https://raw.githubusercontent.com/Itz-Hyperz/firewallgg/main/databases.json`
    });
    let integs = await axios({
        method: 'get',
        url: 'https://raw.githubusercontent.com/Itz-Hyperz/firewallgg/main/partners.json'
    });
    let contribRequest = await axios({
        method: 'get',
        url: 'https://raw.githubusercontent.com/Itz-Hyperz/firewallgg/main/.all-contributorsrc'
    });
    let databases = request?.data;
    let partners = integs?.data;
    let contributors = contribRequest?.data?.contributors;
    res.render('index.ejs', { loggedIn: req.isAuthenticated(), databases: databases, partners: partners, contributors: contributors });
});

app.get('/account', backend.checkAuth, async function(req, res) {
    let bannedList = await firewallgg.search(req.session.passport.user.id);
    let parsed = await JSON.parse(fs.readFileSync('./apikeys.json'));
    let apiInfo = parsed.filter(a => a.userId == req.session.passport.user.id)[0];
    res.render('account.ejs', { loggedIn: req.isAuthenticated(), user: req.session.passport.user, bannedList: bannedList, apiInfo: apiInfo });
});

app.get('/bypass/request', backend.checkAuth, async function(req, res) {
    let check = await firewallgg.search(req.session.passport.user.id);
    if(!check[0]) return res.redirect('/account');
    let bypasses = fs.readFileSync('./bypassbans.json');
    let parsed = JSON.parse(bypasses);
    let checkBypass = await parsed.filter(x => x.userId == req.session.passport.user.id)[0]
    if(checkBypass) return res.redirect('/bypass/status')
    res.render('bypass.ejs', { loggedIn: req.isAuthenticated(), user: req.session.passport.user });
});

app.get('/bypass/status', backend.checkAuth, async function(req, res) {
    let bypasses = fs.readFileSync('./bypassbans.json');
    let parsed = JSON.parse(bypasses);
    let checkBypass = await parsed.filter(x => x.userId == req.session.passport.user.id)[0]
    if(!checkBypass) return res.redirect('/bypass/request')
    res.render('bypasssent.ejs', { loggedIn: req.isAuthenticated(), bypass: checkBypass });
});

app.get('/admin/bypass', backend.checkAuth, async function(req, res) {
    if(req.session.passport.user.id != '704094587836301392') return res.redirect('/404');
    let bypasses = fs.readFileSync('./bypassbans.json');
    let parsed = JSON.parse(bypasses);
    let a = parsed.filter(a => a.active == true);
    let b = parsed.filter(b => b.active == false);
    res.render('bypassrequests.ejs', { loggedIn: req.isAuthenticated(), active: a, inactive: b });
});

app.get('/search/:userid', async function(req, res) {
    if(!req?.params?.userid) return res.redirect('/');
    let bannedList = await firewallgg.search(req.params.userid);
    res.render('search.ejs', { loggedIn: req.isAuthenticated(), bannedList: bannedList, searchId: req.params.userid });
});

app.post('/backend/search', async function(req, res) {
    if(!req.body) return res.redirect('/');
    res.redirect(`/search/${req.body.userid}`)
})

app.get('/api', async function(req, res) {
    res.render('api.ejs', { loggedIn: req.isAuthenticated() });
});

app.get('/api/checkuser/:userid', async function(req, res) {
    if(!req?.params?.userid) {
        let json_ = [];
        return res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
    } else {
        try {
            let userId = req.params.userid;
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
                    let logoUrl = database.logoUrl || 'https://firewall.bosssoftware.net/assets/logo.png';
                    let appealLink = database.appealLink || '#';
                    let data = await makeRequest(database, userId);
                    let _json = "STRING";
                    if(data?.blacklistdata?.blacklisted) {
                        data.active = data?.blacklistdata?.blacklisted;
                        data.userid = data?.user?.id;
                        data.reason = data?.blacklistdata?.reason;
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
                            "appealLink": appealLink,
                            "active": data?.active,
                            "userid": data?.userid || 'NA',
                            "reason": data?.reason || 'NA',
                            "proof": data?.proof || 'None provided...',
                            "time": data?.time || 'NA',
                            "otherData": database.otherData || {}
                        };
                        bans.push(_json);
                    };
                };
                if(count >= databases.length) {
                    check = true
                } else {
                    check = false;
                };
            };
            while(check == true) {
                res.type('json').send(JSON.stringify(bans, null, 4) + '\n');
            };
        } catch(e) {}
    };
});

app.get('/api/checkusersimple/:userid', async function(req, res) {
	if(!req.params.userid) return res.type('json').send(JSON.stringify({ active: false }, null, 4) + '\n');
	let check = await firewallgg.search(req.params.userid)
	if(check[0]) {
		return res.type('json').send(JSON.stringify({ active: true }, null, 4) + '\n');
	} else {
		return res.type('json').send(JSON.stringify({ active: false }, null, 4) + '\n');
	};
});

app.get('/api/generatekey', backend.checkAuth, async function(req, res) {
    let parsed = await JSON.parse(fs.readFileSync('./apikeys.json'));
    let newKey = await backend.generateRandom(34);
    let check = parsed.filter(a => a.userId == req.session.passport.user.id)[0];
    let newArray = [];
    if(check) {
        if(check.banned) return res.send('This key is banned. Please contact Hyperz#0001');
        for(let item of parsed) {
            if(item.userId == req.session.passport.user.id) {
                newArray.push({
                    userId: req.session.passport.user.id,
                    token: newKey,
                    banned: false
                });
            } else {
                newArray.push(item);
            };
        };
        parsed = newArray;
    } else {
        parsed.push({
            userId: req.session.passport.user.id,
            token: newKey,
            banned: false
        });
    };
    let stringified = JSON.stringify(parsed, null, 4) + '\n';
    fs.writeFileSync('./apikeys.json', stringified);
    return res.redirect(`/account`);
});

app.get('/api/togglebankey/:userid', backend.checkAuth, async function(req, res) {
    if(req.session.passport.user.id != '704094587836301392') return res.send('You are not authorized to generate API keys!');
    if(!req?.params?.userid) return res.send('You did not provide a userId to ban!');
    let parsed = await JSON.parse(fs.readFileSync('./apikeys.json'));
    let check = parsed.filter(a => a.userId == req.params.userid)[0];
    let newArray = [];
    let toggledStatus = false;
    if(check) {
        let obj;
        if(check.banned) {
            obj = {
                userId: check.userId,
                token: check.token,
                banned: false
            };
        } else {
            toggledStatus = true;
            obj = {
                userId: check.userId,
                token: check.token,
                banned: true
            };
        };
        for(let item of parsed) {
            if(item.userId == req.params.userid) {
                newArray.push(obj);
            } else {
                newArray.push(item);
            };
        };
        parsed = newArray;
    } else {
        return res.send('That userId does not own an API key...');
    };
    let stringified = JSON.stringify(parsed, null, 4) + '\n';
    fs.writeFileSync('./apikeys.json', stringified);
    return res.send(`Key ban toggled for userId ${req.params.userid} to ${toggledStatus}`);
});

app.post('/api/postban', async function(req, res) {
    // Authorization
    if(!req?.headers?.authorization) return res.type('json').send(JSON.stringify({ status: 403, reason: "No authorization key provided in the request headers." }, null, 4) + '\n');
    let parsed = await JSON.parse(fs.readFileSync('./apikeys.json'));
    let check = parsed.filter(a => a.token == req?.headers?.authorization)[0];
    if(!check) return res.type('json').send(JSON.stringify({ status: 403, reason: "Invalid API Token sent in request / doesn't exist." }, null, 4) + '\n');
    if(check.banned) return res.type('json').send(JSON.stringify({ status: 403, reason: "Your API token has been banned." }, null, 4) + '\n');
    // Make sure JSON keys are all here
    if(!req?.body?.userId) return res.type('json').send(JSON.stringify({ status: 500, reason: "Missing userId in request body" }, null, 4) + '\n');
    if(!req.body.userTag) return res.type('json').send(JSON.stringify({ status: 500, reason: "Missing userTag in request body" }, null, 4) + '\n');
    if(!req.body.databaseName) return res.type('json').send(JSON.stringify({ status: 500, reason: "Missing databaseName in request body" }, null, 4) + '\n');
    if(!req.body.banReason) return res.type('json').send(JSON.stringify({ status: 500, reason: "Missing banReason in request body" }, null, 4) + '\n');
    if(!req.body.banProof) return res.type('json').send(JSON.stringify({ status: 500, reason: "Missing banProof in request body" }, null, 4) + '\n');
    if(!req.body.banProof.startsWith('http')) return res.type('json').send(JSON.stringify({ status: 500, reason: "banProof is not a link starting with http" }, null, 4) + '\n');
    // Message Builder
    let webhookEmbed = new Discord.MessageEmbed()
	.setTitle(`User Banned - ${req.body.databaseName}`)
    .setDescription(`**User:** [${req.body.userTag}](https://discord.com/users/${req.body.userId}) (${req.body.userId})\n**Database:** ${req.body.databaseName}\n**Reason:** ${req.body.banReason}`)
    .setColor('#5865F2')
    .setTimestamp()
    .setFooter({ text: req.body.databaseName })
    .setThumbnail(`${config.domain}/assets/logo.png`)
    try { webhookEmbed.setImage(req.body.banProof) } catch(e) {};
    // Sending the message (darkbot will handle crossposting the messages)
    await bansPushHook.send({
        embeds: [webhookEmbed],
    }).catch(e => { if(config.debugMode) console.log(e); });
    // Returning a successful response
    return res.type('json').send(JSON.stringify({ status: 201, reason: "SUCCESS" }, null, 4) + '\n');
});

app.post('/backend/sendrequest/bypass', backend.checkAuth, async function(req, res) {
    let bypasses = fs.readFileSync('./bypassbans.json');
    let parsed = JSON.parse(bypasses);
    let checkBypass = await parsed.filter(x => x.userId == req.session.passport.user.id)[0]
    if(checkBypass) return res.send(`You have already had a ban bypass request placed. Active?: ${checkBypass.active}`);
    let obj = {
        userId: req.session.passport.user.id,
        bandb: req.body.database,
        bandbreason: req.body.banreason,
        argument: req.body.args,
        active: false
    };
    parsed.push(obj);
    let conv = JSON.stringify(parsed, null, 4) + '\n';
    fs.writeFileSync('./bypassbans.json', conv);
    res.redirect('/bypass/status');
    // Message Builder
    let webhookEmbed = new Discord.MessageEmbed()
	.setTitle(`New Bypass Request`)
    .setDescription(`A user has just submitted a bypass request to the Firewall!\n\n**User Reference:** <@${req.session.passport.user.id}> (${req.session.passport.user.id})\n**Database Reference:** ${req.body.database}`)
    .setColor('#5865F2')
    .setTimestamp()
    .setThumbnail(`${config.domain}/assets/logo.png`)
    // Sending the message (darkbot will handle crossposting the messages)
    await bansPushHook.send({
        embeds: [webhookEmbed],
    }).catch(e => { if(config.debugMode) console.log(e); });
});

app.get('/backend/bypassupdate/:userid', backend.checkAuth, async function(req, res) {
    if(req.session.passport.user.id != '704094587836301392') return res.redirect('/404');
    let bypasses = fs.readFileSync('./bypassbans.json');
    let parsed = JSON.parse(bypasses);
    let checkBypass = await parsed.filter(x => x.userId == req.params.userid)[0]
    if(!checkBypass) return res.redirect(`/404`);
    let newArray = [];
    let embedTitle;
    for(let item of parsed) {
        if(item.userId == req.params.userid) {
            if(item.active) {
                item.active = false;
                embedTitle = "🔒  Bypass Revoked!";
                newArray.push(item);
            } else {
                item.active = true;
                embedTitle = "🔓  Bypass Granted!";
                newArray.push(item);
            };
        } else {
            newArray.push(item);
        };
    };
    let conv = JSON.stringify(newArray, null, 4) + '\n';
    fs.writeFileSync('./bypassbans.json', conv);
    res.redirect('/admin/bypass')
    // Message Builder
    let webhookEmbed = new Discord.MessageEmbed()
	.setTitle(embedTitle)
    .setDescription(`A bypass request was just updated!\n\n**User Reference:** <@${req.params.userid}> (${req.params.userid})\n**Database Reference:** ${checkBypass.bandb}`)
    .setColor('#5865F2')
    .setTimestamp()
    .setThumbnail(`${config.domain}/assets/logo.png`)
    // Sending the message (darkbot will handle crossposting the messages)
    await bansPushHook.send({
        embeds: [webhookEmbed],
    }).catch(e => { if(config.debugMode) console.log(e); });
});

app.get('/backend/deletebypass/:userid', backend.checkAuth, async function(req, res) {
    if(req.session.passport.user.id != '704094587836301392') return res.redirect('/404');
    let bypasses = fs.readFileSync('./bypassbans.json');
    let parsed = JSON.parse(bypasses);
    let checkBypass = await parsed.filter(x => x.userId == req.params.userid)[0]
    if(!checkBypass) return res.redirect(`/404`);
    let newArray = [];
    for(let item of parsed) {
        if(item.userId != req.params.userid) {
            newArray.push(item);
        };
    };
    let conv = JSON.stringify(newArray, null, 4) + '\n';
    fs.writeFileSync('./bypassbans.json', conv);
    res.redirect('/admin/bypass')
});

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {failureRedirect: '/'}), async function(req, res) {
    req.session?.loginRef ? res.redirect(req.session.loginRef) : res.redirect('/');
    delete req.session?.loginRef
});

app.get('/discord', function(req, res) {
    res.redirect('https://store.hyperz.net/discord')
});

// MAKE SURE THIS IS LAST FOR 404 PAGE REDIRECT
app.get('*', function(req, res){
    res.render('404.ejs');
});

// Server Initialization
app.listen(config.port)
console.log(chalk.blue('FirewallGG Started on Port ' + config.port));

// Functions
async function makeRequest(database, userId) {
    let bypasses = fs.readFileSync('./bypassbans.json');
    let parsed = JSON.parse(bypasses);
    if(parsed.filter(x => x.userId == userId && x.active == true)[0]) return {"active": false,"blacklistdata": {"blacklisted": false}};
    let request = await axios({
        method: database.method,
        url: `${database.requestUrl}${userId}`,
        timeout: 1000,
        headers: {
            'Authorization': `Bearer r1O.CJZ9LVtLKEs2ocpZ0sR1C3436H`,
            'sttauthorizaton': `k.8=ww8jz.:,Z2gQN27{=qYtr#BeLUtmH;,+hk6\-ke]\)>qrwKgD*y[4E:ZAdN[D[vnaQ@6];m}_#{#5t>-E'_^'}%vL.5u.5aJJj8?RPMh,~md;_32#{QA:{P}6?w3!gZY-K,kt"]fJ+yswcJ-t%[j6]!C5pf:}Z'ye$U&'>"#&*.M}}/&'DPA@XP$6TG*?Q'JHYr<Y9bGgSx%_:mgG$m(t;!Eg[&JX%x#J7TBKQ=&J,"t<8VmV6H.^*g5Zs"D`
        }
    }).catch(async function (error) {
        return "failed";
    });
    if(request == "failed") {
        return {
            "active": false,
            "blacklistdata": {
                "blacklisted": false
            }
        };
    } else {
        if(!request?.data) return;
        return request.data;
    };
};

// Rejection Handler
process.on('unhandledRejection', (err) => { 
    if(config.debugMode) console.log(chalk.red(err));
});
