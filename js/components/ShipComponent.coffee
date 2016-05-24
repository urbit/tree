recl   = React.createClass
{div}  = React.DOM

module.exports = recl
  render: ->
    attr =
      "data-alias":"~"+window.tree.util.shortShip(@props.ship)
      className:'ship'
    (div attr,"~",@props.ship)
