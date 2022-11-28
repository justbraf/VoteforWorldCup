import { Mongo } from 'meteor/mongo';

teamsdb = new Mongo.Collection("teams");
fixturesdb = new Mongo.Collection("matches");
ranksdb = new Mongo.Collection("ranks");
votesdb = new Mongo.Collection("votes");
goalsdb = new Mongo.Collection("goals");
// VFWCdb = new Mongo.Collection("VFWC");

teamsdb.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

fixturesdb.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

ranksdb.allow({
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

// VFWCdb.allow({
// 	insert() { return true; },
// 	update() { return true; },
// 	remove() { return false; }
// });

// teamsdb.deny({
//   insert() { return true; },
//   update() { return true; },
//   remove() { return true; }
// });