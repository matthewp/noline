#!/usr/bin/env node
var fs = require('fs');
var noline = require('../lib/noline');
var denodeify = require('pdenodeify');
var read = denodeify(fs.readFile);
var write = denodeify(fs.writeFile);
var argv = require('yargs')
  .usage('Remove trailing newline characters from a file.')
  .example('$0 foo.js', 'Remove trailing newline characters from foo.js')
  .required(1, 'Must provide a file to remove trailing newlines for')
  .version(require('../package.json').version, 'version')
  .argv;

var files = argv._;
files.map(removeAndSave);

function removeAndSave(fileName) {
  return read(fileName, 'utf8').then(convert).then(save).then(null, warn);

  function save(data) {
    return write(fileName, data, 'utf8');
  }
}

function convert(data) {
  return noline(data);
}

function warn(err) {
  console.error(err);
}
