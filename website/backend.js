const passport = require('passport');
const multer = require('multer');
const bodyParser = require('body-parser');
const session  = require('express-session');
const express = require("express");

async function init(app) {
    if (Number(process.version.slice(1).split(".")[0] < 16)) throw new Error(`Node.js v16 or higher is required, Discord.JS relies on this version, please update @ https://nodejs.org`);
    var multerStorage = multer.memoryStorage()
    app.use(multer({ storage: multerStorage }).any());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 31556952000},
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('public'));
    app.use('/assets', express.static(__dirname + 'public/assets'))
    app.set('views', './views');
    app.set('view engine', 'ejs');
};

async function checkAuth(req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/auth/discord");
    }
};

module.exports = {
    init: init,
    checkAuth: checkAuth
};