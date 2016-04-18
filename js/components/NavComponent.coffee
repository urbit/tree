clas        = require 'classnames'

BodyComponent = React.createFactory require './BodyComponent.coffee'
query       = require './Async.coffee'
reactify   = require './Reactify.coffee'

TreeStore   = require '../stores/TreeStore.coffee'
TreeActions = require '../actions/TreeActions.coffee'

Sibs        = React.createFactory require './SibsComponent.coffee'
Dpad        = React.createFactory require './DpadComponent.coffee'

util        = require '../utils/util.coffee'

recl = React.createClass
rend = ReactDOM.render
{div,a,ul,li,button} = React.DOM

Nav = React.createFactory query {
    path:'t'
    kids:
      name:'t'
      head:'r'
      meta:'j'
  }, (recl
    displayName: "Links"
    stateFromStore: -> TreeStore.getNav()
    getInitialState: -> @stateFromStore()
    _onChangeStore: -> if @isMounted() then @setState @stateFromStore()
    componentDidMount: -> TreeStore.addChangeListener @_onChangeStore
    componentWillUnmount: -> TreeStore.removeChangeListener @_onChangeStore

    onClick: -> @toggleFocus()
    onMouseOver: -> @toggleFocus true
    onMouseOut: -> @toggleFocus false
    onTouchStart: -> @ts = Number Date.now()
    onTouchEnd: -> dt = @ts - Number Date.now()

    _home: -> 
      @props.goTo if @props.meta.navhome then @props.meta.navhome else "/"

    toggleFocus: (state) -> $(ReactDOM.findDOMNode(@)).toggleClass 'focus',state
    toggleNav: -> TreeActions.toggleNav()
    closeNav: -> TreeActions.closeNav()

    render: -> 
      attr = {
        @onMouseOver
        @onMouseOut
        @onClick
        @onTouchStart
        @onTouchEnd
        'data-path':@props.dataPath
      }

      if _.keys(window).indexOf("ontouchstart") isnt -1
        delete attr.onMouseOver
        delete attr.onMouseOut

      linksClas = clas
        links: true
        subnav: (@props.meta.navsub?)

      navClas = 
        navbar:     (@props.meta.navmode is 'navbar')
        ctrl:       true
        open:       (@state.open is true)
      if @props.meta.layout 
        for v in @props.meta.layout.split ","
          navClas[v.trim()] = true
      navClas = clas navClas
      iconClass = clas
        icon: true
        'col-md-1':(@props.meta.navmode is 'navbar')

      attr = _.extend attr,{className:navClas,key:"nav"}

      title = if @state.title then @state.title else ""
      dpad  = if @state.dpad isnt false and @props.meta?.navdpad isnt "false"
          (Dpad @props,"") 
        else ""
      sibs  = if @state.sibs isnt false and @props.meta?.navsibs isnt "false"
          (Sibs _.merge(_.clone(@props),{@closeNav}), "") 
        else ""

      itemsClass = clas
        items: true
        'col-md-11':(@props.meta.navmode is 'navbar')

      if @props.meta.navsub
        subprops = _.cloneDeep @props
        subprops.dataPath = subprops.meta.navsub
        delete subprops.meta.navselect
        subprops.className = 'subnav'
        sub = Sibs _.merge(subprops,{@toggleNav}), ""

      toggleClas = clas
        'navbar-toggler':true
        show:@state.subnav?

      div attr,
        div {className:linksClas,key:"links"}, 
          div {className:iconClass}, 
            (div {className:'home',onClick:@_home}, "")
            (div {className:'app'}, title)
            dpad
            (button {
              className:toggleClas
              type:'button'
              onClick:@toggleNav}, "☰")
          (div {className:itemsClass}, 
            sibs
            sub
          )
  ),  recl
    displayName: "Links_loading"
    _home: -> @props.goTo "/"
    render: -> 
      div {
          className:"ctrl",
          "data-path":@props.dataPath,
          key:"nav-loading"
        },
        div {className:'links'},
          div {className:'icon'}, 
            (div {className:'home',onClick:@_home}, "")
          ul {className:"nav"}, 
            li {className:"nav-item selected"}, 
              a {className:"nav-link"}, @props.curr

module.exports = query {
  sein:'t'
  path:'t'
  name:'t'
  meta:'j'
  },(recl
  displayName: "Anchor"
  stateFromStore: -> TreeStore.getNav()
  getInitialState: -> _.extend @stateFromStore(),{url: window.location.pathname}
  _onChangeStore: -> if @isMounted() then @setState @stateFromStore()

  componentWillUnmount: -> 
    clearInterval @interval
    $('body').off 'click', 'a'
    TreeStore.removeChangeListener @_onChangeStore
    
  componentDidUpdate: -> 
    @setTitle()
    @checkRedirect()

  componentDidMount: -> 
    @setTitle()

    window.onpopstate = @pullPath

    TreeStore.addChangeListener @_onChangeStore
        
    _this = @
    $('body').on 'click', 'a', (e) ->
      href = $(@).attr('href')
      if href[0] is "#" then return true;
      if href and not /^https?:\/\//i.test(href)
        e.preventDefault()
        url = new URL @.href
        if urb.util.basepath("",url.pathname) isnt 
        urb.util.basepath("",document.location.pathname)
          document.location = @.href
          return
        if url.pathname.substr(-1) isnt "/"
          url.pathname += "/"
        _this.goTo url.pathname+url.search+url.hash
    @checkRedirect()

  checkRedirect: ->
    if @props.meta.redirect 
      setTimeout (=> (@goTo @props.meta.redirect)), 0

  setTitle: ->
    title = $('#body h1').first().text() || @props.name
    title = @props.meta.title if @props.meta?.title
    document.title = "#{title} - #{@props.path}"

  pullPath: ->
    l = document.location
    path = l.pathname+l.search+l.hash
    @setPath path,false

  setPath: (path,hist) ->
    if hist isnt false
      history.pushState {},"",path
    next = util.fragpath path.split('#')[0]
    if next isnt @props.path
      TreeActions.setCurr next

  reset: ->
    $("html,body").animate {scrollTop:0}
    # $('#nav').attr 'style',''
    # $('#nav').removeClass 'scrolling m-up'
    # $('#nav').addClass 'm-down m-fixed'

  goTo: (path) ->
    @reset()
    @setPath path
  
  render: ->
    return (div {}, "") if @props.meta.anchor is 'none' 

    navClas = clas
      container: @props.meta.container is 'false'

    kidsPath = @props.sein
    kidsPath = @props.meta.navpath if @props.meta.navpath

    kids = [(Nav {
          curr:@props.name
          dataPath:kidsPath
          meta:@props.meta
          sein:@props.sein
          goTo:@goTo
          key:"nav"
        }, "div")]

    if @state.subnav
      kids.push reactify {
          gn:@state.subnav 
          ga:{open:@state.open,toggle:TreeActions.toggleNav}
          c:[]
        }, "subnav"

    div {id:'head', className:navClas}, kids
  )
