recl = React.createClass
{div} = React.DOM

TreeActions = require '../actions/TreeActions.coffee'

module.exports = recl
  displayName:"Module"
  
  componentDidMount: ->
    setTimeout => TreeActions.setNav 
        title:@props["nav:title"]
        dpad:false if @props["nav:no-dpad"]?
        sibs:false if @props["nav:no-sibs"]?
        subnav:@props["nav:subnav"]
      , 0  # XX dispatch while dispatching

  componentWillUnmount: ->
    # reset tree store state
    TreeActions.clearNav()
    
  render: ->  (div {className:"module"}, @props.children)
