// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

Template.acctManager.helpers({
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

Template.acctManager.events({
  'click .js-signOut': () => {
    Accounts.logout()
  }
})