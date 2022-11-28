import { Template } from 'meteor/templating'

Template.viewUsers.helpers({
  users: () => {
    return Meteor.users.find()
  },
  email: function () {
    if (this.emails)
      return this.emails[0].address
  },
  name: function () {
    let userData = ""
    if (this.profile && this.profile.name) {
      userData = this.profile.name
    }
    return userData
  },
  correctPredictions:function(){
    return votesdb.find({
      $and: [
        { 'userID': this._id },
        { 'points': { $exists: true } }
      ]
    }).count()
  }
})