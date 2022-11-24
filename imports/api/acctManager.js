// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

Template.acctManager.helpers({
  displayName: () => {
    if (!Meteor.userId())
      return "not logged in"
    let userData = "Anonymous"
    let result = Meteor.user()
    if (result.profile && result.profile.name) {
      userData = result.profile.name
    }
    else if (result.username) {
      userData = result.username
    }
    else if (result.emails) {
      userData = result.emails[0].address
    }
    return userData
  }
})

Template.acctManager.events({
  'click .js-signOut': () => {
    Accounts.logout()
  }
})