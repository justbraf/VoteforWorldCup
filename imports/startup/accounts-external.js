import { ServiceConfiguration } from 'meteor/service-configuration'

ServiceConfiguration.configurations.upsert({
	service: "google"
},
	{
		$set: {
			clientId: "671901475784-cug5hp06gg634551c2qmtupsd6im0gh2.apps.googleusercontent.com",
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