util = require '../utils/util.coffee'
clas        = require 'classnames'
reactify    = require './Reactify.coffee'

recl = React.createClass
{ul,li,a} = React.DOM

module.exports = React.createFactory recl
  displayName:"Siblings"
  toText: (elem)-> reactify.walk elem,
                             ()->''
                             (s)->s
                             ({c})->(c ? []).join ''
  render: ->
    keys = util.getKeys @props.kids

    navClas = clas
      nav: true
      'col-md-10': (@props.meta.navmode is 'navbar')

    ul {className:navClas}, keys.map (key) =>
      href = util.basepath @props.path+"/"+key
      data = @props.kids[key]
      head = data.meta.title if data.meta
      head ?= @toText data.head
      head ||= key
      className = clas
        "nav-item": true
        selected: key is @props.curr
      if data.meta.sibsclass
        className += " "+clas(data.meta.sibsclass.split(","))
      (li {className,key}, 
        (a {className:"nav-link",href,onClick:@props.toggleNav}, head))
