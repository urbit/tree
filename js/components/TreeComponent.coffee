# top level tree component should get rendered to document.body
# and only render two components, head and nav
# each one can determine whether or not it's a container.

query = require './Async.coffee'

clas = require 'classnames'

recf = React.createFactory
recl = React.createClass

head = recf require './NavComponent.coffee'
body = recf require './BodyComponent.coffee'

{div} = React.DOM

module.exports = query {
  body:'r'
  name:'t'
  path:'t'
  meta:'j'
  sein:'t'
}, (recl
  displayName: "Tree"

  render: ->
    treeClas = clas
      container: @props.meta.container isnt 'false'

    (div {className:treeClas},[
      (head {}, "")
      (body {}, "")
    ])
)
