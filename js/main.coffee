rend = ReactDOM.render

$ ->
  util = require './utils/util.coffee'
  require './utils/scroll.coffee'

  # reactify has virtual components which themselves need to call 
  # reactify.  to do this, we make a global components object.
  window.tree.components = require './components/Components.coffee'

  TreeActions = require './actions/TreeActions.coffee'

  frag = util.fragpath window.location.pathname
  TreeActions.setCurr frag 
  TreeActions.loadPath frag,window.tree.body,window.tree.kids 
  
  head = React.createFactory require './components/AnchorComponent.coffee'
  body = React.createFactory require './components/BodyComponent.coffee'
  rend (head {}, ""),$('#nav')[0]
  rend (body {}, ""),$('#cont')[0]