const passport = require('passport');
const keys     = require('./keys');
const User = require('../models/user-model');

const GoogleStrategy = require('passport-google-oauth20');

// ma hoa thong tin
passport.serializeUser((user,done) => {
	done(null, user.id);
})

// giai ma thong tin

passport.deserializeUser(function(id,done) {
	User.findById(id).then(function(user){
		done(null, user);
	})
})


passport.use(
   
     new GoogleStrategy({
         callbackURL: '/auth/google/redirect',
         clientID: keys.google.clientID,
         clientSecret : keys.google.clientSecret
     }, function (accessToken, refreshToken, profile , done) {
     	// body...
     	console.log(profile);
     	console.log('passport call back function here');


        User.findOne({googleId : profile.id}).then(function(currentUser){
        	if (currentUser) {
        		console.log('User is: ', currentUser);
        		done(null, currentUser);
        	} else {
        		new User({
        			  username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.image.url,
        		}).save().then(function(newUser){

        			console.log('New User created !' + newUser);
        			done(null, newUser);
        		});

        	}
        });
           

     })
	)