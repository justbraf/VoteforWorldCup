import { Accounts } from 'meteor/accounts-base';
 
Accounts.ui.config({
	// passwordSignupFields: 'USERNAME_ONLY',
});
 console.log(ServiceConfiguration.configurations.find({service: 'facebook'}).count());
if (ServiceConfiguration.configurations.find({service: 'facebook'}).count() === 0) {
		ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: '360794574436579',
		secret: '005952e8e231a93e6b04eb4c668d7a8f'
	});	
	console.log("let me insert");
} else {
	ServiceConfiguration.configurations.upsert({
			_id:ServiceConfiguration.configurations.findOne({service: "facebook"})['_id']
		}, {
		$set: {
			appId: '360794574436579',
			secret: '005952e8e231a93e6b04eb4c668d7a8f'
		}
	});
	console.log("found it to upsert");
}

	
// // bonus: get some additional profile info from facebook and cache on the user document
// Accounts.onCreateUser(function(options,user) {
//   check(options, Object);
//   check(user, Object);

//   options.profile.email = user.services.facebook.email;
//   options.profile.facebookId = user.services.facebook.id;

//   user.profile = options.profile;

//   return user;
// });