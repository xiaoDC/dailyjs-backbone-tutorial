define ['config'], (config)->

    app = null

    class ApiManager extends Backbone.Events
        constructor: (_app) ->
            app = _app
            @.loadGapi()
            return

        init: ->
            self = @
            gapi.client.load 'tasks', 'v1', ->
            handleClientLoad = ->
                gapi.client.setApiKey config.apiKey
                window.setTimeout checkAuth, 100
                return

            checkAuth = ->
                gapi.auth.authorize
                    client_id: config.clientId
                    scope: config.scopes
                    immediate: false
                    , handleAuthResult
                return

            handleAuthResult = (authResult)->
                if authResult and not authResult.error
                    # Schedule a check when the authentication token expires
                    if authResult.expires_in
                        authTimeout = (authResult.expires_in - 5 * 60) * 1000
                        setTimeout checkAuth, authTimeout

                    app.views.auth.$el.hide()
                    $('#signed-in-container').show()
                    self.trigger('ready')

                else
                    if authResult and authResult.error
                        # todo: show eroor
                        console.error 'Unable to sign in:', authResult.error

                    app.views.auth.$el.show()

                return

            handleClientLoad()

            return

        loadGapi: ->
            self = @
            if gapi?
                return @init()

            require ['https://apis.google.com/js/client.js?onload=define'], ->
                checkGAPI = ->
                    if gapi and gapi.client
                        self.init
                    else
                        setTimeout checkGAPI, 100

                checkGAPI()
                return
            return


    Backbone.sync = (method, model, options)->
        options || (options = {})

        switch method
            when 'create'
                request = gapi.client.tasks[model.url].list options.data
                Backbone.gapiRequest request, method, model, options
                return

            when 'update' then
            when 'delete' then
            when 'read' then

    Backbone.gapiRequest = (request, method, model, options) ->
        request.execute (res)->
            if res.error
                if options.error
                    options.error res
                    return
            else if options.success
                result = res.items
                options.success result, true, request
                return

        return

    return ApiManager
