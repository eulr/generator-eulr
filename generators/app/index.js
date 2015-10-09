'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.black.bgWhite('eulr') + ' generator!'
    ));

    var prompts = [{
      name: 'app_name',
      message: 'enter the project\'s name pls'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { project_name: this.props.app_name }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { project_name: this.props.app_name }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('Gulpfile.js'),
        this.destinationPath('Gulpfile.js')
      );
    },

    nunjucks_templating: function(){
      this.fs.copy(
        this.templatePath('development/_views/'),
        this.destinationPath('development/_views/')
      );
    },

    styles: function () {
      this.fs.copy(
        this.templatePath('development/_styles/'),
        this.destinationPath('development/_styles/')
      );
    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('development/_scripts/'),
        this.destinationPath('development/_scripts/')
      );
    }
  },

  install: function () {
    this.spawnCommand('bourbon', ['install'], { cwd: 'development/_styles/vendor/'});
    this.installDependencies();
  }
});
