import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

BlazeLayout.setRoot('body');

const normal = FlowRouter.group();
const loggedIn = FlowRouter.group({
	triggersEnter: [
		function (context, redirect) {
			if (!Meteor.userId()) {
				if (context.route.name != 'index')
					redirect('index')
			}
		}
	]
});

// 		Meteor.subscribe('teams'),
// 		Meteor.subscribe('fixtures'),
// 		Meteor.subscribe('ranks'),
// 		Meteor.subscribe('votes'),
// 		Meteor.subscribe('goals'),
// 		Meteor.subscribe('VFWC'),
// 		Meteor.subscribe('userData')

normal.route('/', {
	name: 'index',
	action() {
		// 1671393600000 == Date and time(GMT): Sunday, December 18, 2022 8: 00: 00 PM
		if (Date.now() < 1671393600000)
			BlazeLayout.render('appLayout', { header: "acctManager", main: 'introduction' })
		else
			BlazeLayout.render('appLayout', { header: "winner" });
	},
	waitOn() {
		// return [
		// 	Meteor.subscribe('fixtures'),
		// 	Meteor.subscribe('votes'),
		// 	Meteor.subscribe('teams'),
		// 	Meteor.subscribe('goals'),
		// 	Meteor.subscribe('ranks'),
		return Meteor.subscribe('userData')
		// ]
	}
});

loggedIn.route('/stats', {
	name: 'stats',
	action() {
		BlazeLayout.render('appLayout', { header: "navBar", nav: "acctManager", main: 'stats' })
	},
	waitOn() {
		return [
			// Meteor.subscribe('fixtures'),
			Meteor.subscribe('votes'),
			// Meteor.subscribe('teams'),
			// Meteor.subscribe('goals'),
			Meteor.subscribe('ranks'),
			Meteor.subscribe('userData')
		]
	}
});

loggedIn.route('/fixtures', {
	name: 'fixtures',
	action() {
		BlazeLayout.render('appLayout', { header: "navBar", nav: "acctManager", main: 'fixtures' })
	},
	waitOn() {
		return [
			Meteor.subscribe('fixtures'),
			Meteor.subscribe('votes'),
			Meteor.subscribe('teams'),
			Meteor.subscribe('goals'),
			// Meteor.subscribe('ranks'),
			// Meteor.subscribe('userData')
		]
	}
});

loggedIn.route('/scores', {
	name: 'scores',
	action() {
		BlazeLayout.render('appLayout', { header: "navBar", nav: "acctManager", main: 'matchResults' })
	},
	waitOn() {
		return [
			Meteor.subscribe('fixtures'),
			Meteor.subscribe('votes'),
			Meteor.subscribe('teams'),
			Meteor.subscribe('goals'),
			// Meteor.subscribe('ranks'),
			// Meteor.subscribe('userData')
		]
	}
});

loggedIn.route('/groups', {
	name: 'groups',
	action() {
		BlazeLayout.render('appLayout', { header: "navBar", nav: "acctManager", main: 'groupList' })
	},
	waitOn() {
		return [
			// Meteor.subscribe('fixtures'),
			// Meteor.subscribe('votes'),
			Meteor.subscribe('teams'),
			// Meteor.subscribe('goals'),
			// Meteor.subscribe('ranks'),
			// Meteor.subscribe('userData')
		]
	}
});

loggedIn.route('/teams', {
	name: 'teams',
	action() {
		BlazeLayout.render('appLayout', { header: "navBar", nav: "acctManager", main: 'teamList' })
	},
	waitOn() {
		return [
			// Meteor.subscribe('fixtures'),
			// Meteor.subscribe('votes'),
			Meteor.subscribe('teams'),
			// Meteor.subscribe('goals'),
			// Meteor.subscribe('ranks'),
			// Meteor.subscribe('userData')
		]
	}
});

loggedIn.route('/about', {
	name: 'about',
	action() {
		BlazeLayout.render('appLayout', { header: "navBar", nav: "acctManager", main: 'about' })
	},
	waitOn() {
		return [
			// Meteor.subscribe('fixtures'),
			// Meteor.subscribe('votes'),
			// Meteor.subscribe('teams'),
			// Meteor.subscribe('goals'),
			// Meteor.subscribe('ranks'),
			// Meteor.subscribe('userData')
		]
	}
});

loggedIn.route('/I78j0jerBYV1', {
	name: 'admin2',
	action() {
		BlazeLayout.render('appLayout', { main: 'admin2' })
	}
});

loggedIn.route('/adminConsole', {
	name: 'adminConsole',
	action(params, queryParams) {
		BlazeLayout.render('appLayout', { main: 'adminConsole' })
	},
	waitOn() {
		return [
			Meteor.subscribe('ranks'),
			Meteor.subscribe('userData'),
			Meteor.subscribe('votes'),
			Meteor.subscribe('fixtures'),
			Meteor.subscribe('goals')
		]
	}
});

loggedIn.route('/adminConsole/votes', {
	name: 'admin.votes',
	action() {
		BlazeLayout.render('appLayout', { main: 'viewVotes' })
	},
	waitOn() {
		return [
			// Meteor.subscribe('ranks'),
			Meteor.subscribe('userData'),
			Meteor.subscribe('votes'),
			Meteor.subscribe('fixtures'),
			Meteor.subscribe('goals'),
			Meteor.subscribe('teams')
		]
	}
});

loggedIn.route('/adminConsole/users', {
	name: 'admin.users',
	action() {
		BlazeLayout.render('appLayout', { main: 'viewUsers' })
	},
	waitOn() {
		return [
			// Meteor.subscribe('ranks'),
			Meteor.subscribe('userData'),
			Meteor.subscribe('votes'),
			// Meteor.subscribe('fixtures'),
			// Meteor.subscribe('goals'),
			// Meteor.subscribe('teams')
		]
	}
});

loggedIn.route('/adminConsole/ranks', {
	name: 'admin.ranks',
	action() {
		BlazeLayout.render('appLayout', { main: 'viewRanks' })
	},
	waitOn() {
		return [
			Meteor.subscribe('ranks'),
			Meteor.subscribe('userData'),
			// Meteor.subscribe('votes'),
			// Meteor.subscribe('fixtures'),
			// Meteor.subscribe('goals'),
			// Meteor.subscribe('teams')
		]
	}
});

loggedIn.route('/adminConsole/goals', {
	name: 'admin.goals',
	action() {
		BlazeLayout.render('appLayout', { main: 'viewGoals' })
	},
	waitOn() {
		return [
			// Meteor.subscribe('ranks'),
			// Meteor.subscribe('userData'),
			// Meteor.subscribe('votes'),
			Meteor.subscribe('fixtures'),
			Meteor.subscribe('goals'),
			Meteor.subscribe('teams')
		]
	}
});

// loggedIn.route('/adminConsole/teams/:userId', {
// 	name: 'teams.manager.team',
// 	action(params, queryParams) {
// 		BlazeLayout.render('appLayout', { main: 'teamConsole' });
// 	}
// });

// loggedIn.route('/adminConsole/teams', {
// 	name: 'teams.manager',
// 	action() {
// 		BlazeLayout.render('appLayout', { main: 'teamConsole' });
// 	},
// 	waitOn() {
// 		return Meteor.subscribe('teams')
// 	}
// });

// loggedIn.route('/adminConsole/matches', {
// 	name: 'matches.manager',
// 	action() {
// 		BlazeLayout.render('appLayout', { main: 'matchConsole' });
// 	},
// 	waitOn() {
// 		return [
// 			Meteor.subscribe('teams'),
// 			Meteor.subscribe('fixtures'),
// 			Meteor.subscribe('votes')
// 		]
// 	}
// });

// loggedIn.route('/adminConsole/teams/add', {
// 	name: 'teams.editor',
// 	action() {
// 		BlazeLayout.render('appLayout', { main: 'teamConsole' });
// 	}
// });

loggedIn.route('/teamlist', {
	name: 'teams.list',
	action() {
		BlazeLayout.render('appLayout', { main: 'teamList' });
	}
});

loggedIn.route('/grouplist', {
	name: 'teams.group',
	action() {
		BlazeLayout.render('appLayout', { main: 'groupList' });
	}
});

loggedIn.route('/matchlist', {
	name: 'matches',
	action() {
		BlazeLayout.render('appLayout', { main: 'fixtures' });
	}
});

FlowRouter.route('*', {
	action() {
		BlazeLayout.render('appLayout', { main: 'notFound' })
	}
})