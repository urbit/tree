{EventEmitter} = require('events').EventEmitter

MessageDispatcher = require '../dispatcher/Dispatcher.coffee'
clog = console.log.bind(console)

_virt = {}
_tree = {}
_data = {}
_curr = ""
_nav  = {}

QUERIES = {body:'r', head:'r', snip:'r', sect:'j', meta:'j'}

TreeStore = _.extend (new EventEmitter), {
  addChangeListener: (cb) -> @on 'change', cb

  removeChangeListener: (cb) -> @removeListener "change", cb

  emitChange: -> @emit 'change'

  pathToArr: (_path) -> _path.split "/"
    
  fulfill: (path,query) ->
    if path is "/" then path = ""
    @fulfillAt (@getTree path.split '/'),path,query
  fulfillAt: (tree,path,query)->
    data = @fulfillLocal path, query
    have = _data[path]
    if have?
      for k,t of query when QUERIES[k]
        if t isnt QUERIES[k] then throw TypeError "Wrong query type: #{k}, '#{t}'"
        data[k] = have[k]
      if query.kids
        if have.kids is false
          data.kids = {}
        else for k,sub of tree
          data.kids ?= {}
          data.kids[k] = @fulfillAt sub, path+"/"+k, query.kids
    data unless _.isEmpty data
      
  fulfillLocal: (path, query)->
    data = {}
    if query.path then data.path = path
    if query.name then data.name = path.split("/").pop()
    if query.sein then data.sein = @getPare path
    if query.next then data.next = @getNext path
    if query.prev then data.prev = @getPrev path
    data

  setCurr: ({path}) -> _curr = path
  getCurr: -> _curr

  addVirtual: ({components}) -> _.extend _virt, components
  getVirtualComponents: -> _virt
  
  loadPath: ({path,data}) ->
    @loadValues (@getTree (path.split '/'),true), path, data
  loadValues: (tree,path,data) ->
    old = _data[path] ? {}
    for k of data when QUERIES[k]
      old[k] = data[k]
    
    for k,v of data.kids
      tree[k] ?= {}
      @loadValues tree[k], path+"/"+k, v
      
    if data.kids && _.isEmpty data.kids
      old.kids = false
        
    _data[path] = old

  getSiblings: (path=_curr)->
    curr = path.split("/")
    curr.pop()
    if curr.length isnt 0
      @getTree curr
    else
      {}
  
  getTree: (_path,make=false) ->
    tree = _tree
    for sub in _path
      if not tree[sub]?
        if not make then return null
        tree[sub] = {}
      tree = tree[sub]
    tree
      
  getPrev: (path=_curr)-> 
    sibs = _.keys(@getSiblings path).sort()
    if sibs.length < 2
      null
    else
      par = path.split "/"
      key = par.pop()
      ind = sibs.indexOf key
      win = if ind-1 >= 0 then sibs[ind-1] else sibs[sibs.length-1]
      par.push win
      par.join "/"

  getNext: (path=_curr)-> 
    sibs = _.keys(@getSiblings path).sort()
    if sibs.length < 2
      null
    else
      par = path.split "/"
      key = par.pop()
      ind = sibs.indexOf key
      win = if ind+1 < sibs.length then sibs[ind+1] else sibs[0]
      par.push win
      par.join "/"

  getPare: (path=_curr)-> 
    _path = @pathToArr path
    if _path.length > 1
      _path.pop()
      _path = _path.join "/"
      if _path is "" then _path = "/"
      _path
    else
      null

  setNav: ({title,dpad,sibs,subnav}) ->  
    nav = {
      title
      dpad
      sibs
      subnav
      open:(if _nav.open then _nav.open else false)
    }
    _nav = nav
  getNav: -> _nav
  toggleNav: -> _nav.open = !_nav.open
  clearNav: -> 
    _nav = 
      title:null
      dpad:null
      sibs:null
      subnav:null
      open:false
}

TreeStore.dispatchToken = MessageDispatcher.register (p) ->
  a = p.action

  if TreeStore[a.type]
    TreeStore[a.type] a
    TreeStore.emitChange()

module.exports = TreeStore
