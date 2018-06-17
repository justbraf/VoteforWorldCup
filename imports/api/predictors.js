Template.predictor.onRendered(function(){			
	function totalIt(mId){
		var prediPoints = 0;
		var mNum = matchesdb.findOne({'_id': mId}).matchNum;
		if (mNum < 49){
			prediPoints = prediPoints + 2;
		} else if (mNum < 57){
			prediPoints = prediPoints + 3;
		} else if (mNum < 61){
			prediPoints = prediPoints + 5;
		} else if (mNum < 63){
			prediPoints = prediPoints + 8;
		} else if (mNum < 64){
			prediPoints = prediPoints + 11;
		} else if (mNum < 65){
			prediPoints = prediPoints + 14;
		}
		return prediPoints;
	}
	var lastUserId = "first";
	var allUsers = votesdb.find({}, {fields: {'userID':1}, sort: {'userID':1}});
	allUsers.forEach((oneUser)=>{
		if (oneUser.userID != lastUserId){
			lastUserId=oneUser.userID;
			var predictions = votesdb.find({$and: [{'userID': oneUser.userID}, {'points': {$exists: false}}]});
			predictions.forEach(function(preDocs){
				var goals = goalsdb.find({'matchID': preDocs.matchID});
				if (goals.count() > 1){
					if (goals.fetch()[0].score == goals.fetch()[1].score){					
						if ((preDocs.teamID == goals.fetch()[0].teamID) || (preDocs.teamID == goals.fetch()[1].teamID)){
							votesdb.update({'_id': preDocs._id}, {$set:{'points': (totalIt(preDocs.matchID)-1)}});
						}
					} else if (goals.fetch()[0].score > goals.fetch()[1].score){
						if (preDocs.teamID == goals.fetch()[0].teamID){
							votesdb.update({'_id': preDocs._id}, {$set:{'points': totalIt(preDocs.matchID)}});
						}
					} else {
						if (preDocs.teamID == goals.fetch()[1].teamID){
							votesdb.update({'_id': preDocs._id}, {$set:{'points': totalIt(preDocs.matchID)}});
						}
					}
				}
			});
		}
	});

	var lastUserId = "first";
	var allUsers = votesdb.find({}, {fields: {'userID':1}, sort: {'userID':1}});
	allUsers.forEach((oneUser)=>{
		if (oneUser.userID != lastUserId){
			lastUserId=oneUser.userID;
			var myPoints = 0;
			var results = votesdb.find({$and: [{'userID': oneUser.userID}, {'points': { $exists : true }}]});		
			if (results.count() > 0){
				results.forEach(function(myVotes){
					myPoints = myPoints + (Number(myVotes.points)?Number(myVotes.points):0);
				});
			}
			var userRankID = ranksdb.find({'userID': oneUser.userID});		
			if (userRankID.count()<1){
				ranksdb.insert({'userID': oneUser.userID, 'totalPoints': myPoints});
				// console.log("insert rank",Meteor.userId());
			} else {
				ranksdb.update({'_id': userRankID.fetch()[0]._id},{$set: {'totalPoints': myPoints}});
				// console.log("update rank",Meteor.userId());
			}
		}
	});

	var rankPos = 0, lastPoints = 1000;
		var results = ranksdb.find({},{sort:{totalPoints:-1}});
		results.forEach((ranking) => {			
			if (lastPoints > ranking.totalPoints){
				rankPos++;
				lastPoints = ranking.totalPoints;
			}
			// console.log(rankPos);
			ranksdb.update({'_id': ranking._id}, {$set: {'ranked': rankPos}});
		});		
});

Template.predictor.helpers({
	userPoints: function(){		
		return ranksdb.findOne({'userID': Meteor.userId()}).totalPoints;
	},
	usersRank: function(){
		return ranksdb.find({'userID': Meteor.userId()}).fetch()[0].ranked;
	},
	predictionsCounted: function(){
		var predictions = votesdb.find({'userID': Meteor.userId()});
		return predictions.count();
	},
	predictionsCorrect: function(){
		return votesdb.find({$and: [{'userID': Meteor.userId()}, {'points': { $exists : true }}]}).count();
	}
});