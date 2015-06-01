define ['text!templates/auth.html'], (template) ->
    AuthView = Backbone.View.extend
        el: '#sign-in-container'
        template:_.template template

        events:
            'click #authorize-button': 'auth'

        initialize: (app) ->
            @.app = app
            return

        render: ->
            @.$el.html @.template()
            return this

        auth: ->
            @.app.apiManager.checkAuth()
            return false

    return AuthView