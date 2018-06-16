Template.predictor.helpers({
	userPoints: function(){
		var results = votesdb.find({'userID': Meteor.userId()});
		// console.log("num votes",results.count());
		if (results.count() > 0){
			var myPoints = 0;
			results.forEach(function(myVotes){
				// console.log("saved points",Number(myVotes.points)?Number(myVotes.points):0);
				myPoints = myPoints + (Number(myVotes.points)?Number(myVotes.points):0);
			});
		}
		return myPoints;
	},
	allPredictions: function(){
		// ****use a collection instead???****
		// retrieve all votes sorted by userID
		// running total of points
		// push results into array everytime userID changes
		// sort array by totals
		// display rank to users
		return 0;
	},
	predictionsCounted: function(){
		var predictions = votesdb.find({'userID': Meteor.userId()});
		return predictions.count();
	},
	predictionsCorrect: function(){
		var preTotal = 0;		
		function totalIt(mId){
			preTotal++;
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
			// console.log("mNum",mNum,"points",prediPoints);
			return prediPoints;
		}
		var predictions = votesdb.find({'userID': Meteor.userId()});
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
		return preTotal;
	}
});