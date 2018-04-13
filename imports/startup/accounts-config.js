import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
	// passwordSignupFields: 'USERNAME_ONLY',
});
	
// // bonus: get some additional profile info from facebook and cache on the user document
// Accounts.onCreateUser(function(options,user) {
// 	check(options, Object);
// 	check(user, Object);

// 	options.profile.email = user.services.facebook.email;
// 	options.profile.facebookId = user.services.facebook.id;

// 	user.profile = options.profile;

// 	return user;
// });