import '../imports/startup/accounts-config.js';
import '../imports/ui/layout.js';

Meteor.subscribe('teams');
Meteor.subscribe('userData');
Meteor.subscribe('matches');