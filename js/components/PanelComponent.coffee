recl = React.createClass
rele = React.createElement
{nav,ul,li,a} = React.DOM

module.exports = recl
  render: ->
    if !urb.user? or urb.user isnt urb.ship
      (nav {className:"navbar panel"}, [
        (ul {className:"nav navbar-nav"},[
          (li {className:'nav-item pull-right'}, 
            (a {href:"/~~"}, "Log in"))
        ])
      ])

    else
      (nav {className:"navbar panel"}, [
        (ul {className:"nav navbar-nav"},[
          (li {className:"nav-item"}, 
            (a {href:"/~~/talk"}, "Talk"))
          (li {className:"nav-item"}, 
            (a {href:"/~~/dojo"}, "Dojo"))
          (li {className:"nav-item"}, 
            (a {href:"/~~/static"}, "Static"))
          (li {className:'nav-item pull-right'}, 
            (a {href:"/~/away"}, "Log out"))
        ])
      ])
