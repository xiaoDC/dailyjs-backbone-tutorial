define ['models/tasklist'], (TaskList) ->
    TaskLists = Backbone.Collection.extend
        model: TaskList
        url: 'tasklists'

    return TaskLists