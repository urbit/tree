_basepath = window.urb.util.basepath("/")
_basepath +=
  (window.location.pathname.replace window.tree._basepath, "").split("/")[0]

module.exports =
  components:
    ship: require '../components/ShipComponent.coffee'
    
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
    else if ship.length == 27
      ship[14...20] + "^" + ship[-6...]
    else
      ship[0...6] + "_" + ship[-6...] # s/(.{6}).*(.{6})/\1_\2/

  getKeys: (kids) -> _.map (@sortKids kids), 'name'
  sortKids: (kids,sortBy)->
    if sortBy is 'bump'
      return _.sortBy(kids,
        ({bump,name})-> bump || name
      ).reverse()

    _kids = []
    for k,elem of kids
      meta = elem.meta ? {}
      if sortBy
        if sortBy is 'date'
          if not meta.date? # XX throw?
            return _.sortBy(kids,'name')
          _k = Number meta.date.slice(1).replace /\./g,""
          _kids[_k] = elem
      else
        if not meta.sort? # XX throw if inconsistent?
          return _.sortBy(kids,'name')
        _kids[Number(meta.sort)] = elem
    if sortBy is 'date' then _kids.reverse()
    _.values _kids

