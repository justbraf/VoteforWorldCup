teamsdb = new Mongo.Collection("teams");

// teamsdb.allow({
//   insert() { return false; },
//   update() { return false; },
//   remove() { return false; }
// });

// teamsdb.deny({
//   insert() { return true; },
//   update() { return true; },
//   remove() { return true; }
// });