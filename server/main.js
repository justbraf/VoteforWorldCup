import { Meteor } from 'meteor/meteor';
import '../lib/collections.js';
import '../imports/startup/accounts-external.js';

Meteor.startup(() => {
	// code to run on server at startup	

	Meteor.publish('teams', function () {
		return teamsdb.find({});
	});

	Meteor.publish('matches', function () {
		return matchesdb.find({});
	});

	Meteor.publish('ranks', function () {
		return ranksdb.find({});
	});

	Meteor.publish('votes', function () {
		return votesdb.find({});
	});

	Meteor.publish('goals', function () {
		return goalsdb.find({});
	});

	Meteor.publish('VFWC', function () {
		return VFWCdb.find({});
	});
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({}, { //_id: this.userId
      fields: { services: 1, "profile.name": 1}
    });
  } else {
    this.ready();
  }
});