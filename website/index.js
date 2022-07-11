// Basic Imports
const config = require("./config.js");
const express = require("express");
const app = express();
const chalk = require('chalk');
const axios = require('axios');
const firewallgg = require("firewallgg");

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
    let databases = request?.data;
    let partners = integs?.data;
    res.render('index.ejs', { loggedIn: req.isAuthenticated(), databases: databases, partners: partners });
});

app.get('/account', backend.checkAuth, async function(req, res) {
    let bannedList = await firewallgg(req.session.passport.user.id);
    res.render('account.ejs', { loggedIn: req.isAuthenticated(), user: req.session.passport.user, bannedList: bannedList });
});

app.get('/search/:userid', async function(req, res) {
    if(!req?.params?.userid) return res.redirect('/');
    let bannedList = await firewallgg(req.params.userid);
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
    res.set('Access-Control-Allow-Origin', '*');
    if(!req?.params?.userid) {
        let json_ = [];
        return res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
    } else {
        let json_ = await firewallgg(req.params.userid);
        res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
    };
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

// Rejection Handler
process.on('unhandledRejection', (err) => { 
    if(config.debugMode) console.log(chalk.red(err));
});
