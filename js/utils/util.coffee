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

  dateFromAtom: (date)->
    [yer,mon,day,__,hor,min,sec] = # ~y.m.d..h.m.s
      date.slice(1).split "."
    if day?
      str = "#{yer}-#{mon}-#{day}"
      if hor?
        str += " #{hor}:#{min}:#{sec}"
      new Date(str)

  getKeys: (kids) -> _.map (@sortKids kids), 'name'
  sortKids: (kids,sortBy=null)-> # kids: {name:'t', bump:'t', meta:'j'}
    kids = _.filter(kids,({meta})-> !(meta?.hide))
    switch sortBy
      when 'bump'
        _.sortBy(kids,
          ({bump,name})-> bump || name
        ).reverse()
      #
      when 'date'
        _kids = []
        for k,v of kids
          if not v.meta?.date? # XX throw?
            return _.sortBy(kids,'name')
          date = @dateFromAtom v.meta.date
          unless date? # XX throw
            return _.sortBy(kids,'name')
          _k = Number(new Date(date))
          _kids[_k] = v
        _.values(_kids).reverse()
      #
      when null
        _kids = []
        for k,v of kids
          if not v.meta?.sort? # XX throw if inconsistent?
            return _.sortBy(kids,'name')
          _kids[Number(v.meta.sort)] = v
        _.values _kids
      #
      else throw new Error "Unknown sort: #{sortBy}"
