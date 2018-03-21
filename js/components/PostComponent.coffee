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
      codeValue: if @props.type is "code" then "::PLACEHOLDER insert code here"
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
      @setState loading:true
      title = @refs.in.title.value
      comment = @refs.in.comment.value
      code = @refs.in.code?.value
      path = @props.path or "/" # XX deal with root path
      if code
        TreeActions.addPostCode path,@props.spur,title,comment,code
      else
        TreeActions.addPost path,@props.spur,title,comment
      e.preventDefault()

    onChange: (e) -> @setState {value:e.target.value}
    onCodeChange: (e) -> @setState {codeValue:e.target.value}

    render: ->
      titleInput = input {
          disabled: if @state.loading then "true"
          type: "text"
          name: "title"
          placeholder: "Title"
        }

      bodyTextArea = textarea {
          disabled: if @state.loading then "true"
          type:"text"
          name:"comment"
          value:@state.value
          @onChange
        }

      codeTextArea =
        if @props.type is "code"
          textarea {
            disabled: if @state.loading then "true"
            type:"text"
            name:"code"
            value:@state.codeValue
            onChange: @onCodeChange
          }
      
      postButton = input {
          disabled: if @state.loading then "true"
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
            codeTextArea
            postButton
          )
        )
      )
