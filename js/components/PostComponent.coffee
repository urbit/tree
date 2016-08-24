query      = require './Async.coffee'

TreeActions = require '../actions/TreeActions.coffee'

Ship        = require './ShipComponent.coffee'

recl   = React.createClass
rele   = React.createElement
{div,p,h2,img,a,form,textarea,input,code}  = React.DOM

DEFER_USER = no

module.exports = query {path:'t', spur:'t'}, recl
    displayName: "Post"
    getInitialState: ->
      user: urb.user ? ""

    componentDidMount: ->
      unless DEFER_USER
        urb.init => @setState user:urb.user

    componentDidUpdate: (_props)->
      if urb.user and not @state.user
        @setState user: urb.user ? ""

    onSubmit: (e) ->
      title = @refs.in.title.value
      body = @refs.in.body.value
      path = @props.path or "/" # XX deal with root path
      TreeActions.addPost path,@props.spur,title,body
      e.preventDefault()


    render: ->
      _attr = {}
      titleInput = input _.create _attr, {
                           type: "text"
                           name: "title"
                           placeholder: "Title"
                         }
      bodyTextArea = textarea _.create _attr, {
                              type:"text"
                              name:"body"
                            }
      postButton = input _.create _attr, {
                            type:"submit"
                            value:"Post"
                            className:"btn btn-primary"
                          }

      (div {},
        (div {className:"add-post"},
          (form {ref:"in",@onSubmit},
            (rele Ship,{ship:@state.user})
            titleInput
            bodyTextArea
            postButton
          )
        )
      )
