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
// 		Meteor.subscribe('matches'),
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
			BlazeLayout.render('appLayout', { header: 'userLogin', main: 'introduction' });
		else
			BlazeLayout.render('appLayout', { header: "winner" });
	}
});

normal.route('/Welcome', {
	name: 'welcome',
	action() {
		BlazeLayout.render('appLayout', { header: 'introduction', footer: 'groupList', main: 'matchList' });
	}
});

FlowRouter.route('/adminConsole', {
	name: 'adminConsole',
	action(params, queryParams) {
		console.log("Query Params:", queryParams);
		if (queryParams.userId)
			console.log("user ID value:", queryParams.userId);
		if (queryParams.isAdmin)
			if (queryParams.isAdmin === 'admin')
				alert('user: ' + queryParams.userId + ' is now admin');
		BlazeLayout.render('adminConsole', { to: 'main' });
	},
	waitOn() {
		return [
			Meteor.subscribe('ranks'),
			Meteor.subscribe('VFWC'),
			Meteor.subscribe('userData')
		]
	}
});

FlowRouter.route('/adminConsole/teams/:userId', {
	name: 'teams.manager',
	action(params, queryParams) {
		console.log(params.userId);
		BlazeLayout.render('appLayout', { main: 'teamConsole' });
	}
});

FlowRouter.route('/adminConsole/teams', {
	name: 'teams.manager',
	action() {
		BlazeLayout.render('appLayout', { main: 'teamConsole' });
	},
	waitOn() {
		return Meteor.subscribe('teams')
	}
});

FlowRouter.route('/adminConsole/matches', {
	name: 'matches.manager',
	action() {
		BlazeLayout.render('appLayout', { main: 'matchConsole' });
	},
	waitOn() {
		return [
			Meteor.subscribe('teams'),
			Meteor.subscribe('matches')
		]
	}
});

FlowRouter.route('/adminConsole/teams/add', {
	name: 'teams.editor',
	action() {
		BlazeLayout.render('appLayout', { main: 'teamConsole' });
	}
});

FlowRouter.route('/teamlist', {
	name: 'teams.list',
	action() {
		BlazeLayout.render('appLayout', { main: 'teamList' });
	}
});

FlowRouter.route('/grouplist', {
	name: 'teams.group',
	action() {
		BlazeLayout.render('appLayout', { main: 'groupList' });
	}
});

FlowRouter.route('/matchlist', {
	name: 'matches',
	action() {
		BlazeLayout.render('appLayout', { main: 'matchList' });
	}
});

FlowRouter.route('*', {
	action() {
		BlazeLayout.render('appLayout', { main: 'notFound' })
	}
})