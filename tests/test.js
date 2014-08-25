'use strict';


/**
 * Simple assert function
 */
(function(global) {
  var results = document.querySelector('.results'),
      passed = 0,
      failed = 0;

  global.assert = function(statement, assertion) {
    var li = document.createElement('li'),
        type = assertion ? 'Pass' : 'Fail';
    assertion ? passed++ : failed++;
    li.className = type.toLowerCase();
    li.textContent = type + ': ' + statement;
    results.appendChild(li);
  };

  global.assert.total = function(time) {
    results.insertAdjacentHTML('afterend', [
      '<div class="total">Of',
      passed + failed,
      'tests,',
      failed,
      'failed,',
      passed,
      'passed',
      time ? 'in ' + time + ' ms.' : '.',
      '</div>'].join(' ')
    );
  };

})(this);


var start = new Date();
assert('tpl', tpl);
assert('tpl is function', typeof tpl === 'function');
assert('tpl("<a>") returns function', typeof tpl('<a>') === 'function');
assert('tpl("<a>", {}) returns string', typeof tpl('<a>', {}) === 'string');
assert('tpl("<a\'>", {}) returns string', typeof tpl("<a'>", {}) === 'string');
assert('tpl("<a\' \'>", {}) returns string', typeof tpl("<a' '>", {}) === 'string');
var time = new Date() - start;
assert.total(time);
