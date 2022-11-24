import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check'
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
	// ranksdb.remove({ _id: "SQNQzm8MZ6gxvSBdp" })
	// votesdb.remove({ "_id": "s8ycD4AcAkDTCgCoW" })
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

	Meteor.publish('teams', function () {
		return teamsdb.find({});
	});

	Meteor.publish('fixtures', function () {
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
			fields: { username: 1, profile: 1, emails: 1 }
		});
	} else {
		this.ready();
	}
});

Meteor.methods({
	'user.makeAdmin'() {
		// check(uId, String)
		if (!this.userId) {
			throw new Meteor.Error("Not Authorized")
		}
		Meteor.users.update(
			{ _id: Meteor.userId() },
			{
				$set: {
					"profile.isAdmin": true
				}
			})
	},
	'usersRegistered'() {
		let numUsers = Meteor.users.find().count()
		if (numUsers > 0)
			return numUsers
		return "None"
	},
	'wipeRanks'() {
		let rankIds = ranksdb.find()
		rankIds.forEach(rId => {
			ranksdb.remove({ _id: rId._id })
		})
	},
	'wipePoints'() {
		let votes = votesdb.find()
		votes.forEach(vote => {
			votesdb.update(
				{ _id: vote._id },
				{
					$unset:
						{ points: 1 }
				})
		})
	},
	"delVote"(vId) {
		votesdb.remove({ _id: vId })
	}
})