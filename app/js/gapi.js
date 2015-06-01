var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['config'], function(config) {
  var ApiManager, app;
  app = null;
  ApiManager = (function(superClass) {
    extend(ApiManager, superClass);

    function ApiManager(_app) {
      app = _app;
      this.loadGapi();
      return;
    }

    ApiManager.prototype.init = function() {
      var checkAuth, handleAuthResult, handleClientLoad, self;
      self = this;
      gapi.client.load('tasks', 'v1', function() {});
      handleClientLoad = function() {
        gapi.client.setApiKey(config.apiKey);
        window.setTimeout(checkAuth, 100);
      };
      checkAuth = function() {
        gapi.auth.authorize({
          client_id: config.clientId,
          scope: config.scopes,
          immediate: false
        }, handleAuthResult);
      };
      handleAuthResult = function(authResult) {
        var authTimeout;
        if (authResult && !authResult.error) {
          if (authResult.expires_in) {
            authTimeout = (authResult.expires_in - 5 * 60) * 1000;
            setTimeout(checkAuth, authTimeout);
          }
          app.views.auth.$el.hide();
          $('#signed-in-container').show();
          self.trigger('ready');
        } else {
          if (authResult && authResult.error) {
            console.error('Unable to sign in:', authResult.error);
          }
          app.views.auth.$el.show();
        }
      };
      handleClientLoad();
    };

    ApiManager.prototype.loadGapi = function() {
      var self;
      self = this;
      if (typeof gapi !== "undefined" && gapi !== null) {
        return this.init();
      }
      require(['https://apis.google.com/js/client.js?onload=define'], function() {
        var checkGAPI;
        checkGAPI = function() {
          if (gapi && gapi.client) {
            return self.init;
          } else {
            return setTimeout(checkGAPI, 100);
          }
        };
        checkGAPI();
      });
    };

    return ApiManager;

  })(Backbone.Events);
  Backbone.sync = function(method, model, options) {
    var request;
    options || (options = {});
    switch (method) {
      case 'create':
        request = gapi.client.tasks[model.url].list(options.data);
        Backbone.gapiRequest(request, method, model, options);
        break;
      case 'update':
        break;
      case 'delete':
        break;
      case 'read':
    }
  };
  Backbone.gapiRequest = function(request, method, model, options) {
    request.execute(function(res) {
      var result;
      if (res.error) {
        if (options.error) {
          options.error(res);
        }
      } else if (options.success) {
        result = res.items;
        options.success(result, true, request);
      }
    });
  };
  return ApiManager;
});
