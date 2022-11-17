Template.teamConsole.onCreated(function () {
  this.teamFlag = new ReactiveVar("flag_white2.png");
});

Template.teamConsole.helpers({
  teamFlag: function () {
    return Template.instance().teamFlag.get();
  }
});

Template.teamConsole.events({
  'change #teamFlagFile': function (event, instance) {
    // console.log("Filename: " + event.target.files[0].name);
    // console.log("Size: " + event.target.files[0].size + " bytes");
    // console.log("File type: " + event.target.files[0].type);
    let imageName = event.target.files[0].name;
    Template.instance().teamFlag.set(imageName);
    $("#teamNameField").val(imageName.replace(".png", ""));
  },
  'click .js-teamFlagImage': function (event, instance) {
    $('#teamFlagFile').click();
  },
  'click .js-saveTeam': function () {
    let tFlag = $("#teamNameField").val() + ".png";//$("#teamFlagFile").val();
    let tName = $("#teamNameField").val();
    let tGroup = $("#teamGroupSelect option:selected").text();
    console.log(tName, tFlag, tGroup);
    let result = teamsdb.find({ teamName: tName }).count();

    if (result < 1) {
      // console.log(result+" found! Adding team.");
      teamsdb.insert({ "teamFlag": tFlag, "teamName": tName, "teamGroup": tGroup });
    }
    else {
      alert("Team Already Exist!");
    }
    Template.instance().teamFlag.set("flag_white2.png");
    $("#teamNameField").val("");
    $("#teamGroupSelect").val($("#teamGroupSelect option:first").val());

  },
  'click .js-closeTeam': function () {
    Template.instance().teamFlag.set("flag_white2.png");
    $("#teamNameField").val("");
    $("#teamGroupSelect").val($("#teamGroupSelect option:first").val());
  }
});