import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

Template.teamList.helpers({
	WCTeams: () => {
		return teamsdb.find({}, { sort: { team: 1 } });
	},
	showStats: function () {
		if (!!this.goalDiff || !!this.points)
			return true
		return false
	}
})

// Template.teamList.events()