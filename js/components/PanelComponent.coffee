recl = React.createClass
rele = React.createElement
{div,textarea,button,input,a,h6,code,span} = React.DOM

module.exports = recl
  render: ->
    if urb.user isnt urb.ship
      (div {className:"panel"}, [
        (div {}, "Log in")
      ])
    else
      (div {className:"panel"}, [
        (div {}, "Talk")
        (div {}, "Dojo")
        (div {}, "Static")
        (div {}, "Log out")
      ])
