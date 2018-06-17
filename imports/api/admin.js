Template.adminConsole.events({
	'click .js-teams'	:function(){
		Router.go('teams.manager');
		// Router.go('teams.manager', {userId:'45'});
		// alert("go teams");
	},
	'click .js-matches'	:function(){
		Router.go('matches.manager');
	}
});

Template.teamConsole.onCreated(function(){
	this.teamFlag = new ReactiveVar("flag_white2.png");	
});

Template.teamConsole.helpers({
	teamFlag: function(){
		return Template.instance().teamFlag.get();
	}
});

Template.teamConsole.events({
	'change #teamFlagFile': function(event, instance){
		// console.log("Filename: " + event.target.files[0].name);
		// console.log("Size: " + event.target.files[0].size + " bytes");
		// console.log("File type: " + event.target.files[0].type);
		var imageName = event.target.files[0].name;
		Template.instance().teamFlag.set(imageName);
		$("#teamNameField").val(imageName.replace(".png",""));		
	},
	'click .js-teamFlagImage': function(event, instance){		
		$('#teamFlagFile').click();
	},
	'click .js-saveTeam': function(){
		var tFlag = $("#teamNameField").val() + ".png";//$("#teamFlagFile").val();
		var tName = $("#teamNameField").val();
		var tGroup = $("#teamGroupSelect option:selected").text();
		console.log(tName,tFlag,tGroup);
		var result = teamsdb.find({teamName:tName}).count();
		
		if (result < 1){
			// console.log(result+" found! Adding team.");
			teamsdb.insert({"teamFlag":tFlag, "teamName":tName, "teamGroup":tGroup});
		}
		else {
			alert ("Team Already Exist!");
		}
		Template.instance().teamFlag.set("flag_white2.png");
		$("#teamNameField").val("");
		$("#teamGroupSelect").val($("#teamGroupSelect option:first").val());

	},
	'click .js-closeTeam': function(){
		Template.instance().teamFlag.set("flag_white2.png");
		$("#teamNameField").val("");
		$("#teamGroupSelect").val($("#teamGroupSelect option:first").val());
	}
});

Template.groupList.helpers({
	GroupA: function(){
		return teamsdb.find({teamGroup:{$eq: "Group A"}}, {sort: {teamName: 1}});
	},
	GroupB: function(){
		return teamsdb.find({teamGroup:{$eq: "Group B"}}, {sort: {teamName: 1}});
	},
	GroupC: function(){
		return teamsdb.find({teamGroup:{$eq: "Group C"}}, {sort: {teamName: 1}});
	},
	GroupD: function(){
		return teamsdb.find({teamGroup:{$eq: "Group D"}}, {sort: {teamName: 1}});
	},
	GroupE: function(){
		return teamsdb.find({teamGroup:{$eq: "Group E"}}, {sort: {teamName: 1}});
	},
	GroupF: function(){
		return teamsdb.find({teamGroup:{$eq: "Group F"}}, {sort: {teamName: 1}});
	},
	GroupG: function(){
		return teamsdb.find({teamGroup:{$eq: "Group G"}}, {sort: {teamName: 1}});
	},
	GroupH: function(){
		return teamsdb.find({teamGroup:{$eq: "Group H"}}, {sort: {teamName: 1}});
	}
});

Template.matchConsole.helpers({
	teamFlag1: function(){
		return Template.instance().teamFlag1.get();
	},
	teamFlag2: function(){
		return Template.instance().teamFlag2.get();
	}
});

Template.matchConsole.onCreated(function(){
	this.teamFlag1 = new ReactiveVar("flag_white2.png");	
	this.teamFlag2 = new ReactiveVar("flag_white2.png");	
});

Template.matchConsole.events({
	'change #teamFlagFile': function(event, instance){
		var imageName = event.target.files[0].name;
		Template.instance().teamFlag1.set(imageName);
		$("#teamName1").val(imageName.replace(".png",""));		
	},
	'click .js-teamFlagImage': function(event, instance){		
		$('#teamFlagFile').click();
	},
	'change #teamFlagFile2': function(event, instance){
		var imageName = event.target.files[0].name;
		Template.instance().teamFlag2.set(imageName);
		$("#teamName2").val(imageName.replace(".png",""));		
	},
	'click .js-teamFlagImage2': function(event, instance){		
		$('#teamFlagFile2').click();
	},
	'click .js-addMatch': function(){
		$("#matchDateField").datetimepicker({			 
			 allowTimes:[
				'06:00', '08:00', '09:00', '10:00',
				'11:00', '12:00', '14:00', '15:00'
			 ],
			 format: 'MM/DD/YYYY HH:mm',
			 minDate: '06/14/2018',
			 maxDate: '07/15/2018'
		});
	},
	'click .js-closeMatch': function(){
		Template.instance().teamFlag1.set("flag_white2.png");
		Template.instance().teamFlag2.set("flag_white2.png");
		$("#matchNumField").val("");
		$("#teamName1").val("");
		$("#teamName2").val("");
		$("#matchDateField").val("");
		// ------------------------ update multiple fields - code failed
		// matchesdb.find({matchNum: {$type: 2}}).forEach( function(x){   
		//   x.matchNum = new Number(x.matchNum);
		//   matchesdb.save(x);
		//    // console.log(x._id,x.matchNum);
		// });
	},
	'click .js-saveMatch': function(){
		var mNum = parseInt($("#matchNumField").val());
		var tID1 = teamsdb.findOne({teamName:$("#teamName1").val()})._id;
		var tID2 = teamsdb.findOne({teamName:$("#teamName2").val()})._id;
		var mDate = $("#matchDateField").val(); //new Date ($("#matchDateField").val());
		console.log(mNum+" "+tID1+" "+tID2+" "+mDate);
		var result = matchesdb.find({matchNum:mNum}).count();
		
		if (result < 1){
			console.log(result+" Adding match.");
			matchesdb.insert({"matchNum":mNum, "teamID1":tID1, "teamID2":tID2, "matchDateTime":mDate});
		}
		else {
			alert ("Match Already Exist!");
		}
		Template.instance().teamFlag1.set("flag_white2.png");
		Template.instance().teamFlag2.set("flag_white2.png");
		$("#matchNumField").val("");
		$("#teamName1").val("");
		$("#teamName2").val("");
		$("#matchDateField").val("");
	}
});

Template.topRankers.helpers({
	theRankers: function(){
		return ranksdb.find({}, {sort:{'ranked':1}, limit: 5});
	},
	predictorsName: function(){
		return Meteor.users.findOne({"_id": this.userID}, {fields: {"profile.name": 1}}).profile.name;
	}
});