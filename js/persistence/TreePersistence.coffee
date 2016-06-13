util        = require '../utils/util.coffee'
dedup = {}  # XX wrong layer

pending = {}
waspWait = []

module.exports =
  refresh: -> dedup = {}
  get: (path,query="no-query",cb) ->
    url = "#{util.basepath(path)}.tree-json?q=#{@encode query}"
    return if dedup[url]
    dedup[url] = true
    pending[url] = true
    $.get url, {}, (data,status,xhr) ->  # XX on error
      delete pending[url]
      if urb.wasp?
        dep = urb.getXHRWasp(xhr)
        urb.sources[dep] = url # debugging info
        waspWait.push dep
        if _.isEmpty pending
          waspWait.map urb.waspData
          waspWait = []
      if cb then cb null,data
    
  put: (data,mark,appl,cb)->
    appl ?= /[a-z]*/.exec(mark)[0]
    urb.init -> urb.send data, {mark,appl}, cb

  waspElem: (a)->
    if urb.wasp?
      urb.waspElem a
    
  encode: (obj)->
    delim = (n)-> Array(n+1).join('_') || '.'
    _encode = (obj)->
      if typeof obj isnt 'object'
        return [0,obj]
      dep = 0
      sub = for k,v of obj
        [_dep,res] = _encode v
        dep = _dep if _dep > dep
        k+(delim _dep)+res if res?
      dep++
      [dep, sub.join delim dep]
    (_encode obj)[1]
