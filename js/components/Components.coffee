recl       = React.createClass
{div}      = React.DOM

module.exports = 
  codemirror: require './CodeMirror.coffee'
  search:     require './SearchComponent.coffee'
  list:       require './ListComponent.coffee'
  kids:       require './KidsComponent.coffee'
  toc:        require './TocComponent.coffee'
  email:      require './EmailComponent.coffee'
  module:     require './ModuleComponent.coffee'
  lost:       recl render: -> (div {}, "<lost(", @props.children, ")>")
