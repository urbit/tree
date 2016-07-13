husl = require 'husl'

recl   = React.createClass
{div}  = React.DOM

getColor = (s) ->
  hash = s.split('').reduce(((a, b) ->
    a = (a << 5) - a + b.charCodeAt(0)
    a & a
  ), 0)
  husl.toHex(
    hash % 360
    85 - (10 * Math.log(s.length)) + (hash >> 8) % 30
    75 + (hash >> 16) % 15
  )

Ship = ({ship,color})->
    div {
      "data-alias":"~"+window.tree.util.shortShip(ship)
      className:'ship'
      style: "background": if color then getColor ship
    } ,"~",ship

module.exports = Ship
