import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout.html';
import './intro.html';
import './login.html';
import './admin.html';

import '../api/login.js';
import '../api/admin.js';