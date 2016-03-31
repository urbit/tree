load       = require './LoadComponent.coffee'
query      = require './Async.coffee'

TreeActions = require '../actions/TreeActions.coffee'

recl = React.createClass
rele = React.createElement
{div,textarea,button,input,a,h6,code,span} = React.DOM

{table,tbody,tr,td}  = React.DOM      # XX flexbox?
Grid = (props,rows...)-> # Grid [[1,2],null,[3,4],[5,6]]
  _td = (x)-> (td {}, x)
  _tr = (x)-> if x? then (tr {}, x.map(_td)...)
  (table props, (tbody {}, rows.map(_tr)...))

module.exports = query {
  plan:'j'
  beak:'t'
  path:'t'
}, recl
  displayName: "Plan"
  getInitialState: -> edit:no, plan:@props.plan, focus: null
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
      editButton = button {onClick:=> @saveInfo()}, "save"
      editable = (ref,val,placeholder)=>
        input {
          placeholder
          defaultValue:val
          ref: @refInput ref
          onKeyDown: ({keyCode})=> @saveInfo() if keyCode is 13
        }
    else
      editButton = button {onClick:=> @setState edit:yes}, "edit"
      editable = (ref,val,placeholder)=>
        span {onClick:=> @setState edit:yes, focus:ref},
          val ? placeholder
          unless @props.plan?[ref] is @state.plan?[ref]
            rele load, {}
    
    (div {className:"plan"},
       editButton
       (code {}, "~"+urb.ship)
       (h6 {}, editable 'who', who) if who? or @state.edit
       (Grid {className:"grid"},
         ["Location:",       (editable 'loc', loc, "unknown")]
         ["Issued by:",      issuedBy],
         ["Immutable link:", (a {href:beak+"/web"+path}, beak)],
         ["Connected to:",   div {},
            for key,{usr,url} of acc
              (div {key},
                if !url? then key+"/"+usr
                else a {href:url}, key+"/"+usr
              )
         ] unless _.isEmpty acc 
       )
    )
