import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// import '../imports/startup/accounts-config.js';
import '../lib/collections.js';

import './main.html'
import '../lib/router.js'

import '../imports/ui/layout.js';

// Meteor.subscribe('teams');
// Meteor.subscribe('matches');
// Meteor.subscribe('ranks');
// Meteor.subscribe('votes');
// Meteor.subscribe('goals');
// Meteor.subscribe('userData');