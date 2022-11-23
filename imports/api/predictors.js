import { Template } from 'meteor/templating';

// function computes correct number of predictions made
checkCorrectPredictions = (uId) => {
	let predCorrect = 0;
	let results = votesdb.find({ $and: [{ 'userID': uId }, { 'points': { $exists: true } }] });
	results.forEach((preds) => {
		let goalCheck = goalsdb.find({ 'matchID': preds.matchID });
		if (goalCheck.fetch()[0].score != goalCheck.fetch()[1].score) {
			predCorrect++;
		}
	});
	return predCorrect;
}

systemRankings = () => {
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

	let lastUserId = "first";
	let allUsers = votesdb.find({}, { fields: { 'userID': 1 }, sort: { 'userID': 1 } });
	allUsers.forEach((oneUser) => {
		if (oneUser.userID != lastUserId) {
			lastUserId = oneUser.userID;
			let predictions = votesdb.find({ $and: [{ 'userID': oneUser.userID }, { 'points': { $exists: false } }] });
			predictions.forEach((preDocs) => {
				let goals = goalsdb.find({ 'matchID': preDocs.matchID });
				if (goals.count() > 1) {
					if (goals.fetch()[0].score == goals.fetch()[1].score) {
						if ((preDocs.teamID == goals.fetch()[0].teamID) || (preDocs.teamID == goals.fetch()[1].teamID)) {
							votesdb.update({ '_id': preDocs._id }, { $set: { 'points': (totalIt(preDocs.matchID) - 1) } });
						}
					} else if (goals.fetch()[0].score > goals.fetch()[1].score) {
						if (preDocs.teamID == goals.fetch()[0].teamID) {
							votesdb.update({ '_id': preDocs._id }, { $set: { 'points': totalIt(preDocs.matchID) } });
						}
					} else {
						if (preDocs.teamID == goals.fetch()[1].teamID) {
							votesdb.update({ '_id': preDocs._id }, { $set: { 'points': totalIt(preDocs.matchID) } });
						}
					}
				}
			});
		}
	});

	//function computes total points for each user that voted
	// let 
	lastUserId = "first";
	// let 
	allUsers = votesdb.find({}, { fields: { 'userID': 1 }, sort: { 'userID': 1 } });
	allUsers.forEach((oneUser) => {
		if (oneUser.userID != lastUserId) {
			lastUserId = oneUser.userID;
			let myPoints = 0;
			let results = votesdb.find({ $and: [{ 'userID': oneUser.userID }, { 'points': { $exists: true } }] });
			if (results.count() > 0) {
				results.forEach((myVotes) => {
					myPoints = myPoints + (Number(myVotes.points) ? Number(myVotes.points) : 0);
				});
			}
			let userRankID = ranksdb.find({ 'userID': oneUser.userID });
			if (userRankID.count() < 1) {
				ranksdb.insert({ 'userID': oneUser.userID, 'totalPoints': myPoints, 'predictions': checkCorrectPredictions(oneUser.userID) });
			} else {
				ranksdb.update({ '_id': userRankID.fetch()[0]._id }, { $set: { 'totalPoints': myPoints, 'predictions': checkCorrectPredictions(oneUser.userID) } });
			}
		}
	});

	// function ranks users based on the total points and their correct predictions
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
	});
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