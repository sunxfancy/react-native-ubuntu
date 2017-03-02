'use strict';

const genUbuntu = require('./generate-ubuntu');
const runUbuntu = require('./ubuntu/runUbuntu');
const path = require('path');
const fs = require('fs');

const getReactNativeAppName = function () {
  console.log('Reading application name from package.json...');
  return JSON.parse(fs.readFileSync('package.json', 'utf8')).name;
}

function generateUbuntu(config, args, options) {
	genUbuntu(args.getProjectRoots()[0], getReactNativeAppName());
}

module.exports = [
	{
	  func: generateUbuntu,
	  description: 'This action generate ubuntu project',
	  name: 'ubuntu',
	  options: []
	},
	{
	  func: runUbuntu,
	  description: 'This action run ubuntu project',
	  name: 'run-ubuntu',
	  options: [{
	    command: '--root',
	    type: 'string',
	    description: 'Override the root directory for the ubuntu build (which contains the ubuntu directory)',
	  }, {
	    command: '--live-reload',
	    description: 'Start with live reloading enabled',
	    default: false
	  }, {
	    command: '--host',
	    type: 'string',
	    description: 'Set packager host'
	  }, {
	    command: '--port',
	    type: 'string',
	    description: 'Set packager port'
	  }, {
	    command: '--executor',
	    type: 'string',
	    description: 'Name of executor to use'
	  }, {
	    command: '--arch',
	    type: 'string',
	    description: 'Set build architecture (ARM, x86, x64)',
	    default: process.arch
	  }, {
	    command: '--plugins-path',
	    type: 'string',
	    description: 'Path to node modules',
	    default: process.cwd() + "/ubuntu/plugins"
	  }, {
	    command: '--click',
	    description: 'Build a click package',
	    default: false
	  }, {
	    command: '--snap',
	    description: 'Build a snap package',
	    default: false
	  }]
	}
];