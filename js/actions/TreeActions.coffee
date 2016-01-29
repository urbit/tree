TreeDispatcher    = require '../dispatcher/Dispatcher.coffee'
TreePersistence   = require '../persistence/TreePersistence.coffee'

module.exports =
  loadPath: (path,data) ->
    TreeDispatcher.handleServerAction {path,data,type:"loadPath"}

  sendQuery: (path,query) ->
    return unless query?
    if path.slice(-1) is "/" then path = path.slice(0,-1)
    TreePersistence.get path,query,(err,res) => @loadPath path,res

  registerComponent: (name,comp) -> window.tree.components[name] = comp

  setCurr: (path) ->
    TreeDispatcher.handleViewAction
      type:"setCurr"
      path:path

  setNav: ({title,dpad,sibs,subnav}) ->
    TreeDispatcher.handleViewAction {
      title
      dpad
      sibs
      subnav
      type:"setNav"
    }

  toggleNav: -> TreeDispatcher.handleViewAction {type:"toggleNav"}

  clearNav: ->
    TreeDispatcher.handleViewAction {type:"clearNav"}