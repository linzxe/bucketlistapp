var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

//create local strategy
//usernameField: 'email'
var localOptions = { usernameField: 'email'};
var localLogin = new LocalStrategy(localOptions, function(email, password, done){

	User.findOne({email:email}, function(err, user){
			//if there's an error in the search, return early with error object
		if(err) {return done(err)};
			//not an error, just user not found 
		if(!user) {return done(null, false); }

		//compare passwords, is 'password' equal to user. password?
		//compare pw from req with users saved pw
		user.comparePassword(password, function(err, isMatch){
			//if there was an error, return early.
			if (err) {return done(err); }
			//if its not the same, it will return false and say they didnt match up.
			if (!isMatch) {return done(null, false); }

			//if same, it will call passport callback with user model
			return done(null, user);
		});
		//tricky part: we salted the password and ew need to somehow decode encryted pw to normal pw.


	});
	//otherwise call done with false
});

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};
//create jwt strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	User.findById(payload.sub, function(err, user){
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);