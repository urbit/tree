_basepath = window.urb.util.basepath("/")
_basepath +=
  (window.location.pathname.replace window.tree._basepath, "").split("/")[0]

module.exports = 
  basepath: (path) ->
    prefix = _basepath
    if prefix is "/" then prefix = ""
    if path[0] isnt "/" then path = "/"+path
    _path = prefix + path
    if _path.slice(-1) is "/" and _path.length > 1
      _path = _path.slice(0,-1)
    _path

  fragpath: (path) ->
    path.replace(/\/$/,'')
        .replace(_basepath,"")
      
  shortShip: (ship=urb.user)->
    if ship.length <= 13
      ship
    else
      ship[0...6] + "_" + ship[-6...] # s/(.{6}).*(.{6})/\1_\2/

  getKeys: (kids) -> # child node keys, respecting metadata
    # kids = _.filter(kids,({meta})-> !(meta?.hide))
    # unless _.all(kids, ({meta})-> meta?.sort?)
    #   _.keys(kids).sort()
    # else
    #   order = []
    #   for k,{meta} of kids
    #     order[meta.sort] = k
    #   _.values order
    # # XX test!
    sorted = true
    keys = []
    for k,v of kids
      continue if v.meta?.hide
      if not v.meta?.sort? then sorted = false
      keys[Number(v.meta?.sort)] = k
    if sorted isnt true
      keys = _.keys(kids).sort()
    else
      keys = _.values keys
