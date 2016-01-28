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

  frag = util.fragpath window.location.pathname
  window.tree.actions.setCurr frag 
  window.tree.actions.loadPath frag,window.tree.body,window.tree.kids 
  
  head = React.createFactory require './components/AnchorComponent.coffee'
  body = React.createFactory require './components/BodyComponent.coffee'
  rend (head {}, ""),$('#nav')[0]
  rend (body {}, ""),$('#cont')[0]