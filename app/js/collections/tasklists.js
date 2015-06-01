define(['models/tasklist'], function(TaskList) {
  var TaskLists;
  TaskLists = Backbone.Collection.extend({
    model: TaskList,
    url: 'tasklists'
  });
  return TaskLists;
});
