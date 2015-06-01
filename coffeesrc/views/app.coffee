define ['text!templates/app.html'], (template) ->
    AppView = Backbone.View.extend
        id: 'main'
        tagName: 'div'
        className: 'container-fluid'
        el: 'body'
        template:_.template template

        events: {}

        initialize: ->

        render: ->
            @.$el.html @.template()
            return this

    return AppView