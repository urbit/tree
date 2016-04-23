util = require '../utils/util.coffee'
clas        = require 'classnames'
reactify    = require './Reactify.coffee'
query       = require './Async.coffee'

recl = React.createClass
{ul,li,a} = React.DOM

module.exports = query {
    path:'t'
    kids:
      snip:'r'
      head:'r'
      meta:'j'
  }, recl
  displayName:"Siblings"
  toText: (elem)-> reactify.walk elem,
                             ()->''
                             (s)->s
                             ({c})->(c ? []).join ''
  render: ->
    keys = util.getKeys @props.kids

    navClas =
      nav: true
      'col-md-12': (@props.meta.navmode is 'navbar')
    if @props.className then navClas[@props.className] = true
    navClas = clas navClas

    ul {className:navClas}, keys.map (key) =>
      selected = key is @props.curr
      if @props.meta.navselect
        selected = key is @props.meta.navselect
      href = util.basepath @props.path+"/"+key
      data = @props.kids[key]
      head = data.meta.title if data.meta
      head ?= @toText data.head
      head ||= key
      className = clas
        "nav-item": true
        selected: selected
      if data.meta.sibsclass
        className += " "+clas(data.meta.sibsclass.split(","))
      (li {className,key},
        (a {className:"nav-link",href,onClick:@props.closeNav}, head))
