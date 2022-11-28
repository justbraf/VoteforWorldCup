import { Template } from 'meteor/templating';

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