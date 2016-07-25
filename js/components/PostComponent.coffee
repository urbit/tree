clas    = require 'classnames'

load       = require './LoadComponent.coffee'
query      = require './Async.coffee'
reactify   = require './Reactify.coffee'

TreeActions = require '../actions/TreeActions.coffee'

util        = require '../utils/util.coffee'

Ship        = require './ShipComponent.coffee'

recl   = React.createClass
rele   = React.createElement
{div,p,h2,img,a,form,textarea,input,code}  = React.DOM

DEFER_USER = no

module.exports = query {comt:'j', path:'t', spur:'t'}, recl
    displayName: "Post"
    getInitialState: ->
      loading:null
      value:""
      user: urb.user ? ""

    componentDidMount: ->
      unless DEFER_USER
        urb.init => @setState user:urb.user

    componentDidUpdate: (_props)->
      if urb.user and not @state.user
        @setState user: urb.user ? ""
      if @props.comt.length > _props.comt.length
        @setState loading:null

    onSubmit: (e) ->
      title = @refs.in.title.value
      comment = @refs.in.comment.value
      path = @props.path or "/" # XX deal with root path
      TreeActions.addPost path,@props.spur,title,comment
      e.preventDefault()

    onChange: (e) -> @setState {value:e.target.value}

    render: ->
      _attr = {}
      if @state.loading is true then _attr.disabled = "true"
      titleInput = input _.create _attr, {
                           type: "text"
                           name: "title"
                           placeholder: "Title"
                         }
      bodyTextArea = textarea _.create _attr, {
                              type:"text"
                              name:"comment"
                              value:@state.value
                              @onChange
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
