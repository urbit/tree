module.exports = _.extend new Flux.Dispatcher(), {
  handleServerAction: (action) ->
    @dispatch
      source: 'server'
      action: action

  handleViewAction: (action) ->
    @dispatch
      source: 'view'
      action: action
}