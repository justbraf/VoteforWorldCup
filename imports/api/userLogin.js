import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
// import { Session } from 'meteor/session'

showLoginErrorMsg = (eMsg, selector) => {
	let errDiv = document.querySelector(".errDiv")
	if (errDiv)
		errDiv.remove()
	errDiv = document.createElement("div")
	errDiv.classList.add("mt-3", "errDiv")
	let errMsg = document.createElement("span")
	errMsg.innerHTML = eMsg//"Username / Password Incorrect"
	errDiv.appendChild(errMsg)
	let target = document.querySelector(selector).parentNode
	target.parentNode.insertBefore(errDiv, target)
}

Template.userLogin.events({
	'click .js-signIn': (e) => {
		e.preventDefault()
		let usern = document.querySelector("#username")
		let userp = document.querySelector("#password")
		usern.classList.remove("errorBox")
		userp.classList.remove("errorBox")
		if (!usern.value) {
			showLoginErrorMsg("Username cannot be empty", ".js-signIn")
			usern.classList.add("errorBox")
			return
		}
		if (!userp.value) {
			showLoginErrorMsg("Password cannot be empty", ".js-signIn")
			userp.classList.add("errorBox")
			return
		}
		Meteor.loginWithPassword(usern.value, userp.value, (err) => {
			if (err) {
				showLoginErrorMsg("Username / Password Incorrect", ".js-signIn")
			}
		});
	},
	'click .js-signUp': () => {
		// msg1 = 'New Here? <a href="" class="text-info js-signUp">Create an account</a>.'
		// msg2 = 'Already registered? <a href="" class="text-info js-signUp">Sign in</a>.'
		let errDiv = document.querySelector(".errDiv")
		if (errDiv)
			errDiv.remove()
		let BtnDiv = document.querySelector(".actionBtns")
		// Switch to register mode
		if (document.querySelector("#userMsg2").classList.contains("d-none")) {
			document.querySelector("#userMsg2").classList.remove("d-none")
			document.querySelector("#userMsg1").classList.add("d-none")
			let signInBtn = document.querySelector(".js-signIn")
			if (signInBtn)
				signInBtn.remove()
			//  Create register button
			let regBtn = document.createElement("button")
			regBtn.classList.add("btn", "btn-outline-info", "js-register")
			regBtn.innerHTML = "Register Now"
			BtnDiv.appendChild(regBtn)
			// Show confirm input dialog
			document.querySelector("#confirmPwd").classList.remove("d-none")
		}
		// Switch to sign in mode
		else {
			document.querySelector("#userMsg1").classList.remove("d-none")
			document.querySelector("#userMsg2").classList.add("d-none")
			let regBtn = document.querySelector(".js-register")
			if (regBtn) {
				regBtn.remove()
			}
			let signBtn = document.createElement("button")
			signBtn.classList.add("btn", "btn-outline-info", "js-signIn")
			signBtn.innerHTML = "Sign In"
			BtnDiv.appendChild(signBtn)
			// Hide confirm input dialog
			document.querySelector("#confirmPwd").classList.add("d-none")
		}
	},
	'click .js-register': (e) => {
		e.preventDefault()
		let usern = document.querySelector("#username")
		let userp = document.querySelector("#password")
		let userp2 = document.querySelector("#confirmPassword")
		usern.classList.remove("errorBox")
		userp.classList.remove("errorBox")
		userp2.classList.remove("errorBox")
		if (!usern.value) {
			showLoginErrorMsg("Username cannot be empty", ".js-register")
			usern.classList.add("errorBox")
			return
		}
		if (!userp.value) {
			showLoginErrorMsg("Password cannot be empty", ".js-register")
			userp.classList.add("errorBox")
			return
		}
		if (!userp2.value) {
			showLoginErrorMsg("Password cannot be empty", ".js-register")
			userp2.classList.add("errorBox")
			return
		}
		if (userp.value != userp2.value) {
			showLoginErrorMsg("Passwords do not match", ".js-register")
			userp.classList.add("errorBox")
			userp2.classList.add("errorBox")
			return
		}
		let emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let options
		if (usern.value.match(emailFormat))
			options = {
				email: usern.value,
				password: userp.value
			}
		else
			options = {
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