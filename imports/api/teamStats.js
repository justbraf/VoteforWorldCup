Template.teamStats.helpers({
  Stats: function () {
    return fixturesdb.find({ $or: [{ teamID1: Session.get("WCTeamID") }, { teamID2: Session.get("WCTeamID") }] });
    // let xDates = [];
    // fixturesdb.find({ $or: [{teamID1: Session.get("WCTeamID")}, {teamID2: Session.get("WCTeamID")}] }).forEach( function(allTheDates){		   
    // 	allTheDates.matchDateTime = Date(allTheDates.matchDateTime);
    // 	xDates.push(allTheDates);
    // });
    // return xDates;
  },
  tDay: function () {
    let theDate = new Date;
    return theDate; //.format("MM/DD/YYYY");
  }
});