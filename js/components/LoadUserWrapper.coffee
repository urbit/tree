recl   = React.createClass
rele   = React.createElement

module.exports = (IMMEDIATE, Inner)-> recl
  displayName: "LoadUser"
  getInitialState: -> user: urb.user ? ""
  componentDidMount: ->
    if IMMEDIATE
      urb.init => @setState user: urb.user ? ""

  componentDidUpdate: ->
    if urb.user and not @state.user
      @setState user: urb.user ? ""

  render: -> rele Inner, _.extend {}, @props, @state
