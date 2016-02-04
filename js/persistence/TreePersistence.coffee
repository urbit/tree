util        = require '../utils/util.coffee'
dedup = {}  # XX wrong layer

module.exports =
  get: (path,query="no-query",cb) ->
    url = "#{util.basepath(path)}.tree-json?q=#{@encode query}"
    return if dedup[url]
    dedup[url] = true
    $.get url, {}, (data,status,xhr) ->
      urb.waspLoadedXHR.call(xhr)
      if cb then cb null,data
    
  put: (mark,pax,txt)-> urb.send {pax,txt}, {mark,appl:'hood'}

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
