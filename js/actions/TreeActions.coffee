TreeDispatcher    = require '../dispatcher/Dispatcher.coffee'
TreePersistence   = require '../persistence/TreePersistence.coffee'

_initialLoad = true # XX right place?
_initialLoadDedup = {}

module.exports =
  loadPath: (path,data) ->
    TreeDispatcher.handleServerAction {path,data,type:"loadPath"}

  loadSein: (path,data) ->
    TreeDispatcher.handleServerAction {path,data,type:"loadSein"}

  clearData: () ->
    _initialLoad = false
    _initialLoadDedup = {}
    TreePersistence.refresh()  # XX right place?
    TreeDispatcher.handleServerAction {type:"clearData"}

  sendQuery: (path,query) ->
    return unless query?
    if _initialLoad
      key = path+(JSON.stringify query)
      unless _initialLoadDedup[key]
        _initialLoadDedup[key] = true
        console.warn "Requesting data during initial page load", (JSON.stringify path), query
    if path.slice(-1) is "/" then path = path.slice(0,-1)
    TreePersistence.get path,query,(err,res) =>
      if err? then throw err
      @loadPath path,res

  registerComponent: (name,comp) -> @addVirtual "#{name}": comp
  registerScriptElement: (elem)-> TreePersistence.waspElem elem

  addVirtual: (components) ->
    TreeDispatcher.handleViewAction {type:"addVirtual", components}

  addComment: (pax,sup,txt)->
    TreePersistence.put {pax,sup,txt}, "fora-comment", "fora", (err,res)=>
      if !err?
        @clearData()

  addPost: (pax,sup,hed,txt)->
    TreePersistence.put {pax,sup,hed,txt}, "fora-post", "fora", (err,res)=>
      if !err?
        @clearData()
        history.pushState {},"",".."
        @setCurr pax

  setPlanInfo: ({who,loc})->
    TreePersistence.put {who,loc}, "write-plan-info", "hood"

  setCurr: (path,init=false) ->
    _initialLoad &= init
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
