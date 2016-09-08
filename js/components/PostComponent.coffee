query      = require './Async.coffee'

ForaActions = require '../actions/ForaActions.coffee'

Ship        = require './ShipComponent.coffee'
LoadUser    = require './LoadUserWrapper.coffee'

recl   = React.createClass
rele   = React.createElement
{div,p,h2,img,a,form,textarea,input,code}  = React.DOM
    
module.exports = query {path:'t', spur:'t'}, LoadUser true, recl
  displayName: "Post"
  onSubmit: (e) ->
    title = @refs.in.title.value
    body = @refs.in.body.value
    path = @props.path or "/" # XX deal with root path
    ForaActions.addPost path,@props.spur,title,body
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
          (rele Ship,{ship:@props.user})
          titleInput
          bodyTextArea
          postButton
        )
      )
    )
