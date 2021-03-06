
/**
 * Copyright (C) 2016, Canonical Ltd.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');


function validatePackageName(name) {
  // TODO: check that this matches Ubuntu package reqs as well
  if (!name.match(/^([a-zA-Z_$][a-zA-Z\d_$]*\.)+([a-zA-Z_$][a-zA-Z\d_$]*)$/)) {
    return false;
  }
  return true;
}

module.exports = yeoman.generators.NamedBase.extend({
  constructor: function() {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.option('package', {
      desc: 'Package name for the application (appname.developername)',
      type: String,
      defaults: this.name.toLowerCase() + '.dev'
    });
  },

  initializing: function() {
    if (!validatePackageName(this.options.package)) {
      throw new Error('Package name ' + this.options.package + ' is invalid');
    }
  },

  writing: function() {
    var templateParams = {
      package: this.options.package,
      name: this.name,
      lowerCaseName: this.name.toLowerCase()
    };

    this.fs.copyTpl(
      this.templatePath('index.ubuntu.js'),
      this.destinationPath('index.ubuntu.js'),
      templateParams
    );

    this.fs.copyTpl(
      this.templatePath('CMakeLists.txt'),
      this.destinationPath(path.join('ubuntu', 'CMakeLists.txt')),
      templateParams
    );
    this.fs.copyTpl(
      this.templatePath('build.sh'),
      this.destinationPath(path.join('ubuntu', 'build.sh')),
      templateParams
    );
    this.fs.copyTpl(
      this.templatePath('run-app.sh.in'),
      this.destinationPath(path.join('ubuntu', 'run-app.sh.in')),
      templateParams
    );
    this.fs.copyTpl(
      this.templatePath('ubuntu-server.js'),
      this.destinationPath(path.join('ubuntu', 'bin/ubuntu-server.js')),
      templateParams
    );

    // click
    this.fs.copyTpl(
      this.templatePath('click/manifest.json'),
      this.destinationPath(path.join('ubuntu', 'click', 'manifest.json')),
      templateParams
    );
    this.fs.copyTpl(
      this.templatePath('click/desktop'),
      this.destinationPath(path.join('ubuntu', 'click', this.name + '.desktop')),
      templateParams
    );
    this.fs.copy(
      this.templatePath('click/apparmor'),
      this.destinationPath(path.join('ubuntu', 'click', this.name + '.apparmor'))
    );
    this.fs.copy(
      this.templatePath('click/icon.png'),
      this.destinationPath(path.join('ubuntu', 'click', 'share', 'icons', this.name + '.png'))
    );

    // snap
    this.fs.copyTpl(
      this.templatePath('snap/snapcraft.yaml'),
      this.destinationPath(path.join('ubuntu', 'snap', 'snapcraft.yaml')),
      templateParams
    );
    this.fs.copy(
      this.templatePath('snap/parts/plugins/x-nodejs.py'),
      this.destinationPath(path.join('ubuntu', 'snap/parts/plugins', 'x-nodejs.py'))
    );

    mkdirp.sync('ubuntu/share');
    mkdirp.sync('ubuntu/plugins');
    mkdirp.sync('ubuntu/tmp');
  },

  end: function() {
    var projectPath = this.destinationRoot();
    this.log(chalk.white.bold('To run your app on Ubuntu:'));
    this.log(chalk.white('   Have an Ubuntu emulator running, or a device connected'));
    this.log(chalk.white('   cd ' + projectPath));
    this.log(chalk.white('   react-native run-ubuntu'));
  }
});
