teamsdb = new Mongo.Collection("teams");
matchesdb = new Mongo.Collection("matches");

teamsdb.allow({
	insert() { return true; },
	update() { return false; },
	remove() { return false; }
});

matchesdb.allow({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

// teamsdb.deny({
//   insert() { return true; },
//   update() { return true; },
//   remove() { return true; }
// });