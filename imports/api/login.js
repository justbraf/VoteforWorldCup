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
		else {
			// if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
	 //      var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');

	 //      console.log(result.data.first_name);
	 //      console.log(result.data.last_name);
	 //      console.log(result.data.birthday);
	 //      console.log(result.data.email);
	 //      console.log(result.data.gender);
	 //      console.log(result.data.location);
	 //      console.log(result.data.link);
	 //      console.log(result.data.friends);
			// }
			return Meteor.user().services.facebook.email;
		}
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