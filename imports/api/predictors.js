Template.predictor.onCreated(function(){
	this.prePoints = new ReactiveVar(0);	
});

Template.predictor.helpers({
	userPoints: function(){
		return Template.instance().prePoints.get();;
	},
	allPredictions: function(){
		return 0;
	},
	predictionsCounted: function(){
		var predictions = votesdb.find({'userID': Meteor.userId()});
		return predictions.count();
	},
	predictionsCorrect: function(){
		var preTotal = 0;
		var predictionPoints = Template.instance().prePoints.get();
		function totalIt(mId){
			preTotal++;
			var prediPoints = 0;
			var mNum = matchesdb.findOne({'_id': mId}).matchNum;
			if (mNum < 49){
				prediPoints = prediPoints + 1;
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
			}console.log("mNum",mNum,"points",prediPoints);
			return prediPoints;
		}
		var predictions = votesdb.find({'userID': Meteor.userId()});
		predictions.forEach(function(preDocs){
			var goals = goalsdb.find({'matchID': preDocs.matchID});
			if (goals.count() > 1){
				if (goals.fetch()[0].score > goals.fetch()[1].score){
					// console.log("win:",goals.fetch()[0].teamID);
					if (preDocs.teamID == goals.fetch()[0].teamID){
						predictionPoints = predictionPoints + totalIt(preDocs.matchID);
					}
				} else {
					// console.log("win:",goals.fetch()[1].teamID);
					if (preDocs.teamID == goals.fetch()[1].teamID){
						predictionPoints = predictionPoints + totalIt(preDocs.matchID);
					}
				}
				if (goals.fetch()[0].score == goals.fetch()[1].score){
					if ((preDocs.teamID == goals.fetch()[0].teamID) || (preDocs.teamID == goals.fetch()[1].teamID)){
						predictionPoints = predictionPoints + totalIt(preDocs.matchID);
					}
				}
			}
		});
		console.log(predictionPoints);
		// Template.instance().prePoints.set(predictionPoints);
		return preTotal;
	}
});