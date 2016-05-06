recl = React.createClass
{div} = React.DOM

module.exports = recl
  displayName: "ImagePanel"
  render: ->
    div({
      className:"image-container",
      style:{backgroundImage:"url('"+@props.src+"')"}
    })
