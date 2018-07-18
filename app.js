const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routers');
const cool = require('cool-ascii-faces');


const app = express();


app.set('view engine','ejs');


mongoose.connect(keys.mongodb.mongoURI, function() {
	console.log('database is connected');
});

app.use(cookieSession({
	maxAge : 24*60%60*1000,
	keys : [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', function(req, res) {
    res.render('home', {user: req.user});
})
app.get('/cool', function(req,res) {
    res.send(cool());
})



app.listen(5555, function(){

	console.log('server running on the port 5555');
});