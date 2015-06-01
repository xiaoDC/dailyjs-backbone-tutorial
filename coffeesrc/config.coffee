define [], ->
    config = {}
    config.apiKey = 'AIzaSyB8DS-VDbodm28DAhI1NEUCTz2AOl-GPYQ'
    config.scopes = 'https://www.googleapis.com/auth/tasks
        https://www.googleapis.com/auth/userinfo.profile'
    config.clientId = '982659432939-3t954q58nkbfuqs4f99ti3ukivoih5nk.apps.googleusercontent.com'

    _.templateSettings =
        interpolate: /\{\{(.+?)\}\}/g

    return config