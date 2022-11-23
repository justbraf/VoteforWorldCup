import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
// import { Session } from 'meteor/session'

Template.userLogin.helpers({
	// 	noUser: function(){
	// 		if (!Meteor.userId())
	// 			return true;
	// 		else
	// 			return false;
	// 	},
	displayName: () => {
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
	'click .js-signIn': (e) => {
		e.preventDefault()
		let usern = document.querySelector("#username")
		let userp = document.querySelector("#password")
		Meteor.loginWithPassword(usern.value, userp.value, (err) => {
			if (err) {
				let errDiv = document.querySelector(".errDiv")
				if (errDiv)
					errDiv.remove()
				errDiv = document.createElement("div")
				errDiv.classList.add("mt-3", "errDiv")
				let errMsg = document.createElement("span")
				errMsg.innerHTML = "Username / Password Incorrect"
				errDiv.appendChild(errMsg)
				let target = document.querySelector(".js-signIn").parentNode
				target.parentNode.insertBefore(errDiv, target)
				usern.classList.add("errorBox")
				userp.classList.add("errorBox")
			}
		});
	},
	'click .js-register': (e) => {
		e.preventDefault()
		let usern = document.querySelector("#username")
		let userp = document.querySelector("#password")
		let options = { 
			username: usern.value,
			password: userp.value
		}
		Accounts.createUser(options, (err) => {
			if (err) {
				// let errDiv = document.querySelector(".errDiv")
				// if (errDiv)
				// 	errDiv.remove()
				// errDiv = document.createElement("div")
				// errDiv.classList.add("mt-3", "errDiv")
				// let errMsg = document.createElement("span")
				// errMsg.innerHTML = "Username / Password Incorrect"
				// errDiv.appendChild(errMsg)
				// let target = document.querySelector(".js-signIn").parentNode
				// target.parentNode.insertBefore(errDiv, target)
				// usern.classList.add("errorBox")
				// userp.classList.add("errorBox")
			}
		});
	},
	'click .js-GitHubSignIn': () => {
		Meteor.loginWithGithub({
			requestPermissions: ['user', 'public_repo']
		}, (error) => {
			if (error) {
				Session.set('errorMessage', error.reason || 'Unknown error');
			}
		})
	},
	'click .js-GoogleSignIn': () => {
		Meteor.loginWithGoogle({
			// requestPermissions: ['user', 'public_repo']
		}, (error) => {
			if (error) {
				Session.set('errorMessage', error.reason || 'Unknown error');
			}
		})
	}
	
	// 	'click #login-buttons-facebook': function(e) {
	// 		e.preventDefault();
	// 		Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
	// 				if (err) {
	// 						return;
	// 				}
	// 				// else {
	// 				// 	return FlowRouter.go('welcome');
	// 				// }
	// 		});
	// 	}
})