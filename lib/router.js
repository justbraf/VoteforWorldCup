Router.configure({
	layoutTemplate: 'appLayout'
});

Router.route('/', function() {
	this.render('TitleBar', {to: 'TitleBar'});
	this.render('introduction', {to: 'main'});
	// this.render('userLogin', {to: 'footer'});
});

Router.route('/admin/:userId', function() {
	var myParams = this.params;
	console.log("Params:", myParams);
	console.log("Params value:", myParams.userId);
	console.log("Query Params:", myParams.query.boo);

});