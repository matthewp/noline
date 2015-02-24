  var os = require('os');
  var exp = new RegExp(os.EOL + '$');

  module.exports = function hasTrailingNewline (text) {
    return text.replace(exp, '');
  };
