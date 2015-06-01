define ['gapi', 'views/app', 'views/auth', 'collections/tasklists'],
(ApiManager, AppView, AuthView, TaskLists)->

    class App
        constructor: ->
            @.collections.lists = new TaskLists()

            @.views.app = new AppView()
            @.views.app.render()

            @.views.auth = new AuthView()
            @.views.auth.render()

            @.connectGapi()
            return

        connectGapi: ->
            self = this
            @.apiManager = new ApiManager(self)
            console.log @.apiManager
            @.apiManager.on 'ready', ->
                self.collections.lists.fetch
                    data:
                        userId: '@me'
                        success: (res)->
                            _.each res.models, (model) ->
                                console.log model.get('title')
                            return
                return

            return
        collections:{}
        views:{}


    App