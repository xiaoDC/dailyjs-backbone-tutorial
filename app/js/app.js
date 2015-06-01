define(['gapi', 'views/app', 'views/auth', 'collections/tasklists'], function(ApiManager, AppView, AuthView, TaskLists) {
  var App;
  App = (function() {
    function App() {
      this.collections.lists = new TaskLists();
      this.views.app = new AppView();
      this.views.app.render();
      this.views.auth = new AuthView();
      this.views.auth.render();
      this.connectGapi();
      return;
    }

    App.prototype.connectGapi = function() {
      var self;
      self = this;
      this.apiManager = new ApiManager(self);
      console.log(this.apiManager);
      this.apiManager.on('ready', function() {
        self.collections.lists.fetch({
          data: {
            userId: '@me',
            success: function(res) {
              _.each(res.models, function(model) {
                return console.log(model.get('title'));
              });
            }
          }
        });
      });
    };

    App.prototype.collections = {};

    App.prototype.views = {};

    return App;

  })();
  return App;
});
