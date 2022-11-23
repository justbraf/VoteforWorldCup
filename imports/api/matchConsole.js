Template.matchConsole.helpers({
  teamFlag1: function () {
    return Template.instance().teamFlag1.get();
  },
  teamFlag2: function () {
    return Template.instance().teamFlag2.get();
  }
});

Template.matchConsole.onCreated(function () {
  this.teamFlag1 = new ReactiveVar("flag_white2.png");
  this.teamFlag2 = new ReactiveVar("flag_white2.png");
});

Template.matchConsole.events({
  'change #teamFlagFile': function (event, instance) {
    let imageName = event.target.files[0].name;
    Template.instance().teamFlag1.set(imageName);
    $("#teamName1").val(imageName.replace(".png", ""));
  },
  'click .js-teamFlagImage': function (event, instance) {
    $('#teamFlagFile').click();
  },
  'change #teamFlagFile2': function (event, instance) {
    let imageName = event.target.files[0].name;
    Template.instance().teamFlag2.set(imageName);
    $("#teamName2").val(imageName.replace(".png", ""));
  },
  'click .js-addMatch': function () {
    $("#matchDateField").datetimepicker({
      allowTimes: [
        '06:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '14:00', '15:00'
      ],
      format: 'MM/DD/YYYY HH:mm',
      minDate: '06/14/2018',
      maxDate: '07/15/2018'
    });
  },
  'click .js-closeMatch': function () {
    Template.instance().teamFlag1.set("flag_white2.png");
    Template.instance().teamFlag2.set("flag_white2.png");
    $("#matchNumField").val("");
    $("#teamName1").val("");
    $("#teamName2").val("");
    $("#matchDateField").val("");
    // ------------------------ update multiple fields - code failed
    // fixturesdb.find({matchNum: {$type: 2}}).forEach( function(x){   
    //   x.matchNum = new Number(x.matchNum);
    //   fixturesdb.save(x);
    // });
  },
  // 'click .js-saveMatch': function () {
  //   let mNum = parseInt($("#matchNumField").val());
  //   let tID1 = teamsdb.findOne({ teamName: $("#teamName1").val() })._id;
  //   let tID2 = teamsdb.findOne({ teamName: $("#teamName2").val() })._id;
  //   let mDate = $("#matchDateField").val(); //new Date ($("#matchDateField").val());
  //   let result = fixturesdb.find({ matchNum: mNum }).count();

  //   if (result < 1) {
  //     fixturesdb.insert({ "matchNum": mNum, "teamID1": tID1, "teamID2": tID2, "matchDateTime": mDate });
  //   }
  //   else {
  //     alert("Match Already Exist!");
  //   }
  //   Template.instance().teamFlag1.set("flag_white2.png");
  //   Template.instance().teamFlag2.set("flag_white2.png");
  //   $("#matchNumField").val("");
  //   $("#teamName1").val("");
  //   $("#teamName2").val("");
  //   $("#matchDateField").val("");
  // }
});