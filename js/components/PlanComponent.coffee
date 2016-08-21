load       = require './LoadComponent.coffee'
query      = require './Async.coffee'

TreeActions = require '../actions/TreeActions.coffee'

recl = React.createClass
rele = React.createElement
{div,textarea,button,input,a,h6,code,span} = React.DOM

{table,tbody,tr,td}  = React.DOM      # XX flexbox?
Grid = (props,rows...)-> # Grid [[1,2],null,[3,4],[5,6]]
  _td = (x)-> (div {className:"td"}, x)
  _tr = (x)-> if x? then (div {className:"tr"}, x.map(_td)...)
  (div props, rows.map(_tr)...)

module.exports = query {
  plan:'j'
  beak:'t'
  path:'t'
}, recl
  displayName: "Plan"
  getInitialState: -> edit:no, plan:@props.plan, focus: null, loaded:urb.ship?
  componentDidMount: -> urb.init => @setState {'loaded'}
  componentWillReceiveProps: (props)->
    if _.isEqual @props.plan, @state.plan
      @setState plan: props.plan
    
  refInput: (ref)-> 
    (node)=>
      @[ref] = node
      if ref is @state.focus
        node?.focus()
      
  saveInfo: ->
    plan = {who:@who.value,loc:@loc.value,acc:@props.plan?.acc}
    unless _.isEqual plan, @state.plan
      TreeActions.setPlanInfo plan
      @setState {plan}
    @setState edit:no, focus:null
    
  render: ->
    unless @state.loaded
      return (div {className:"plan"}, "Loading authentication info")
    {beak,path} = @props
    {acc,loc,who} = @state.plan ? {}
    issuedBy =
      if urb.sein isnt urb.ship
        "~"+urb.sein
      else "self"
        
    if urb.user isnt urb.ship
      editButton = null
      editable = (ref,val,placeholder)-> val ? placeholder
    else if @state.edit
      editButton = button {className:'edit', onClick:=> @saveInfo()}, "Save"
      editable = (ref,val,placeholder)=>
        input {
          placeholder
          defaultValue:val
          ref: @refInput ref
          onKeyDown: ({keyCode})=> @saveInfo() if keyCode is 13
        }
    else
      editButton = button {className:'edit', onClick:=> @setState edit:yes}, "Edit"
      editable = (ref,val,placeholder)=>
        span {onClick:=> @setState edit:yes, focus:ref},
          val ? placeholder
          unless @props.plan?[ref] is @state.plan?[ref]
            rele load, {}
    
    (div {className:"plan"},
       (div {className:"home"}, "")
       (div {className:"mono"}, "~"+urb.ship)
       (h6 {}, editable 'who', who, "Sun Tzu") if who? or @state.edit
       (Grid {className:"grid"},
         ["Location:",       (editable 'loc', loc, "Unknown")]
         ["Issued by:",      (a {href:"//"+urb.sein+".urbit.org"}, issuedBy)],
         ["Immutable link:", (a {href:beak+"/web"+path}, beak)],
         ["Connected to:",   div {},
            for key,{usr,url} of acc
              (div {key, className:'service'},
                if !url? then key+"/"+usr
                else a {href:url}, key+"/"+usr
              )
         ] unless _.isEmpty acc 
       )
       editButton
    )
