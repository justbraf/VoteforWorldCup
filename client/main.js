import '../imports/startup/accounts-config.js';
import '../imports/ui/layout.js';

Meteor.subscribe('teams');
Meteor.subscribe('matches');
Meteor.subscribe('score');
Meteor.subscribe('votes');
Meteor.subscribe('goals');
Meteor.subscribe('userData');