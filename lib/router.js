var userID = 'dzLsoejG8sQWPrrG6';

Router.configure({
	layoutTemplate: 'appLayout'
});

Router.onBeforeAction(function () {
	if (!Meteor.userId() && !Meteor.loggingIn()) {
		// if the user is not logged in, render the Login template
		this.redirect('/');
	} else {
		// otherwise don't hold up the rest of hooks or our route/action function
		// from running
		this.next();
	}
},
{
	except: ['homePage']
});

Router.route('/', function() {
	this.wait([
		Meteor.subscribe('teams'),
		Meteor.subscribe('matches'),
		Meteor.subscribe('ranks'),
		Meteor.subscribe('votes'),
		Meteor.subscribe('goals'),
		Meteor.subscribe('VFWC'),
		Meteor.subscribe('userData')
	]);
	if (this.ready()){
		this.render('TitleBar', {to: 'TitleBar'});
		this.render('introduction', {to: 'main'});
		// this.render('userLogin', {to: 'footer'});
	}
},
{
	name: 'homePage'
// },
// {
// 	onBeforeAction: function(){
// 		console.log("testing hompepage onBeforeAction");
// 		if (!Meteor.userId()){
// 			console.log("no user loggedin");
// 			this.next();
// 		} else {
// 			console.log("user logged in and redirecting");
// 			this.redirect('welcome');
// 		}
// 	}
});

// Router.route('/Welcome', function() {
// 	this.render('TitleBar', {to: 'TitleBar'});
// 	this.render('groupList', {to: 'main'});
// 	this.render('matchList', {to: 'footer'});
// },
// {
// 	name: 'welcome'
// });

Router.route('/admin', function() {
	this.wait([
		Meteor.subscribe('ranks'),
		Meteor.subscribe('VFWC'),
		Meteor.subscribe('userData')
	]);	
	if (this.ready()){
		// var myParams = this.params;
		// console.log("Params:", myParams);
		// console.log("Params value:", myParams.userId);
		// console.log("Query Params:", myParams.query.boo);
		// if (myParams.query.isAdmin === 'admin')
		// alert('user: '+myParams.userId+' is now admin');
		this.render('adminConsole', {to: 'main'});
	}
},
{
	name: 'adminConsole'
},
{
	onBeforeAction: function(){		
		if(userID != Meteor.userId()){
			this.redirect('/');
		} 
		else {
			this.next();
		}
	}
});

// Router.route('/admin/teams/:userId', function(){
// 	// console.log(this.params.userId);
// 	this.render('teamConsole', {to: 'main'});
// },{
// 	name: 'teams.manager'
// });

Router.route('/admin/teams', function(){
	this.wait(Meteor.subscribe('teams'));
	if (this.ready()){
		this.render('teamConsole', {to: 'main'});
	}
},
{
	name: 'teams.manager'
},
{
	onBeforeAction: function(){		
		if(userID != Meteor.userId()){
			this.redirect('/');
		} 
		else {
			this.next();
		}
	}
});

Router.route('/admin/matches', function(){
	this.wait([Meteor.subscribe('teams'), Meteor.subscribe('matches')]);
	if (this.ready()){
		this.render('matchConsole', {to: 'main'});
	}
},
{
	name: 'matches.manager'
},
{
	onBeforeAction: function(){		
		if(userID != Meteor.userId()){
			this.redirect('/');
		} 
		else {
			this.next();
		}
	}
});

// Router.route('/admin/teams/add', function(){	
// 	this.render('teamConsole', {to: 'main'});
// },{
// 	name: 'teams.editor'
// });

// Router.route('/teamlist', function(){	
// 	this.render('teamList', {to: 'main'});
// },{
// 	name: 'teams.list'
// });

// Router.route('/grouplist', function(){	
// 	this.render('groupList', {to: 'main'});
// },{
// 	name: 'teams.group'
// });

// Router.route('/matchlist', function(){	
// 	this.render('matchList', {to: 'main'});
// },{
// 	name: 'matches'
// });