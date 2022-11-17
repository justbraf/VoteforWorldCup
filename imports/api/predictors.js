// function computes correct number of predictions made
function checkCorrectPredictions(uId) {
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

systemRankings = function () {
	//function scores points for each prediction for all users
	function totalIt(mId) {
		let prediPoints = 0;
		let mNum = fixturesdb.findOne({ '_id': mId }).matchNum;
		if (mNum < 49) {
			prediPoints = prediPoints + 2;
		} else if (mNum < 57) {
			prediPoints = prediPoints + 3;
		} else if (mNum < 61) {
			prediPoints = prediPoints + 5;
		} else if (mNum < 63) {
			prediPoints = prediPoints + 8;
		} else if (mNum < 64) {
			prediPoints = prediPoints + 11;
		} else if (mNum < 65) {
			prediPoints = prediPoints + 14;
		}
		return prediPoints;
	}
	let lastUserId = "first";
	let allUsers = votesdb.find({}, { fields: { 'userID': 1 }, sort: { 'userID': 1 } });
	allUsers.forEach((oneUser) => {
		if (oneUser.userID != lastUserId) {
			lastUserId = oneUser.userID;
			let predictions = votesdb.find({ $and: [{ 'userID': oneUser.userID }, { 'points': { $exists: false } }] });
			predictions.forEach(function (preDocs) {
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
				results.forEach(function (myVotes) {
					myPoints = myPoints + (Number(myVotes.points) ? Number(myVotes.points) : 0);
				});
			}
			let userRankID = ranksdb.find({ 'userID': oneUser.userID });
			if (userRankID.count() < 1) {
				ranksdb.insert({ 'userID': oneUser.userID, 'totalPoints': myPoints, 'predictions': checkCorrectPredictions(oneUser.userID) });
				// console.log("insert rank",Meteor.userId());
			} else {
				ranksdb.update({ '_id': userRankID.fetch()[0]._id }, { $set: { 'totalPoints': myPoints, 'predictions': checkCorrectPredictions(oneUser.userID) } });
				// console.log("update rank",Meteor.userId());
			}
		}
	});

	// function ranks users based on the total points and their correct predictions
	let rankPos = 0, lastPoints = 1000, lastPredicts = 0;
	let results = ranksdb.find({}, { sort: { 'totalPoints': -1, 'predictions': -1 } });
	results.forEach((ranking) => {
		if ((lastPoints > ranking.totalPoints) || (lastPredicts > ranking.predictions)) {
			rankPos++;
			lastPoints = ranking.totalPoints;
			lastPredicts = ranking.predictions;
		}
		ranksdb.update({ '_id': ranking._id }, { $set: { 'ranked': rankPos } });
	});
}

Template.predictor.onRendered(function () {
	systemRankings();
});

Template.predictor.helpers({
	userPoints: function () {
		return ranksdb.findOne({ 'userID': Meteor.userId() }).totalPoints;
	},
	usersRank: function () {
		return ranksdb.find({ 'userID': Meteor.userId() }).fetch()[0].ranked;
	},
	predictionsCounted: function () {
		return votesdb.find({ 'userID': Meteor.userId() }).count();
	},
	predictionsCorrect: function () {
		return ranksdb.findOne({ 'userID': Meteor.userId() }).predictions;
	}
});