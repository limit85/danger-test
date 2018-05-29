'use strict';

const path = require('path');
const _ = require('lodash');

let localConfig;

// some changes...

try {
  localConfig = require('../local.env');
} catch (e) {
  localConfig = {};
}

//special test env
if (process.env.NODE_ENV === 'test') {
  localConfig = {};
}

// All configurations will extend these options
// ============================================
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

let all = {
  env: process.env.NODE_ENV,
  // Root path of server
  root: path.normalize(__dirname + '/..'),

  // Server port
  port: process.env.PORT || 9000,
};

const resultConfig = _.merge(
  all,
  require('./' + (process.env.NODE_ENV || 'development') + '.js') || {},
  localConfig);


module.exports = resultConfig;


