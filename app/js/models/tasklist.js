define(function() {
  var TaskList;
  TaskList = Backbone.Model.extend({
    url: 'tasklists'
  });
  return TaskList;
});
