recl       = React.createClass
rele       = React.createElement
{div,span} = React.DOM
load       = React.createFactory require './LoadComponent.coffee'

TreeStore   = require '../stores/TreeStore.coffee'

walk = (root,_nil,_str,_comp)->
  # manx: {fork: ["string", {gn:"string" ga:{dict:"string"} c:{list:"manx"}}]}
  _walk = (elem,key)-> switch
    when !elem? then _nil()
    when typeof elem == "string" then _str elem
    when elem.gn?
      {gn,ga,c} = elem
      c = (c?.map _walk) ? []
      _comp.call elem, {gn,ga,c}, key
    else throw "Bad react-json #{JSON.stringify elem}"
  _walk root

Virtual = recl
  displayName: "Virtual"
  getInitialState: -> @stateFromStore()
  stateFromStore: -> components: TreeStore.getVirtualComponents()

  _onChangeStore: ->  if @isMounted() then @setState @stateFromStore()
  componentDidMount: -> TreeStore.addChangeListener @_onChangeStore
  componentWillUnmount: ->  TreeStore.removeChangeListener @_onChangeStore

  render: ->
    {components} = @state
    {basePath} = @props
    walk @props.manx,
      ()-> (load {},"")
      (str)-> str
      ({gn,ga,c},key)->
        props = {key}
        if ga?.style
          try
            ga.style = eval "(#{ga.style})"
          catch e
            ga.style = ga.style
        if components[gn]
          props.basePath = basePath
        rele (components[gn] ? gn),
             (_.extend props, ga),
             c if c.length

reactify = (manx,key,{basePath}={})-> rele Virtual, {manx,key,basePath}
module.exports = _.extend reactify, {walk,Virtual}
