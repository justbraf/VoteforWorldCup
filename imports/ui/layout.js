import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout.html';
import './intro.html';
import './login.html';
import './admin.html';
import './groups.html';
import './teams.html';
import './matches.html';
import './predictors.html';

import '../api/login.js';
import '../api/admin.js';
import '../api/teams.js';
import '../api/vote.js';
import '../api/matches.js';
import '../api/predictors.js';