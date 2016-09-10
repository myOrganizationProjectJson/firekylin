'use strict';
/**
 * template config
 */

exports.__esModule = true;
exports.default = {
  type: 'nunjucks',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    nunjucks: {
      prerender: function prerender(nunjucks, env) {
        return env.addFilter('utc', function (time) {
          return new Date(time).toUTCString();
        });
      }
    }
  }
};