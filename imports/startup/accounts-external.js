if (ServiceConfiguration.configurations.find({service: 'facebook'}).count() > 0) {
	  ServiceConfiguration.configurations.remove({
	  	_id:ServiceConfiguration.configurations.findOne({service: "facebook"})['_id']
		});
	}
  ServiceConfiguration.configurations.insert({
  	service: 'facebook',
  	appId: '360794574436579',
  	secret: '005952e8e231a93e6b04eb4c668d7a8f'
 	}); 	
 	
 	if (ServiceConfiguration.configurations.find({service: 'google'}).count() > 0) {
		ServiceConfiguration.configurations.remove({
	  	_id:ServiceConfiguration.configurations.findOne({service: "google"})['_id']
		});
	}
 	ServiceConfiguration.configurations.insert({
  	service: "google",
		clientId: "365846407960-th0j8enbhg6t4s1f7k8mkam0opav7h1t.apps.googleusercontent.com",
		secret: "kewMc9b7JUOdd9k1wGpczmRR"
 	});