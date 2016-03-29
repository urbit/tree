query      = require './Async.coffee'

recl = React.createClass
{div,textarea,a,h6,code} = React.DOM

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
  render: ->
    {beak,path,plan} = @props
    {acc,loc,who} = plan ? {}
    issuedBy =
      if urb.sein isnt urb.ship
        "~"+urb.sein
      else "self"
    (div {className:"plan"},
       (code {}, "~"+urb.ship)
       (h6 {}, who) if who?
       (Grid {className:"grid"},
         ["Location:",       loc ? "unknown"]
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
