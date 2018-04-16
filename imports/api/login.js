Template.userLogin.helpers({
	noUser: function(){
		if (!Meteor.userId())
			return true;
		else
			return false;
	}
});

Template.userLogin.events({
	
});
// Template.login.events({
//     'click .login-facebook': function(e) {
//         e.preventDefault();

//         Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
//             if (err) {
//                 console.log('Handle errors here: ', err);
//             }
//         });
//     }
// });
// console.log("login js found");

// Template.userLogin.onRendered(function() {
// 	// $('login-sign-in-link').addClass('btn');
// 	$('#login-sign-in-link').addClass('btn-primary');
// 	console.log("classes added");
// });