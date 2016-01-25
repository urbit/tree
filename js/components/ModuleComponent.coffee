reactify    = require './Reactify.coffee'

recl = React.createClass
{div,span,code} = React.DOM

module.exports = recl
  getInitialState: -> {loaded:false}

  loaded: -> @setState loaded:true # XX handle errors

  componentDidMount: ->
    s = document.createElement 'script'
    s.src = @props.path
    s.async = 1
    s.onload = @loaded
    s.onreadystatechange = @loaded
    s.onerror = @loaded
    document.body.appendChild s
    # $.getScript @props.path
    #   .done () =>
    #     @setState loaded:true
    #   .fail () ->
    #     console.log 'loading scrip tfailed'
    #     console.log arguments
  
  render: ->
    unless @state.loaded
     (div {}, "")
    else (reactify gn:@props.component, ga:@props, c:[])