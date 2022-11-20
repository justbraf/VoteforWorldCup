Template.userLogin.helpers({
	// 	noUser: function(){
	// 		if (!Meteor.userId())
	// 			return true;
	// 		else
	// 			return false;
	// 	},
	username: () => {
		if (!Meteor.userId())
			return "not logged in"
		let userData
		if (Meteor.user().profile)
			if (Meteor.user().profile.name)
				userData = Meteor.user().profile.name
		if (!userData)
			userData = Meteor.user().emails[0].address
		if (!userData)
			userData = "Anonymous"
		return userData
	}
})

Template.userLogin.events({
	'click .js-signOut': () => {
		teamsdb.insert({
			grpName: "A",
			groupId: 2,
			team: "Ecuador"
		});
		teamsdb.insert({
			grpName: "A",
			groupId: 4,
			team: "Netherlands"
		});
		Accounts.logout()
	}
	// 	'click #login-buttons-facebook': function(e) {
	// 		e.preventDefault();
	// 		// console.log('attempting login');
	// 		Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
	// 				if (err) {
	// 						console.log('Handle errors here: ', err);
	// 						return;
	// 				}
	// 				// else {
	// 				// 	// console.log('redirect to Welcome');
	// 				// 	return Router.go('welcome');
	// 				// }
	// 		});
	// 	}
})

// Template.login.events({
// 		'click .login-facebook': function(e) {
// 				e.preventDefault();

// 				Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
// 						if (err) {
// 								console.log('Handle errors here: ', err);
// 						}
// 				});
// 		}
// });
// console.log("login js found");

// Template.userLogin.onRendered(function() {
// 	// $('login-sign-in-link').addClass('btn');
// 	$('#login-sign-in-link').addClass('btn-primary');
// 	console.log("classes added");
// });