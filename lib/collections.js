teamsdb = new Mongo.Collection("teams");

teamsdb.allow({
	insert() { return true; },
	update() { return false; },
	remove() { return true; }
});

// teamsdb.deny({
//   insert() { return true; },
//   update() { return true; },
//   remove() { return true; }
// });