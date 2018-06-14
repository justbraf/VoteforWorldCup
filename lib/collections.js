teamsdb = new Mongo.Collection("teams");
matchesdb = new Mongo.Collection("matches");
scoredb = new Mongo.Collection("score");
votesdb = new Mongo.Collection("votes");
goalsdb = new Mongo.Collection("goals");

teamsdb.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

matchesdb.allow({
	insert() { return false; },
	update() { return true; },
	remove() { return false; }
});

scoredb.allow({
	insert() { return true; },
	update() { return true; },
	remove() { return false; }
});

votesdb.allow({
	insert() { return true; },
	update() { return true; },
	remove() { return false; }
});

goalsdb.allow({
	insert() { return true; },
	update() { return true; },
	remove() { return false; }
});

// teamsdb.deny({
//   insert() { return true; },
//   update() { return true; },
//   remove() { return true; }
// });