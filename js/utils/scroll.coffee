TreeActions = require '../actions/TreeActions.coffee'

scroll =
  w:  null # width
  $d: null # continaer
  $n: null # nav
  nh: null # nav height cached
  cs: null # current scroll
  ls: null # last scroll
  cwh: null # current window height
  lwh: null # last window height
  
  track: ->
    @w = $(window).width()
    @$n = $('#head')
    @$d = $('#head .ctrl')
    @nh = $('#head .ctrl').outerHeight(true)

  clearNav: -> @$n.removeClass 'm-up m-down m-fixed'

  resize: -> if @w > 1170 then @clearNav()

  scroll: ->
    unless @$n? and @$d?
      return
    @cs = $(window).scrollTop()
    @cwh = window.innerHeight

    if (@ls-@cs) < 0 and @cwh isnt @lwh
      console.log 'current scroll: ' + @cs
      console.log 'last scroll: ' + @ls
      console.log 'window.innerHeight: ' + window.innerHeight

    if @w > 767 then @clearNav()
    if @w < 767
      dy = @ls-@cs

      @$d.removeClass 'focus'

      if @cs <= 0
        @$n.removeClass 'm-up'
        @$n.addClass 'm-down m-fixed'
        return

      # scrolling up
      if dy > 0
        if not @$n.hasClass 'm-down'
          @$n.removeClass('m-up').addClass 'm-down'
          ct = @$n.offset().top
          top = @cs-@nh
          if @cs > ct and @cs < ct+@nh then top = ct
          # if top < 0 then top = 0
          @$n.offset top:top
        # set fixed when at top
        if @$n.hasClass('m-down') and 
        not @$n.hasClass('m-fixed') and 
        @$n.offset().top >= @cs
          @$n.addClass 'm-fixed'
          @$n.attr {style:''}

      # scrolling down
      if dy < 0
        if @cwh == @lwh
          if not @$n.hasClass 'm-up'
            @$n.removeClass('m-down m-fixed').addClass 'm-up'
            TreeActions.closeNav()
            $('.menu.open').removeClass 'open'
            top = if @cs < 0 then 0 else @cs
            ct = @$n.offset().top
            if top > ct and top < ct+@nh then top = ct
            @$n.offset top:top
          # close when gone if open
          if @$n.hasClass('m-up') and
          @$d.hasClass('open')
            if @cs > @$n.offset().top + @$n.height()
              TreeActions.closeNav()

    @ls = @cs
    @lwh = @cwh


  init: ->
    setInterval @track.bind(@),200

    @ls = $(window).scrollTop()
    @cs = $(window).scrollTop()

    $(window).on 'resize', @resize.bind @
    $(window).on 'scroll', @scroll.bind @

scroll.init()

module.exports = scroll
