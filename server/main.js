import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	// code to run on server at startup
	
	import '../imports/startup/accounts-external.js';

	Meteor.publish('teams', function () {
		return teamsdb.find({

		// }, {
		//   fields: { secretInfo: 0 }
		});
	});
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { services: 1}
    });
  } else {
    this.ready();
  }
});