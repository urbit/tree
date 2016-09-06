util = require '../utils/util.coffee'
clas        = require 'classnames'
reactify    = require './Reactify.coffee'
query       = require './Async.coffee'

recl = React.createClass
{ul,li,a} = React.DOM

module.exports = query {
    kids:
      head:'r'
      meta:'j'
      name:'t'
      path:'t'
      bump:'t'
  }, recl
  displayName:"Siblings"
  toText: (elem)-> reactify.walk elem,
                             ()->''
                             (s)->s
                             ({c})->(c ? []).join ''
  render: ->
    kids = util.sortKids @props.kids, @props.meta.navsort

    navClas =
      nav: true
      'col-md-12': (@props.meta.navmode is 'navbar')
    if @props.className then navClas[@props.className] = true
    navClas = clas navClas

    ul {className:navClas}, kids.map ({head,meta={},name,path}) =>
      selected = name is @props.curr
      if @props.meta.navselect
        selected = name is @props.meta.navselect
      href = util.basepath path
      head = meta.title
      head ?= @toText head
      head ||= name
      className = clas
        "nav-item": true
        selected: selected
      if meta.sibsclass
        className += " "+clas(meta.sibsclass.split(","))
      (li {className,key:name},
        (a {className:"nav-link",href,onClick:@props.closeNav}, head))
