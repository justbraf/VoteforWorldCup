Template.userLogin.helpers({
	noUser: function(){
		if (!Meteor.userId())
			return true;
		else
			return false;
	},
	usersname: function(){
		if (!Meteor.userId())
			return "not logged in";
		else
			return Meteor.user().emails[0].address;
	}
});

Template.userLogin.events({
	'click #login-buttons-facebook': function(e) {
		e.preventDefault();
		console.log('attempting login');
		Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
				if (err) {
						console.log('Handle errors here: ', err);
				}
				else {
					console.log('redirect to Welcome');
					Router.go('welcome');
				}
		});
	}
});

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