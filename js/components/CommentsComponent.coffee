clas    = require 'classnames'

query      = require './Async.coffee'
reactify   = require './Reactify.coffee'

TreeActions = require '../actions/TreeActions.coffee'

util        = require '../utils/util.coffee'

Ship        = require './ShipComponent.coffee'

recl   = React.createClass
rele   = React.createElement
{div,p,h2,img,a,form,textarea,input,code}  = React.DOM

DEFER_USER = yes

Comment = ({time,user,body,loading=false}) ->
  (div {className:(clas "comment", {loading})},
     "#{window.urb.util.toDate(new Date(time))}",
     (h2 {}, (rele Ship, ship:user))
     (reactify body,"comt",{components:{}})
  )

module.exports = query {comt:'j', path:'t', spur:'t', meta:'j'}, recl
    displayName: "Comments"
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
      {value} = @refs.in.comment
      TreeActions.addComment @props.path, @props.spur, value
      @setState
        value:""
        loading:{'loading', body:{gn:'p',c:[value]}, time:Date.now()}
      e.preventDefault()

    onChange: (e) -> @setState {value:e.target.value}

    render: ->
      _attr = {}
      if @state.loading is true then _attr.disabled = "true"
      textareaAttr = _.create _attr, {
                              type:"text"
                              name:"comment"
                              value:@state.value
                              @onChange
                            }
      inputAttr = _.create _attr, {
                            type:"submit"
                            value:"Add comment"
                            className:"btn btn-primary"
                          }
      
      addComment = 
        (div {key:'add-comment',className:"add-comment"},
          (form {ref:"in",@onSubmit},
            (rele Ship,{ship:@state.user})
            (textarea textareaAttr)
            (input inputAttr)
          )
        )

      comments = @props.comt.map (props,key)->
        rele Comment, _.extend {key}, props
      
      comments.unshift (if @state.loading?
        rele Comment, _.extend {key:'loading'}, @state.loading, user: @state.user
      )

      if "reverse" in (@props.meta.comments?.split(" ") ? [])
        comments = comments.reverse()
        (div {}, [
          (div {key:'comments',className:"comments"}, comments)
          addComment
        ])
      else
        (div {}, [
          addComment
          (div {key:'comments',className:"comments"}, comments)
        ])
