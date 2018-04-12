import { Accounts } from 'meteor/accounts-base';

Meteor.call('isEverythingReady',
    function(error, result) {
      if (error === undefined) {
      	alert("test srv");
      	alert(ServiceConfiguration.configurations.findOne({service: "facebook"})['_id']);
				alert(ServiceConfiguration.configurations.findOne({service: "google"})['_id']);
        // Meteor.subscribe("mystuff");
        // Session.set("sess1", "whatever");
      } else {
        alert("There was an error during startup.");
      }
    });

if (Meteor.isServer) {
  Meteor.methods({
    isEverythingReady: function() {
      // can you connect to database?
      return true;
    }
  });
}



Accounts.ui.config({
	// passwordSignupFields: 'USERNAME_ONLY',
});
// Doesn't count records correctly for some reason so the if statement malfunctions
//  console.log(ServiceConfiguration.configurations.find({service: 'facebook'}).count());
// if (ServiceConfiguration.configurations.find({service: 'facebook'}).count() === 0) {
//    ServiceConfiguration.configurations.insert({
//    service: 'facebook',
//    appId: '360794574436579',
//    secret: '005952e8e231a93e6b04eb4c668d7a8f'
//  }); 
//  console.log("let me insert");
// } else {
	ServiceConfiguration.configurations.upsert({
		"_id":ServiceConfiguration.configurations.findOne({service: "facebook"})['_id']
		}, {
		$set: {
			appId: '360794574436579',
			secret: '005952e8e231a93e6b04eb4c668d7a8f'
		}
	});
//  console.log("found it to upsert");
// }

ServiceConfiguration.configurations.upsert({
	_id:ServiceConfiguration.configurations.findOne({service: "google"})['_id']
		}, {
		$set: {
			service: "google",
			clientId: "365846407960-th0j8enbhg6t4s1f7k8mkam0opav7h1t.apps.googleusercontent.com",
			secret: "kewMc9b7JUOdd9k1wGpczmRR"
		}
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