clas        = require 'classnames'

util        = require '../utils/util.coffee'

reactify    = require './Reactify.coffee'
query       = require './Async.coffee'

recl = React.createClass
{div,a,ul,li,hr} = React.DOM

module.exports = query {kids: {name:'t', bump:'t', body:'r', meta:'j', path:'t'}}, recl
  displayName: "Kids"
  render: ->
    kids = util.sortKids @props.kids, @props.sortBy
    
    kidsClas = clas
      kids:true
      @props.className

    kidClas = clas
      "col-md-4":(@props.grid is 'true')

    div {className:kidsClas,key:"kids"},
      for elem in kids
        body = reactify elem.body, null, {basePath:elem.path}
        [(div {key:elem.name,id:elem.name,className:kidClas}, body), (hr {})]
