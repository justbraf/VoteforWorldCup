import { Template } from 'meteor/templating'

Template.viewUsers.helpers({
  users: () => {
    // 'click .js-allUserData': () => {
    // let theUsers = []
    // Meteor.call("user.allData", (err, result) => {
    //   if (err)
    //     console.error({ error: err.error })
    //   else {
    //     result.forEach(usr => {
    //       theUsers.push(usr)
    //     })
    //   }
    //   console.info({ userlist: theUsers })
    //   return theUsers
    // })
    // },
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
  correctPredictions: function () {
    return votesdb.find({
      $and: [
        { 'userID': this._id },
        { 'points': { $exists: true } }
      ]
    }).count()
  }
})