clas    = require 'classnames'

load       = require './LoadComponent.coffee'
query      = require './Async.coffee'
reactify   = require './Reactify.coffee'

TreeActions = require '../actions/TreeActions.coffee'

util        = require '../utils/util.coffee'

recl   = React.createClass
rele   = React.createElement
{div,p,img,a,form,textarea,input}  = React.DOM

Comment = ({time,body,loading=false}) ->
  
  (div {className:(clas "comment", {loading})},
     "#{window.urb.util.toDate(new Date(time))}",
     (reactify body)
  )

module.exports = query {comt:'j', path:'t'}, recl
    displayName: "Comments"
    getInitialState: -> 
      loading:null
      value:""
    componentDidUpdate: (_props)->
      if @props.comt.length > _props.comt.length
        @setState loading:null
        
    onSubmit: (e) ->
      {value} = @refs.in.comment
      TreeActions.addComment @props.path, value
      body = {gn:'div', c:[           # XX structured user/content
        {gn:'h2',c:["~"+urb.user]}
        {gn:'p',c:[value]}
      ]}
      @setState 
        value:""
        loading:{'loading', body, time:Date.now()}
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

      (div {}, 
        (div {className:"add-comment"},
          (form {ref:"in",@onSubmit},
            (textarea textareaAttr),
            (input inputAttr)
          )
        )
        (div {className:"comments"},
          (if @state.loading? then rele Comment, @state.loading),
          @props.comt.map (props,key)-> 
            rele Comment, _.extend {key}, props
        )
      )
