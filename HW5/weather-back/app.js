const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/user');
const weatherRoutes = require('./routes/weatherInfo')
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/weather',weatherRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
