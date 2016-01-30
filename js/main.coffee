rend = ReactDOM.render

$ ->
  util = require './utils/util.coffee'
  require './utils/scroll.coffee'

  # reactify has virtual components which themselves need to call 
  # reactify.  to do this, we make a global components object.
  window.tree.components = require './components/Components.coffee'

  # we load modules that may need to send actions up, so we attach
  # the actions to window here.
  window.tree.actions = require './actions/TreeActions.coffee'

  frag = util.fragpath window.location.pathname.replace /\.[^\/]*$/,''
  window.tree.actions.setCurr frag 
  window.tree.actions.loadPath frag,window.tree.data
  
  head = React.createFactory require './components/AnchorComponent.coffee'
  body = React.createFactory require './components/BodyComponent.coffee'
  rend (head {}, ""),$('#head')[0]
  rend (body {}, ""),$('#body')[0]