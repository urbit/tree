clas        = require 'classnames'

BodyComponent = React.createFactory require './BodyComponent.coffee'
query       = require './Async.coffee'

TreeStore   = require '../stores/TreeStore.coffee'
TreeActions = require '../actions/TreeActions.coffee'

Sibs        = require './SibsComponent.coffee'
Dpad        = require './DpadComponent.coffee'

util        = require '../utils/util.coffee'

recl = React.createClass
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
    _onChangeStore: -> @setState @stateFromStore()
    componentDidMount: -> TreeStore.addChangeListener @_onChangeStore
    componentWillUnmount: -> TreeStore.removeChangeListener @_onChangeStore

    onClick: -> @toggleFocus()
    onMouseOver: -> @toggleFocus true
    onMouseOut: -> @toggleFocus false
    onTouchStart: -> @ts = Number Date.now()
    onTouchEnd: -> dt = @ts - Number Date.now()

    toggleFocus: (state) -> $(ReactDOM.findDOMNode(@)).toggleClass 'focus',state
    toggleNav: -> TreeActions.toggleNav()

    render: -> 
      attr = {@onMouseOver,@onMouseOut,@onClick,@onTouchStart,@onTouchEnd}
      if _.keys(window).indexOf("ontouchstart") isnt -1
        delete attr.onMouseOver
        delete attr.onMouseOut
      navClas = clas
        'col-md-2':true
        ctrl:true
        open:(@state.open is true)
      attr = _.extend attr,{className:navClas,key:"nav"}

      title = if @state.title then @state.title else ""
      dpad  = if @state.dpad isnt false then (Dpad @props,"") else ""
      sibs  = if @state.sibs isnt false 
          (Sibs _.merge(@props,{@toggleNav}), "") 
        else ""

      toggleClas = clas
        'navbar-toggler':true
        show:@state.subnav?

      div attr,
        div {className:'links',key:"links"}, 
          div {className:'icon'}, 
            (div {className:'home'}, "")
            (div {className:'app'}, title)
            dpad
            (button {
              className:toggleClas
              type:'button'
              onClick:@toggleNav}, "☰")
          sibs
  ),  recl
    displayName: "Links_loading"
    render: -> 
      div {className:"col-md-2 ctrl",key:"nav-loading"},
        div {className:'links'},
          div {className:'icon'}, 
            (div {className:'home'}, "")
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
  _onChangeStore: -> @setState @stateFromStore()

  componentWillUnmount: -> 
    clearInterval @interval; $('body').off 'click', 'a'
    TreeStore.removeChangeListener @_onChangeStore
  componentDidUpdate: -> @setTitle()
  componentDidMount: -> 
    @setTitle()
    @interval = setInterval @checkURL,100

    TreeStore.addChangeListener @_onChangeStore
        
    _this = @
    $('body').on 'click', 'a', (e) ->
      href = $(@).attr('href')
      if href and not /^https?:\/\//i.test(href)
        e.preventDefault()
        if href?[0] isnt "/"
          href = (document.location.pathname.replace /[^\/]*\/?$/, '') + href
        _this.goTo util.fragpath href

  setTitle: ->
    title = $('#body h1').first().text() || @props.name
    title = @props.meta.title if @props.meta?.title
    document.title = "#{title} - #{@props.path}"

  setPath: (href,hist) ->
    href_parts = href.split("#")
    next = href_parts[0]
    if next.substr(-1) is "/" then next = next.slice(0,-1)
    href_parts[0] = next
    if hist isnt false
      history.pushState {}, "", util.basepath href_parts.join ""
    if next isnt @props.path
      React.unmountComponentAtNode $('#body')[0]
      TreeActions.setCurr next
      React.render (BodyComponent {}, ""),$('#body')[0]

  reset: ->
    $("html,body").animate {scrollTop:0}
    $('#nav').attr 'style',''
    $('#nav').removeClass 'scrolling m-up'
    $('#nav').addClass 'm-down m-fixed'

  goTo: (path) ->
    @reset()
    @setPath path
  
  checkURL: ->
    if @state.url isnt window.location.pathname
      @reset()
      @setPath (util.fragpath window.location.pathname),false
      @setState url: window.location.pathname
  
  render: ->
    return (div {}, "") if @props.meta.anchor is 'none' 

    kids = [(Nav {
          curr:@props.name
          dataPath:@props.sein
          sein:@props.sein
          key:"nav"
        }, "div")]

    if @state.subnav
      kids.push (@state.subnav {key:"subnav",open:@state.open},"")

    div {}, kids
  )