requirejs.config({
  baseUrl: 'js',
  paths: {
    text: 'lib/text'
  },
  shim: {
    'lib/underscore-min': {
      exports: '_'
    },
    'lib/jquery-min': {
      exports: 'jquery'
    },
    'lib/backbone-min': {
      deps: ['lib/underscore-min', 'lib/jquery-min'],
      exports: 'Backbone'
    },
    "app": {
      deps: ['lib/underscore-min', 'lib/backbone-min']
    }
  }
});

require(['app'], function(App) {
  window.bTask = new App();
});
