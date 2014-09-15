'use strict';


(function(global) {
  var cache = {};

  /**
   * Micro template engine adapted from:
   * Simple JavaScript Templating
   * by John Resig - http://ejohn.org/ - MIT Licensed
   * http://ejohn.org/blog/javascript-micro-templating/
   *
   * Use:
   * <% expression %> for expression to interpret;
   * <%= value %> for values to escape;
   * <%: value %> for raw value (no further escaping).
   */
  global.tpl = function(str, data) {
    var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
        tpl(document.getElementById(str).innerHTML) :
        new Function('_', compose(str));
    return arguments.length > 1 ? fn(data) : fn;
  };

  function compose(str) {
    var s = ("var p=[];p.push('" + str
          .replace(/>\s*[\r\n\t]+\s*/mg, '>')
          .replace(/\s*[\r\n\t]+\s*</mg, '<')
          .replace(/\s*[\r\n\t]\s*/mg, ' ')
          .replace(/<%/g, '\n')
          .replace(/(.*%>)?(.*'.*)/g, apos)
          .replace(/^:(.+)%>/mg, "',$1,'")
          .replace(/^=(.+)%>/mg, "',tpl.esc($1),'")
          .replace(/^(.+)%>/mg, "');$1p.push('")
          .replace(/\n/g, '') + "');return p.join('');"
        ).replace(/p.push\(''\);/g, '');
    return s;
  }

  /* Escape backslashes and apostrophes */
  function apos($1, $2, $3) {
    return /%>/.test($3) ?
        $3 : $2 + $3.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }

  var entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };

  function replacement(s) {
    return entities[s];
  }

  /* Escape predefined entities */
  global.tpl.esc = function(string) {
    return String(string).replace(/[&<>"']/g, replacement);
  };
})(this);
