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

  shortShip: (ship= urb.user ? "")->
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
      d = new Date()
      d.setYear yer
      d.setMonth mon-1
      d.setDate day
    if hor?
      d.setHours hor
      d.setMinutes min
      d.setSeconds sec
    return d

  getKeys: (kids,sortBy) -> _.map (@sortKids kids,sortBy), 'name'
  sortKids: (kids,sortBy=null)-> # kids: {name:'t', bump:'t', meta:'j'}
    kids = _.filter(kids,({meta})-> !(meta?.hide))
    switch sortBy
      when 'bump'
        _.sortBy(kids,
          ({bump,meta,name})=> @dateFromAtom bump || meta?.date || name
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
        for k in _.keys(_kids).sort().reverse()
          _kids[k]
      #
      when null
        _kids = []
        for k,v of kids
          if not v.meta?.sort? # XX throw if inconsistent?
            return _.sortBy(kids,'name')
          _kids[Number(v.meta.sort)] = v
        for k in _.keys(_kids).sort()
          _kids[k]
      #
      else throw new Error "Unknown sort: #{sortBy}"
