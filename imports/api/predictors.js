import { Template } from 'meteor/templating';

// function computes correct number of predictions made
checkCorrectPredictions = (uId) => {
	return votesdb.find({
		$and: [
			{ 'userID': uId },
			{ 'points': { $exists: true } }
		]
	}).count()
}

systemRankings = () => {
	console.debug("executing System Rankings")
	//function scores points for each prediction for all users
	totalIt = (mId) => {
		let prediPoints = 0;
		let group = fixturesdb.findOne({ '_id': mId }).group;
		if (group == "A" || group == "B") {
			prediPoints = prediPoints + 2;
		}
		// else if (mNum < 57) {
		// 	prediPoints = prediPoints + 3;
		// } else if (mNum < 61) {
		// 	prediPoints = prediPoints + 5;
		// } else if (mNum < 63) {
		// 	prediPoints = prediPoints + 8;
		// } else if (mNum < 64) {
		// 	prediPoints = prediPoints + 11;
		// } else if (mNum < 65) {
		// 	prediPoints = prediPoints + 14;
		// }
		return prediPoints;
	}

	// Compute points for each vote
	let allVotes = votesdb.find({
		'points': { $exists: false }
	})
	allVotes.forEach((vote) => {
		if (goalsdb.find({ matchID: vote.matchID }).count()) {
			let goals = goalsdb.find({ matchID: vote.matchID }).fetch()
			if (goals[0].score > goals[1].score) {
				if (goals[0].teamID == vote.teamID)
					votesdb.update({
						'_id': vote._id
					}, {
						$set: { 'points': totalIt(vote.matchID) }
					})
			}
			else if (goals[0].score < goals[1].score) {
				if (goals[1].teamID == vote.teamID)
					votesdb.update({
						'_id': vote._id
					}, {
						$set: { 'points': totalIt(vote.matchID) }
					})
			}
			else
				votesdb.update({
					'_id': vote._id
				}, {
					$set: { 'points': totalIt(vote.matchID) - 1 }
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
			'points': { $exists: true },
			userID: voteId
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
				});
		}
	});

	// Compute users' rank based on the total points and their correct predictions
	let rankPos = 0, lastPoints = 1000, lastPredicts = 0;
	let results = ranksdb.find({}, { sort: { 'totalPoints': -1, 'predictions': -1 } });
	results.forEach((ranking) => {
		if (ranking.totalPoints > 0) {
			if ((lastPoints > ranking.totalPoints) || (lastPredicts > ranking.predictions)) {
				rankPos++;
				lastPoints = ranking.totalPoints;
				lastPredicts = ranking.predictions;
			}
			ranksdb.update({ '_id': ranking._id }, { $set: { 'ranked': rankPos } });
		}
	})
}

Template.predictor.onRendered(function () {
	systemRankings();
});

Template.predictor.helpers({
	userPoints: function () {
		let result = ranksdb.findOne({ 'userID': Meteor.userId() })
		let totPoints = 0
		if (result)
			if (result.totalPoints)
				totPoints = result.totalPoints
		return totPoints
	},
	usersRank: function () {
		let result = ranksdb.find({ 'userID': Meteor.userId() }).fetch()[0]
		let rank = "?"
		if (result)
			if (result.ranked)
				rank = result.ranked
		return rank
	},
	superScript: () => {
		let result = ranksdb.find({ 'userID': Meteor.userId() })
		let rank = "?"
		if (result) {
			if (!result.fetch().ranked)
				return ""
			rank = result.fetch()[0].ranked.toString()
			if (rank.length > 1) {
				if (rank.charAt(rank.length - 2) == 1)
					return "TH"
				else {
					rank = rank.charAt(rank.length - 1)
					switch (rank) {
						case "3":
							rank = "RD"
							break
						case "2":
							rank = "ND"
							break
						case "1":
							rank = "ST"
							break
					}
				}
			}
			switch (rank) {
				case "3":
					rank = "RD"
					break
				case "2":
					rank = "ND"
					break
				case "1":
					rank = "ST"
					break
			}
			return rank
		}
		return ""
	},
	predictionsCounted: function () {
		return votesdb.find({ 'userID': Meteor.userId() }).count();
	},
	predictionsCorrect: function () {
		let result = ranksdb.findOne({ 'userID': Meteor.userId() })
		let preCorrect = 0
		if (result)
			if (result.predictions)
				preCorrect = result.predictions
		return preCorrect
	}
});