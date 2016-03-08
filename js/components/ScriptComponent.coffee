recl = React.createClass
rele = React.createElement

waitingScripts = null  # null = none waiting, [] = one in flight, [...] = blocked
appendNext = -> 
  unless waitingScripts?
    return
  if waitingScripts.length is 0
    waitingScripts = null
  else
    document.body.appendChild waitingScripts.shift()

# Script eval shim
module.exports = recl
  displayName:"Script"
  componentDidMount: ->
    s = document.createElement 'script'
    _.assign s, @props
    urb.waspElem s
    s.onload = appendNext
    @js = s
    if waitingScripts?
      waitingScripts.push s
    else
      waitingScripts = [s]
      appendNext()

  componentWillUnmount: -> 
    if @js.parentNode == document.body
      document.body.removeChild @js
    
  render: ->  rele "script", @props
