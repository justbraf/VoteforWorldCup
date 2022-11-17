import { Meteor } from 'meteor/meteor';
import '../lib/collections.js';
import '../imports/startup/accounts-external.js';
import '../imports/startup/groups.js'
import '../imports/startup/groupMatches.js'

let teamInsert = (args) => {
	teamsdb.insert(args);
}

let fixturesInsert = (args) => {
	fixturesdb.insert(args);
}

Meteor.startup(() => {
	// inject data if db is new
	if (teamsdb.find().count() == 0) {
		groups.forEach(team => {
			teamInsert(team)
		});
	}
	if (fixturesdb.find().count() == 0) {
		groupMatches.forEach(fixture => {
			fixturesInsert(fixture)
		});
	}
	// console.log("Fixtures Found", fixturesdb.find().count())

	Meteor.publish('teams', function () {
		return teamsdb.find({});
	});

	Meteor.publish('matches', function () {
		return fixturesdb.find({});
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
			fields: { services: 1, "profile.name": 1 }
		});
	} else {
		this.ready();
	}
});