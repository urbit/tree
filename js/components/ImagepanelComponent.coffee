recl = React.createClass
name = (displayName,component)-> _.extend component, {displayName}
{div} = React.DOM

module.exports = name "ImagePanel", ({src})->
  div({
    className:"image-container",
    style:{backgroundImage:"url('#{src}')"}
  })
