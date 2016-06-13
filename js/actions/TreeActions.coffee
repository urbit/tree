TreeDispatcher    = require '../dispatcher/Dispatcher.coffee'
TreePersistence   = require '../persistence/TreePersistence.coffee'

module.exports =
  loadPath: (path,data) ->
    TreeDispatcher.handleServerAction {path,data,type:"loadPath"}

  loadSein: (path,data) ->
    TreeDispatcher.handleServerAction {path,data,type:"loadSein"}

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
  registerScriptElement: (elem)-> TreePersistence.waspElem elem
    
  addVirtual: (components) ->
    TreeDispatcher.handleViewAction {type:"addVirtual", components}

  addComment: (pax,sup,txt)->
    TreePersistence.put {pax,sup,txt}, "talk-comment", "talk", (err,res)=>
      if !err?
        @clearData()
    
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
  closeNav: -> TreeDispatcher.handleViewAction {type:"closeNav"}

  clearNav: ->
    TreeDispatcher.handleViewAction {type:"clearNav"}
