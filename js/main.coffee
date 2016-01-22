rend = React.render

$ ->
  $body = $('body')

  React.initializeTouchEvents(true)

  head = React.createFactory require './components/AnchorComponent.coffee'
  body = React.createFactory require './components/BodyComponent.coffee'
  window.tree.components = require './components/Components.coffee' # sigh

  TreeActions       = require './actions/TreeActions.coffee'
  TreePersistence   = require './persistence/TreePersistence.coffee'

  window.tree._basepath = window.urb.util.basepath("/")
  window.tree._basepath +=
    (window.location.pathname.replace window.tree._basepath, "").split("/")[0]
  window.tree.basepath = (path) -> 
    prefix = window.tree._basepath
    if prefix is "/" then prefix = ""
    if path[0] isnt "/" then path = "/"+path
    _path = prefix + path
    if _path.slice(-1) is "/" then _path = _path.slice(0,-1)
    _path
  window.tree.fragpath = (path) ->
    path.replace(/\/$/,'')
        .replace(window.tree._basepath,"")

  window.tree.util = 
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

  #
  # initialize
  #
  frag = window.tree.fragpath window.location.pathname
  # set current path
  TreeActions.setCurr frag 
  # load it
  TreeActions.loadPath frag,window.tree.body,window.tree.kids 
  # render components
  rend (head {}, ""),$('#nav')[0]
  rend (body {}, ""),$('#cont')[0]

  so = {}
  so.ls = $(window).scrollTop()
  so.cs = $(window).scrollTop()
  so.$d = $('.nav.container .ctrl')
  setSo = ->
    so.w = $(window).width()
    so.$n = $('.nav.container')
    so.nh = $('.nav.container .ctrl').outerHeight(true)
  setInterval setSo,200

  clearNav = -> so.$n.removeClass 'm-up m-down m-fixed'

  $(window).on 'resize', (e) ->
    if so.w > 1170 then clearNav()
      
  #
  # menu control for mobile
  # 
  $(window).on 'scroll', (e) -> 
    so.cs = $(window).scrollTop()

    if so.w > 1170 then clearNav()
    if so.w < 1170
      dy = so.ls-so.cs

      so.$d.removeClass 'focus'

      if so.cs <= 0
        so.$n.removeClass 'm-up'
        so.$n.addClass 'm-down m-fixed'
        return

      # scrolling up
      if dy > 0
        # attach just above current scroll
        if not so.$n.hasClass 'm-down'
          so.$n.removeClass('m-up').addClass 'm-down'
          ct = so.$n.offset().top
          top = so.cs-so.nh
          if so.cs > ct and so.cs < ct+so.nh then top = ct
          # if top < 0 then top = 0
          so.$n.offset top:so.$n.top
        # set fixed when at top
        if so.$n.hasClass('m-down') and 
        not so.$n.hasClass('m-fixed') and 
        so.$n.offset().top >= so.cs
          so.$n.addClass 'm-fixed'
          so.$n.attr {style:''}

      # scrolling down
      if dy < 0
        # set to fixed if not
        if not so.$n.hasClass 'm-up'
          so.$n.removeClass('m-down m-fixed').addClass 'm-up'
          top = if so.cs < 0 then 0 else so.cs
          ct = so.$n.offset().top
          if top > ct and top < ct+so.nh then top = ct
          so.$n.offset top:top
        # close when gone if open
        if so.$n.hasClass('m-up') and
        so.$d.hasClass('open')
          if so.cs > so.$n.offset().top + so.$n.height()
            so.$d.removeClass 'open'

    so.ls = so.cs
