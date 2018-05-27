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
