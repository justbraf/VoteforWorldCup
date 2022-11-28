import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.adminConsole.events({
	// 'click .js-teams': function () {
	// 	FlowRouter.go('teams.manager');
	// 	// FlowRouter.go('teams.manager', {userId:'45'});
	// },
	// 'click .js-matches': function () {
	// 	FlowRouter.go('matches.manager');
	// },
	'click .js-viewUsers': () => {
		FlowRouter.go('admin.users');
	},
	'click .js-viewVotes': () => {
		FlowRouter.go('admin.votes');
	},
	'click .js-viewRanks': () => {
		FlowRouter.go('admin.ranks');
	},
	'click .js-viewGoals': () => {
		FlowRouter.go('admin.goals');
	},
	// 'click .js-matchAvail': function () {
	// 	$('#matchAvailField').val(VFWCdb.findOne({}).matchesAvailable);
	// },
	// 'click .js-saveAvail': function () {
	// let settings_id = VFWCdb.findOne();
	// VFWCdb.update({ _id: "NHQRvLpuLqvobE8cg" }, { $set: { matchesAvailable: Number($('#matchAvailField').val()) } });
	// },
	'click .js-rankings': () => {
		systemRankings()
	},
	'dblclick .js-wipeRanks': () => {
		Meteor.call("wipeRanks")
	},
	'dblclick .js-wipePoints': () => {
		Meteor.call("wipePoints")
	}
});

Template.adminConsole.helpers({
	totalUsers: () => {
		Meteor.call("usersRegistered", (error, result) => {
			Session.set("numUsers", result)
		})
		return Session.get("numUsers")
	}
})

Template.admin2.events({
	'click .js-ma': () => {
		Meteor.call("user.makeAdmin")
	}
})

// function computes correct number of predictions made
checkCorrectPredictions = (uId) => {
	return votesdb.find({
		$and: [
			{ 'userID': uId },
			{ 'points': { $exists: true } }
		]
	}).count()
}

//function scores points for each prediction for all users
matchPoints = (mId) => {
	let prediPoints
	let teamGroups = "ABCDEFGH"
	let group = fixturesdb.findOne({ '_id': mId }).group;
	if (teamGroups.includes(group)) {
		prediPoints = 2;
	}
	// else if (mNum < 57) {
	// 	prediPoints = 3;
	// } else if (mNum < 61) {
	// 	prediPoints = 5;
	// } else if (mNum < 63) {
	// 	prediPoints = 8;
	// } else if (mNum < 64) {
	// 	prediPoints = 11;
	// } else if (mNum < 65) {
	// 	prediPoints = 14;
	// }
	return prediPoints;
}

systemRankings = () => {

	// Compute points for each vote
	let allVotes = votesdb.find({
		'points': { $exists: false }
	}).fetch()
	allVotes.forEach((vote) => {
		if (goalsdb.find({ matchID: vote.matchID }).count()) {
			let goals = goalsdb.find({ matchID: vote.matchID }).fetch()
			if (goals[0].score > goals[1].score) {
				if (goals[0].teamID == vote.teamID) {
					votesdb.update({
						'_id': vote._id
					}, {
						$set: { 'points': matchPoints(vote.matchID) }
					})
				}
			}
			else if (goals[0].score < goals[1].score) {
				if (goals[1].teamID == vote.teamID) {
					votesdb.update({
						'_id': vote._id
					}, {
						$set: { 'points': matchPoints(vote.matchID) }
					})
				}
			}
			else
				votesdb.update({
					'_id': vote._id
				}, {
					$set: { 'points': (matchPoints(vote.matchID) - 1) }
				})
		}
	})

	// Computes total points for each user that voted
	allVotes = votesdb.find({
		'points': { $exists: true }
	}, {
		fields: { userID: 1 }
	}).fetch()
	let uniqueVotes = []
	allVotes.forEach(elem => {
		uniqueVotes.push(elem.userID)
	})
	uniqueVotes = [...new Set(uniqueVotes)]
	uniqueVotes.forEach((voteId) => {
		let sumVotes = votesdb.find({
			$and: [
				{ 'points': { $exists: true } },
				{ userID: voteId }
			]
		}, {
			fields: { points: 1 }
		}).fetch()
		let total = 0
		sumVotes.forEach(sum => {
			total += sum.points
		})
		let userRank = ranksdb.findOne({ 'userID': voteId })
		if (!userRank) {
			ranksdb.insert({
				userID: voteId,
				totalPoints: total,
				predictions: checkCorrectPredictions(voteId)
			})
		}
		else {
			ranksdb.update(
				{ _id: userRank._id },
				{
					$set: {
						totalPoints: total,
						predictions: checkCorrectPredictions(voteId)
					}
				}
			)
		}
	})

	// Compute users' rank based on the total points and their correct predictions
	let rankPos = 0
	// , lastPoints = 1000, lastPredicts = 0;
	let results = ranksdb.find({}, { sort: { 'totalPoints': -1, 'predictions': -1 } }).fetch()
	results.forEach((ranking) => {
		// if (ranking.totalPoints > 0) {
		// if ((lastPoints > ranking.totalPoints) || (lastPredicts > ranking.predictions)) {
		rankPos++
		// lastPoints = ranking.totalPoints;
		// lastPredicts = ranking.predictions;
		// }
		ranksdb.update({ '_id': ranking._id }, { $set: { 'ranked': rankPos } })
		// }
	})
}