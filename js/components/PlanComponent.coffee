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
  getInitialState: -> edit:no, plan:@props.plan
  componentWillReceiveProps: (props)->
    if _.isEqual @props.plan, @state.plan
      @setState plan: props.plan
      
  saveInfo: ->
    {who,loc} = @refs
    plan = {who:who.value,loc:loc.value,acc:@props.plan?.acc}
    unless _.isEqual plan, @state.plan
      TreeActions.setPlanInfo plan
      @setState {plan}
    
  render: ->
    {beak,path} = @props
    {acc,loc,who} = @state.plan ? {}
    issuedBy =
      if urb.sein isnt urb.ship
        "~"+urb.sein
      else "self"
        
    if @state.edit
      editButton = button {onClick:=> @saveInfo(); @setState edit:no}, "save"
      editable = (ref,s)=> input {ref,defaultValue:s}
    else
      editButton = button {onClick:=> @setState edit:yes}, "edit"
      editable = (ref,s)=>
        loading = unless @props.plan?[ref] is @state.plan?[ref]
          rele load, {}
        span {}, s, loading
    
    (div {className:"plan"},
       editButton if urb.user is urb.ship
       (code {}, "~"+urb.ship)
       (h6 {}, editable 'who', who) if who? or @state.edit
       (Grid {className:"grid"},
         ["Location:",       (editable 'loc', (loc ? "unknown"))]
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
