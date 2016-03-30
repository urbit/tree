TreeDispatcher    = require '../dispatcher/Dispatcher.coffee'
TreePersistence   = require '../persistence/TreePersistence.coffee'

module.exports =
  loadPath: (path,data) ->
    TreeDispatcher.handleServerAction {path,data,type:"loadPath"}

  clearData: () ->
    TreePersistence.refresh()  # XX right place?
    TreeDispatcher.handleServerAction {type:"clearData"}

  sendQuery: (path,query) ->
    return unless query?
    if path.slice(-1) is "/" then path = path.slice(0,-1)
    TreePersistence.get path,query,(err,res) => 
      if err? then throw err
      @loadPath path,res

  registerComponent: (name,comp) -> @addVirtual "#{name}": comp
  addVirtual: (components) ->
    TreeDispatcher.handleViewAction {type:"addVirtual", components}

  addComment: (pax,txt)->
    if pax[0] isnt "/" then pax = "/"+pax
    TreePersistence.put {pax,txt}, "talk-comment"
    
  setPlanInfo: ({who,loc})->
    TreePersistence.put {who,loc}, "write-plan-info", "hood"
  
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
