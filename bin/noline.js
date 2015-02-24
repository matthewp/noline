#!/bin/env node
var fs = require('fs');
var noline = require('../lib/noline');
var denodeify = require('pdenodeify');
var read = denodeify(fs.readFile);
var write = denodeify(fs.writeFile);

var fileName = 'foo.js';

read(fileName, 'utf8').then(convert).then(save).then(null, warn);

function convert(data) {
  return noline(data);
}

function save(data) {
  return write(fileName, data, 'utf8');
}

function warn(err) {
  console.error(err);
}
