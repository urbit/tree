rend = ReactDOM.render

$ ->
  util = require './utils/util.coffee'
  window.tree.util = util
  require './utils/scroll.coffee'

  if document.location.pathname.substr(-1) isnt "/"
    history.replaceState {}, "",document.location.pathname+"/"+
      document.location.search+
      document.location.hash

  # we load modules that may need to send actions up, so we attach
  # the actions to window here.
  window.tree.actions = require './actions/TreeActions.coffee'

  # reactify has virtual components which themselves need to call
  # reactify.  to do this, we register the components after the fact
  window.tree.actions.addVirtual require './components/Components.coffee'

  frag = util.fragpath window.location.pathname.replace /\.[^\/]*$/,''
  window.tree.actions.setCurr frag, true
  window.tree.actions.loadPath frag,window.tree.data
  if window.tree.sein?
    window.tree.actions.loadSein frag,window.tree.sein

  main = React.createFactory require './components/TreeComponent.coffee'
  rend (main {}, ""),document.getElementById('tree')

