clas    = require 'classnames'

load       = require './LoadComponent.coffee'
query      = require './Async.coffee'
reactify   = require './Reactify.coffee'

TreeActions = require '../actions/TreeActions.coffee'

util        = require '../utils/util.coffee'

Ship        = require './ShipComponent.coffee'

recl   = React.createClass
rele   = React.createElement
{div,p,h2,img,a,form,textarea,input}  = React.DOM

DEFER_USER = no

module.exports = query {comt:'j', path:'t', spur:'t'}, recl
    displayName: "Post"
    getInitialState: ->
      loading:null
      title: false
      body:""
      codeBox:""
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

    onTitleChange: (e) -> @setState {title:e.target.value}
    onChange: (e) -> @setState {body:e.target.value}
    onCodeChange: (e) -> @setState {codeBox:e.target.value}

    render: ->
      titleInput = input {
          disabled: if @state.loading then "true"
          type: "text"
          name: "title"
          placeholder: "Title"
          onChange: @onTitleChange
        }

      bodyTextArea = textarea {
          disabled: if @state.loading then "true"
          type:"text"
          name:"comment"
          value:@state.body
          @onChange
        }

      codeTextArea =
        if @props.type is "code"
          textarea {
            disabled: if @state.loading then "true"
            type:"text"
            name:"code"
            style: fontFamily: "monospace" # FIXME just add a className, this is the css' problem
            value:@state.codeBox
            placeholder: ":: insert code here"
            onChange: @onCodeChange
          }
      
      postDisabled =
        if @state.loading then "Processing post"
        else unless @state.title and @state.body and (@state.codeBox or @props.type isnt "code")  #REVIEW clean me
          "Please fill out all inputs"
      postButton = input {
          disabled: if postDisabled then "true"
          title: postDisabled
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
