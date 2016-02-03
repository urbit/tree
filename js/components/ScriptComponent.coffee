recl = React.createClass
rele = React.createElement

# Script eval shim
module.exports = recl
  displayName:"Script"
  componentDidMount: ->
    s = document.createElement 'script'
    _.assign s, @props
    urb.waspElem s
    document.body.appendChild s
    @js = s

  componentWillUnmount: -> document.body.removeChild @js
    
  render: ->  rele "script", @props
