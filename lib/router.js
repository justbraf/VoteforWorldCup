Router.configure({
	layoutTemplate: 'appLayout'
});

Router.route('/', function() {
	this.render('TitleBar', {to: 'TitleBar'});
	this.render('introduction', {to: 'main'});
	// this.render('userLogin', {to: 'footer'});
});

Router.route('/Welcome', function() {
	this.render('TitleBar', {to: 'TitleBar'});
	this.render('groupList', {to: 'main'});
	// this.render('userLogin', {to: 'footer'});
});

Router.route('/admin', function() {
	var myParams = this.params;
	// console.log("Params:", myParams);
	// console.log("Params value:", myParams.userId);
	// console.log("Query Params:", myParams.query.boo);
	if (myParams.query.isAdmin === 'admin')
		alert('user: '+myParams.userId+' is now admin');
	this.render('adminConsole', {to: 'main'});

});

// Router.route('/admin/teams/:userId', function(){
// 	// console.log(this.params.userId);
// 	this.render('teamConsole', {to: 'main'});
// },{
// 	name: 'teams.manager'
// });

Router.route('/admin/teams', function(){	
	this.render('teamConsole', {to: 'main'});
},{
	name: 'teams.manager'
});

// Router.route('/admin/teams/add', function(){	
// 	this.render('teamConsole', {to: 'main'});
// },{
// 	name: 'teams.editor'
// });

Router.route('/teamlist', function(){	
	this.render('teamList', {to: 'main'});
},{
	name: 'teams.list'
});

Router.route('/grouplist', function(){	
	this.render('groupList', {to: 'main'});
},{
	name: 'teams.group'
});