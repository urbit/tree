util = require '../utils/util.coffee'

recl = React.createClass
{div,a} = React.DOM

module.exports = React.createFactory recl
  displayName: "Dpad"

  renderUp: -> if @props.sein then @renderArrow "up",@props.sein

  renderArrow: (name, path) ->
    href = util.basepath path
    (a {href,key:"#{name}",className:"#{name}"},"")

  renderArrows: ->
    keys = util.getKeys @props.kids
    if keys.length > 1
      index = keys.indexOf(@props.curr)
      prev = index-1
      next = index+1
      if prev < 0 then prev = keys.length-1
      if next is keys.length then next = 0
      prev = keys[prev]
      next = keys[next]
    if @props.sein
      sein = @props.sein
      if sein is "/" then sein = "" 
      div {},
        if prev then @renderArrow "prev", "#{sein}/#{prev}"
        if next then @renderArrow "next", "#{sein}/#{next}"

  render: -> 
    (div {className:'dpad',key:'dpad'}, [@renderUp(), @renderArrows()])