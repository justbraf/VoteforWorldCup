import { Accounts } from 'meteor/accounts-base';
 
Accounts.ui.config({
	// passwordSignupFields: 'USERNAME_ONLY',
});

// ServiceConfiguration.configurations.remove({
// 	service: "facebook"
// });

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '1854362404634690',
    // secret: 'a1cba5e2c395babe75de58bf8a146e64'
    secret: '005952e8e231a93e6b04eb4c668d7a8f'
});

// if (ServiceConfiguration.configurations.find({service: 'facebook'}).count()===0) {
//   ServiceConfiguration.configurations.insert({
//     service: "facebook",
//     appId: "app-id-you-get-from-facebook",
//     secret: "app-secret-you-get-from-facebook"
//   });
// }

// // bonus: get some additional profile info from facebook and cache on the user document
// Accounts.onCreateUser(function(options,user) {
//   check(options, Object);
//   check(user, Object);

//   options.profile.email = user.services.facebook.email;
//   options.profile.facebookId = user.services.facebook.id;

//   user.profile = options.profile;

//   return user;
// });