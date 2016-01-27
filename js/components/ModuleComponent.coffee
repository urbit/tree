reactify    = require './Reactify.coffee'

recl = React.createClass
{div,span,code} = React.DOM

module.exports = recl
  getInitialState: -> {loaded:false}

  loaded: -> @setState loaded:true # XX handle errors

  componentWillMount: ->
    @js = null
    @css = null

  componentDidMount: ->
    s = document.createElement 'script'
    s.src = @props.js
    s.async = 1
    s.onload = @loaded
    s.onreadystatechange = @loaded
    s.onerror = @loaded
    document.body.appendChild s
    @js = s

    if @props.css
      l = document.createElement 'link'
      l.rel = "stylesheet"
      l.href = @props.css
      document.body.appendChild l
      @css = l

  componentWillUnmount: ->
    if @js then document.body.removeChild @js
    if @css then document.body.removeChild @css
    
  render: ->
    unless @state.loaded
     (div {}, "")
    else (reactify gn:@props.component, ga:@props, c:[])