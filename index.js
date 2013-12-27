var istanbul = require('istanbul');

var ThresholdReporter = function(baseReporterDecorator, config, logger, helper, formatError) {
  var log = logger.create('reporter.threshold');
  var reporterConfig = config.thresholdReporter || {};

  var suites;
  var pendingFileWritings = 0;
  var fileWritingFinished = function() {};
  var allMessages = [];

  baseReporterDecorator(this);

  this.adapters = [function(msg) {
    allMessages.push(msg);
  }];

  this.onRunStart = function(browsers) {
    log.warn('onRunStart');
  };

  this.onBrowserStart = function(browser) {
    log.warn('onBrowserStart');
  };

  this.onBrowserComplete = function(browser) {
    log.warn('onBrowserComplete');
  };

  this.onRunComplete = function() {
    log.warn('onRunComplete');
  };

  this.onSpecComplete = function(browser, result) {
    log.warn('onSpecComplete');
    if (result.coverage) {
      log.warn('Browser: ' +  browser.id + ', Spec Coverage : ' + result.coverage)
    }
  };

  // wait for writing all the xml files, before exiting
  this.onExit = function(done) {
    log.warn('onExit');
    done();
  };
};

ThresholdReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:threshold': ['type', ThresholdReporter]
};