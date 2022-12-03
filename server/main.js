import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check'
import '../lib/collections.js';
import '../imports/startup/accounts-external.js';
// import '../imports/startup/groups.js'
// import '../imports/startup/groupMatches.js'
// import '../imports/startup/groupMatchesWinners.js'

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
	// fixturesdb.update(
	// 	{ "_id": "FcF8GXqy2evbwg9eD" },
	// 	{
	// 		$set:
	// 			{ "teamTwo": 1 }
	// 	})

	// if (teamsdb.find().count() == 0) {
	// 	groups.forEach(team => {
	// 		teamInsert(team)
	// 	});
	// }
	// if (fixturesdb.find().count() == 0) {
	// 	groupMatches.forEach(fixture => {
	// 		fixturesInsert(fixture)
	// 	});
	// }
	// if (fixturesdb.find().count() <= 48) {
	// 	groupMatchesWinners.forEach(fixture => {
	// 		fixturesInsert(fixture)
	// 	});
	// }

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

	// Meteor.publish('VFWC', function () {
	// 	return VFWCdb.find({});
	// });
});

Meteor.publish('userData', function () {
	if (this.userId) {
		return Meteor.users.find({}, { //_id: this.userId
			fields: { username: 1, profile: 1, /*services: 1,*/ emails: 1 }
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
	// 'user.allData'() {
	// 	// check(uId, String)
	// 	if (!this.userId) {
	// 		throw new Meteor.Error("Not Authorized")
	// 	}
	// 	// console.info(Meteor.users.find().fetch())
	// 	return Meteor.users.find().fetch()
	// },
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
	},
	'calcTeamPoints'() {
		// How are FIFA World Cup points calculated ?
		// Each nation gets three points for a win, one point for a draw and zero points for a defeat.In the event of two or more teams end the group stage with the same points, then the authorities will look at the second rule, which is the goal difference.

		// if date less than dec 2nd
		// if (Date.now() < 1670036400000){}
		let teamGroups = "ABCDEFGH"
		let teams = teamsdb.find().fetch()
		if (!teams) {
			throw new Meteor.Error("Error Retrieving Data")
		}
		teams.forEach(team => {
			if (teamGroups.includes(team.grpName)) {
				let goalDiff = 0
				let goalsFor = 0
				let points = 0
				let goals = goalsdb.find({ teamID: team._id }).fetch()
				if (!goals) {
					throw new Meteor.Error("Error Retrieving Data")
				}
				goals.forEach(goal => {
					let opponentGoals = goalsdb.findOne({
						$and: [
							{ matchID: goal.matchID },
							{ teamID: { $ne: team._id } }
						]
					})
					goalsFor += goal.score
					let gd = goal.score - opponentGoals.score
					goalDiff += gd
					if (gd > 0)
						points += 3
					else if (gd == 0)
						points += 1
				})
				teamsdb.update(
					{ _id: team._id },
					{
						$set: {
							goalsFor: goalsFor,
							goalDiff: goalDiff,
							points: points
						}
					}
				)
			}
		})
	}
})