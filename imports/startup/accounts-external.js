// if (ServiceConfiguration.configurations.find({ service: 'facebook' }).count() > 0) {
// 	ServiceConfiguration.configurations.remove({
// 		_id: ServiceConfiguration.configurations.findOne({ service: "facebook" })['_id']
// 	});
// }
// ServiceConfiguration.configurations.upsert({
// 	service: 'facebook'
// },
// 	{
// 		$set: {
// 			appId: '360794574436579',
// 			secret: '005952e8e231a93e6b04eb4c668d7a8f'
// 		}
// 	}
// )

// if (ServiceConfiguration.configurations.find({ service: 'google' }).count() > 0) {
// 	ServiceConfiguration.configurations.remove({
// 		_id: ServiceConfiguration.configurations.findOne({ service: "google" })['_id']
// 	});
// }
ServiceConfiguration.configurations.upsert({
	service: "google"
},
	{
		$set: {
			clientId: "365846407960-th0j8enbhg6t4s1f7k8mkam0opav7h1t.apps.googleusercontent.com",
			secret: "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"
		}
	}
)

ServiceConfiguration.configurations.upsert({
	service: 'github'
},
	{
		$set: {
			loginStyle: 'popup',
			clientId: '115e849fd97213f5762a',
			secret: '61be380d2a4056364006b258ffc4c7b5c0a32ffe',
		}
	}
)